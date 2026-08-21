# Scheduled Publishing — Deployment Configuration

## What actually needs configuring, and what doesn't

**The public site already works correctly with zero configuration.** `lib/blog.ts`'s
`publishedPostWhere` treats a `SCHEDULED` post as publicly visible the moment its
`scheduledAt` time passes, evaluated fresh on every request. A visitor will see a
due scheduled post go live on time even if nothing below is ever set up.

What the cron endpoint below adds: it flips the post's `status` field in the
database from `SCHEDULED` to `PUBLISHED` once due, so the **admin dashboard**
shows the correct status without you having to open and re-save the post
manually. It's a convenience for the admin UI, not a requirement for the
public site to behave correctly.

## Required environment variable

Add to your `.env` (and your hosting provider's environment variables):

```
CRON_SECRET=<a long random string — e.g. `openssl rand -hex 32`>
```

The `/api/cron/publish-scheduled` route rejects any request that doesn't send
`Authorization: Bearer <CRON_SECRET>`. Without this variable set, the route
always returns 500 and does nothing — it fails closed, not open.

## If you're deploying to Vercel

A `vercel.json` is already included with:

```json
{
  "crons": [{ "path": "/api/cron/publish-scheduled", "schedule": "0 0 * * *" }]
}
```

This runs once daily. **Vercel's Hobby (free) plan hard-caps cron jobs at
once per day, with imprecise timing** — a job scheduled for `0 0 * * *` may
actually fire any time in that hour. Since the public site's correctness
doesn't depend on this cron (see above), that's an acceptable ceiling for a
personal blog: the admin dashboard's status might lag reality by up to ~24
hours, but nothing is ever publicly wrong or delayed.

Vercel automatically sends `Authorization: Bearer $CRON_SECRET` when it
invokes a configured cron job, using the `CRON_SECRET` env var you set above.

If you want tighter timing (e.g. every 15 minutes), you need either:
- **Vercel Pro** ($20/mo/user) — unlocks per-minute cron schedules, or
- **An external scheduler** hitting the same URL (see below) — no Vercel plan change needed.

## If you're not on Vercel, or want more frequent checks without Pro

The route is a plain authenticated HTTP endpoint — anything that can send a
scheduled HTTP request works:

- [cron-job.org](https://cron-job.org) (free) — configure a GET request to
  `https://yourdomain.com/api/cron/publish-scheduled` with header
  `Authorization: Bearer <your CRON_SECRET>`, on whatever schedule you like.
- A GitHub Actions scheduled workflow (`on: schedule`) running `curl` with
  the same header.
- Any other cron/scheduler capable of sending an HTTP request with a custom header.

## How to test it safely

The route is idempotent and safe to call as often as you like — it only
touches posts that are `SCHEDULED` and past due, and running it twice in a
row simply does nothing the second time (the posts are no longer
`SCHEDULED`).

```bash
curl -H "Authorization: Bearer <your CRON_SECRET>" \
  https://yourdomain.com/api/cron/publish-scheduled
```

Expected response: `{"checked": <n>, "published": <n>, "failed": 0}`.

To test locally: schedule a post for a time a minute or two in the future,
wait, then run the `curl` command above against `http://localhost:3000`.
