window.BENCHMARK_DATA = {
  lastUpdate: 1638522720181,
  repoUrl: 'https://github.com/napi-rs/napi-rs',
  entries: {
    Benchmark: [
      {
        commit: {
          author: {
            email: 'lynweklm@gmail.com',
            name: 'LongYinan',
            username: 'Brooooooklyn',
          },
          committer: {
            email: 'lynweklm@gmail.com',
            name: 'LongYinan',
            username: 'Brooooooklyn',
          },
          distinct: true,
          id: 'faf708a5b41c17e8173e38c14c90d99cae4c1442',
          message: 'chore: publish\n\n - @napi-rs/cli@2.0.0-beta.3',
          timestamp: '2021-12-03T17:03:19+08:00',
          tree_id: '5db906c95d9b058bc185b4bde80212712c619d49',
          url: 'https://github.com/napi-rs/napi-rs/commit/faf708a5b41c17e8173e38c14c90d99cae4c1442',
        },
        date: 1638522718513,
        tool: 'benchmarkjs',
        benches: [
          {
            name: 'noop#napi-rs',
            value: 59593947,
            range: '±0.47%',
            unit: 'ops/sec',
            extra: '91 samples',
          },
          {
            name: 'noop#JavaScript',
            value: 596042978,
            range: '±0.09%',
            unit: 'ops/sec',
            extra: '96 samples',
          },
          {
            name: 'Plus number#napi-rs',
            value: 19289482,
            range: '±0.18%',
            unit: 'ops/sec',
            extra: '93 samples',
          },
          {
            name: 'Plus number#JavaScript',
            value: 594620105,
            range: '±0.08%',
            unit: 'ops/sec',
            extra: '95 samples',
          },
          {
            name: 'Create buffer#napi-rs',
            value: 402011,
            range: '±7.53%',
            unit: 'ops/sec',
            extra: '69 samples',
          },
          {
            name: 'Create buffer#JavaScript',
            value: 1669658,
            range: '±2.99%',
            unit: 'ops/sec',
            extra: '82 samples',
          },
          {
            name: 'createArray#createArrayJson',
            value: 43879,
            range: '±0.15%',
            unit: 'ops/sec',
            extra: '92 samples',
          },
          {
            name: 'createArray#create array for loop',
            value: 8135,
            range: '±0.12%',
            unit: 'ops/sec',
            extra: '98 samples',
          },
          {
            name: 'createArray#create array with serde trait',
            value: 8076,
            range: '±0.1%',
            unit: 'ops/sec',
            extra: '99 samples',
          },
          {
            name: 'getArrayFromJs#get array from json string',
            value: 17248,
            range: '±0.91%',
            unit: 'ops/sec',
            extra: '95 samples',
          },
          {
            name: 'getArrayFromJs#get array from serde',
            value: 11046,
            range: '±0.11%',
            unit: 'ops/sec',
            extra: '98 samples',
          },
          {
            name: 'getArrayFromJs#get array with for loop',
            value: 13434,
            range: '±0.13%',
            unit: 'ops/sec',
            extra: '98 samples',
          },
          {
            name: 'Get Set property#Get Set from native#u32',
            value: 367018,
            range: '±4.21%',
            unit: 'ops/sec',
            extra: '81 samples',
          },
          {
            name: 'Get Set property#Get Set from JavaScript#u32',
            value: 321829,
            range: '±4.14%',
            unit: 'ops/sec',
            extra: '82 samples',
          },
          {
            name: 'Get Set property#Get Set from native#string',
            value: 342886,
            range: '±4.07%',
            unit: 'ops/sec',
            extra: '82 samples',
          },
          {
            name: 'Get Set property#Get Set from JavaScript#string',
            value: 302153,
            range: '±4.22%',
            unit: 'ops/sec',
            extra: '83 samples',
          },
          {
            name: 'Async task#spawn task',
            value: 33629,
            range: '±1.2%',
            unit: 'ops/sec',
            extra: '81 samples',
          },
          {
            name: 'Async task#ThreadSafeFunction',
            value: 341,
            range: '±2.5%',
            unit: 'ops/sec',
            extra: '41 samples',
          },
          {
            name: 'Async task#Tokio future to Promise',
            value: 28864,
            range: '±0.44%',
            unit: 'ops/sec',
            extra: '86 samples',
          },
          {
            name: 'Query#query * 100',
            value: 2233,
            range: '±1.92%',
            unit: 'ops/sec',
            extra: '87 samples',
          },
          {
            name: 'Query#query * 1',
            value: 29644,
            range: '±0.45%',
            unit: 'ops/sec',
            extra: '87 samples',
          },
        ],
      },
    ],
  },
}
