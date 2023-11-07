// Grafana K6

import http from 'k6/http';
import { sleep } from 'k6';


// default function is the main function in the K6
export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}


// Running a 30-second, 10-VU load test
// k6 run --vus 10 --duration 30s script.js
