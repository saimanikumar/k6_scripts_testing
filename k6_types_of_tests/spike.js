import http from "k6/http";
import { sleep } from "k6";

export const options = {
  scenarios: {
    spike: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 1000,
      timeUnit: "1s",
      stages: [
        { duration: "10s", target: 10 }, // below normal load
        { duration: "1m", target: 10 },
        { duration: "10s", target: 140 }, // spike to 140 iterations
        { duration: "3m", target: 140 }, // stay at 140 for 3 minutes
        { duration: "10s", target: 10 }, // scale down. Recovery stage.
        { duration: "3m", target: 10 },
        { duration: "10s", target: 0 },
      ],
      gracefulStop: "2m",
    },
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io"; // make sure this is not production

  const responses = http.batch([
    [
      "GET",
      `${BASE_URL}/public/crocodiles/1/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/2/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/3/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/4/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
  ]);
}
