use std::ffi::c_void;
use std::future::Future;
use std::ptr;
use std::sync::atomic::{AtomicUsize, Ordering};

use once_cell::sync::Lazy;
use tokio::{
  runtime::Handle,
  sync::mpsc::{self, error::TrySendError},
};

use crate::{check_status, sys, JsDeferred, JsUnknown, NapiValue, Result};

pub(crate) static RT: Lazy<(Handle, mpsc::Sender<()>)> = Lazy::new(|| {
  let runtime = tokio::runtime::Runtime::new();
  let (sender, mut receiver) = mpsc::channel::<()>(1);
  runtime
    .map(|rt| {
      let h = rt.handle();
      let handle = h.clone();
      handle.spawn(async move {
        if receiver.recv().await.is_some() {
          rt.shutdown_background();
        }
      });

      (handle, sender)
    })
    .expect("Create tokio runtime failed")
});

pub(crate) static TOKIO_RT_REF_COUNT: AtomicUsize = AtomicUsize::new(0);

#[doc(hidden)]
#[inline(never)]
pub unsafe extern "C" fn shutdown_tokio_rt(arg: *mut c_void) {
  if TOKIO_RT_REF_COUNT.fetch_sub(1, Ordering::SeqCst) == 0 {
    let sender = &RT.1;
    if let Err(e) = sender.clone().try_send(()) {
      match e {
        TrySendError::Closed(_) => {}
        TrySendError::Full(_) => {
          panic!("Send shutdown signal to tokio runtime failed, queue is full");
        }
      }
    }
  }

  unsafe {
    let env: sys::napi_env = arg as *mut sys::napi_env__;
    sys::napi_remove_env_cleanup_hook(env, Some(shutdown_tokio_rt), arg);
  }
}

/// Spawns a future onto the Tokio runtime.
///
/// Depending on where you use it, you should await or abort the future in your drop function.
/// To avoid undefined behavior and memory corruptions.
pub fn spawn<F>(fut: F) -> tokio::task::JoinHandle<F::Output>
where
  F: 'static + Send + Future<Output = ()>,
{
  RT.0.spawn(fut)
}

/// Runs a future to completion
/// This is blocking, meaning that it pauses other execution until the future is complete,
/// only use it when it is absolutely necessary, in other places use async functions instead.
pub fn block_on<F>(fut: F) -> F::Output
where
  F: 'static + Send + Future<Output = ()>,
{
  RT.0.block_on(fut)
}

// This function's signature must be kept in sync with the one in lib.rs, otherwise napi
// will fail to compile with the `tokio_rt` feature.

/// If the feature `tokio_rt` has been enabled this will enter the runtime context and
/// then call the provided closure. Otherwise it will just call the provided closure.
pub fn within_runtime_if_available<F: FnOnce() -> T, T>(f: F) -> T {
  let _rt_guard = RT.0.enter();
  f()
}

#[allow(clippy::not_unsafe_ptr_arg_deref)]
pub fn execute_tokio_future<
  Data: 'static + Send,
  Fut: 'static + Send + Future<Output = Result<Data>>,
  Resolver: 'static + Send + Sync + FnOnce(sys::napi_env, Data) -> Result<sys::napi_value>,
>(
  env: sys::napi_env,
  fut: Fut,
  resolver: Resolver,
) -> Result<sys::napi_value> {
  let mut promise = ptr::null_mut();
  let mut deferred = ptr::null_mut();

  check_status!(unsafe { sys::napi_create_promise(env, &mut deferred, &mut promise) })?;

  let (deferred, promise) = JsDeferred::new(env)?;

  spawn(async move {
    match fut.await {
      Ok(v) => deferred.resolve(|env| {
        resolver(env.raw(), v).map(|v| unsafe { JsUnknown::from_raw_unchecked(env.raw(), v) })
      }),
      Err(e) => deferred.reject(e),
    }
  });

  Ok(promise.0.value)
}
