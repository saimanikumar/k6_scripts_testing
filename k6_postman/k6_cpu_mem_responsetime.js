import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {
    http_req_duration: [{ threshold: 'p(99)<3000', abortOnFail: true }],
    load_generator_cpu_percent: [{ threshold: 'value>50', abortOnFail: true }],
    load_generator_memory_used_percent: [{ threshold: 'value>50', abortOnFail: true }],
  },
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  // demo
  response = http.get('https://test-api.k6.io/public/crocodiles/1/')

  // Automatically added sleep
  sleep(1)
}
