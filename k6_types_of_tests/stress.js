import http from "k6/http";
import { sleep } from "k6";

export const options = {
  scenarios: {
    stress: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 500,
      timeUnit: "1s",
      stages: [
        { duration: "2m", target: 10 }, // below normal load
        { duration: "5m", target: 10 },
        { duration: "2m", target: 20 }, // normal load
        { duration: "5m", target: 20 },
        { duration: "2m", target: 30 }, // around the breaking point
        { duration: "5m", target: 30 },
        { duration: "2m", target: 40 }, // beyond the breaking point
        { duration: "5m", target: 40 },
        { duration: "10m", target: 0 }, // scale down. Recovery stage.
      ],
    },
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io"; // make sure this is not production
  const responses = http.batch([
    ["GET", `${BASE_URL}/public/crocodiles/1/`],
    ["GET", `${BASE_URL}/public/crocodiles/2/`],
    ["GET", `${BASE_URL}/public/crocodiles/3/`],
    ["GET", `${BASE_URL}/public/crocodiles/4/`],
  ]);
}

