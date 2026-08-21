# Blog Analytics — What's Collected & How It Works

## What is collected

Every time a visitor loads a **published** blog post's detail page, one row
is written to the `AnalyticsEvent` table:

| Field | What it is | Example |
|---|---|---|
| `blogPostId` | Which post was viewed | — |
| `sessionId` | A random, anonymous identifier from a first-party cookie | `f47ac10b-...` |
| `referrer` | A coarse category, never the raw URL | `"search"`, `"social"`, `"direct"`, `"referral"`, `"other"` |
| `device` | A coarse category from the User-Agent, never the raw string | `"desktop"`, `"mobile"`, `"tablet"`, `"unknown"` |
| `createdAt` | When the view happened | — |

The existing `BlogPost.viewCount` field (already part of the schema before
this feature) is incremented alongside each new event and is what "Total
Views" is based on site-wide.

## What is explicitly NOT collected

- No IP addresses are ever written to the database. The existing rate
  limiter (`lib/rate-limit.ts`) uses the request IP only as an ephemeral key
  in Upstash Redis for abuse throttling — it is never stored in this
  project's own database.
- No names, emails, or any other personally identifying information.
- No raw referrer URLs (which can contain search terms or other sensitive
  query parameters) — only the coarse category above.
- No raw User-Agent strings — only the coarse device category above.
- No cross-site tracking, fingerprinting, or third-party analytics scripts.

## How duplicate views are handled

Each visitor gets an anonymous session cookie (`aq_analytics_session`,
`httpOnly`, 1-year expiry, no personal data — just a random ID) on their
first page view. If the same session views the same post again within 30
minutes, it is **not** counted again — no new event, no `viewCount`
increment. This prevents a page refresh or double-navigation from
inflating numbers, without needing to store or examine IP addresses.

## What is NOT counted at all

The tracking endpoint only counts a view if the post is genuinely public —
reusing the exact same `publishedPostWhere` visibility rule the rest of the
site already uses. This means views are **never** recorded for:

- Draft posts
- Scheduled posts (before their publish time)
- Archived posts
- Trashed posts
- Admin dashboard page loads (the tracker only exists on the public
  `/blog/[slug]` page, which itself only renders for published content)

## Rate limiting

View submissions are additionally rate-limited (5/minute per IP+slug pair,
via the existing Upstash-backed `checkRateLimit`) as a basic anti-abuse
measure, separate from the session-based deduplication above.

## Reliability

If analytics recording fails for any reason (database error, missing
Upstash config, etc.), the request fails silently — the public blog page
itself never breaks or shows an error because of an analytics hiccup. The
client-side tracker (`ViewCountTracker`) also ignores any fetch failure.

## What was deliberately NOT built in this feature

Per the project's own instruction to avoid inventing unreliable metrics,
this feature does **not** attempt:

- Scroll-depth or "article completion" tracking — heuristic-based and
  unreliable without significant added complexity.
- Internal/external link-click tracking — would require modifying the
  shared MDX rendering pipeline used by both the public site and the admin
  editor's live preview; deferred rather than risking that shared system
  for a nice-to-have metric.
- Any Google Search Console or Google Analytics data — this project's
  analytics are first-party only. Search impressions, click-through rate,
  and keyword rankings are Google-owned data this project has no access to
  and will never display fabricated numbers for.

## How to reset analytics data

There is no dedicated "reset" button (a personal blog's analytics history
is generally worth keeping), but if you need to clear it:

```sql
-- Clears all recorded events. viewCount on individual posts is untouched
-- by this — reset that separately if you want a full reset:
DELETE FROM "AnalyticsEvent";

-- Optional: also zero out the aggregate counter on every post
UPDATE "BlogPost" SET "viewCount" = 0;
```

Run via `npx prisma studio` (GUI) or `psql` directly against your database.

## Required environment variables

None new for this feature specifically. Analytics works out of the box.
`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (if not already
configured) enable the rate-limiting layer described above — without them,
`checkRateLimit` always allows requests through (fails open on rate
limiting only, never on the analytics recording itself).
