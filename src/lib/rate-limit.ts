import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Falls back to allowing all requests if Upstash env vars aren't set yet
// (e.g. local dev before the feature is wired up) — never hard-fails the app.
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const ratelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 m") })
  : null;

export async function checkRateLimit(identifier: string): Promise<boolean> {
  if (!ratelimit) return true; // TODO: configure Upstash before production launch
  const { success } = await ratelimit.limit(identifier);
  return success;
}

// Separate, more generous bucket for the Blog AI assistant — an active
// writing session reasonably makes more requests than page-view tracking,
// but this still guards against accidental rapid-fire/duplicate submissions.
const aiRatelimit = redis
  ? new Ratelimit({ redis, prefix: "ai", limiter: Ratelimit.slidingWindow(20, "5 m") })
  : null;

export async function checkAiRateLimit(identifier: string): Promise<boolean> {
  if (!aiRatelimit) return true;
  const { success } = await aiRatelimit.limit(identifier);
  return success;
}

// Separate bucket for media uploads — generous enough for a normal editing
// session, still a real guard against accidental rapid-fire/scripted abuse.
const uploadRatelimit = redis
  ? new Ratelimit({ redis, prefix: "upload", limiter: Ratelimit.slidingWindow(15, "5 m") })
  : null;

export async function checkUploadRateLimit(identifier: string): Promise<boolean> {
  if (!uploadRatelimit) return true;
  const { success } = await uploadRatelimit.limit(identifier);
  return success;
}
