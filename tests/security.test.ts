import test from "node:test";
import assert from "node:assert/strict";

import { RateLimiter, getClientIp } from "../lib/security";

test("rate limiter blocks repeated requests after the configured threshold", () => {
  const limiter = new RateLimiter(2, 60_000);
  const headers = new Headers({ "x-forwarded-for": "203.0.113.10" });

  assert.equal(limiter.isAllowed("user-1", headers), true);
  assert.equal(limiter.isAllowed("user-1", headers), true);
  assert.equal(limiter.isAllowed("user-1", headers), false);
});

test("client IP is derived from forwarded headers when present", () => {
  const headers = new Headers({ "x-forwarded-for": "198.51.100.7, 10.0.0.5" });

  assert.equal(getClientIp(headers), "198.51.100.7");
});
