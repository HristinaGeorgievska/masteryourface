/**
 * In-memory sliding-window rate limiter.
 *
 * NOTE: Resets on serverless cold starts. This is an accepted trade-off
 * when no external store (Redis / Upstash) is used. Each Vercel instance
 * maintains its own independent store.
 */

interface RateLimitConfig {
  /** Time window in milliseconds. */
  windowMs: number;
  /** Maximum requests allowed per IP within the window. */
  max: number;
  /** How often (ms) to purge stale entries. Default: 10 minutes. */
  cleanupIntervalMs?: number;
}

interface RateLimiter {
  /** Returns `true` if the IP should be blocked. */
  isLimited: (ip: string) => boolean;
}

export function createRateLimiter(config: RateLimitConfig): RateLimiter {
  const { windowMs, max, cleanupIntervalMs = 10 * 60 * 1000 } = config;
  const store = new Map<string, number[]>();
  let lastCleanup = Date.now();

  function pruneStore(now: number): void {
    if (now - lastCleanup < cleanupIntervalMs) return;
    lastCleanup = now;
    for (const [ip, timestamps] of store) {
      const valid = timestamps.filter((t) => now - t < windowMs);
      if (valid.length === 0) {
        store.delete(ip);
      } else {
        store.set(ip, valid);
      }
    }
  }

  return {
    isLimited(ip: string): boolean {
      const now = Date.now();
      pruneStore(now);

      const timestamps = store.get(ip) ?? [];
      const recent = timestamps.filter((t) => now - t < windowMs);

      if (recent.length >= max) {
        store.set(ip, recent);
        return true;
      }

      recent.push(now);
      store.set(ip, recent);
      return false;
    },
  };
}
