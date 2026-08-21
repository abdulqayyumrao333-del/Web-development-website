# Media Library — Configuration & Usage

## Storage provider: Cloudinary (already configured, now actually used)

Before this sprint, `cloudinary` was already an installed dependency,
`res.cloudinary.com` was already whitelisted in `next.config.mjs`, and
`CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`
already existed in `.env.example` — but nothing in the codebase actually
called Cloudinary. This sprint builds the first real usage of that existing
setup rather than introducing a second storage system.

Binary image data is never stored in Postgres. Only the Cloudinary URL and
metadata (dimensions, size, format, alt text, caption) live in the
database, in the new `Media` table.

## Required environment variables

```
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

Get these from your [Cloudinary dashboard](https://cloudinary.com/console).
Without them, uploads fail with a clear "storage isn't configured" error —
the rest of the CMS (writing, editing, publishing) is completely unaffected.

## Upload limits

- **Maximum file size: 8MB.** Chosen as a generous ceiling for high-quality
  blog cover images and inline photos while staying well within Vercel's
  request body limits (4.5MB on Hobby for standard Serverless Functions
  request bodies is a known constraint — 8MB as an *application-level*
  limit assumes either a Pro plan or that most real blog images are
  well under it; if you hit body-size errors on Hobby, lower
  `MAX_UPLOAD_BYTES` in `src/lib/media-validation.ts`).
- **Maximum dimensions: 8000px per side.** Rejected after upload (Cloudinary
  returns the real dimensions), with the just-uploaded asset cleaned up
  automatically so storage doesn't accumulate rejected files.
- **Supported formats: JPEG, PNG, WebP, AVIF only.**

## How validation actually works (not just trusting the browser)

The browser-reported MIME type and file extension are both easy to spoof —
neither is trusted as the source of truth. `src/lib/media-validation.ts`
reads the actual file signature (magic bytes) to confirm what the file
really is before it's ever uploaded to storage. Cloudinary itself performs
a second layer of validation on upload, rejecting corrupted or non-image
content.

## Image optimization

Cloudinary serves images through its own optimization pipeline
automatically (format negotiation, quality adjustment) at delivery time —
this project doesn't duplicate that by re-processing images before upload.
"Do not unnecessarily process already-optimized images" — Cloudinary's
delivery-time optimization already covers this without extra work here.

## Media deletion behavior

Deleting a media item:
1. Checks whether the image's URL is currently referenced by any
   non-trashed post's featured image (`coverImage`) or inline content
   (`contentMdx` — a text match, since one image can appear in many posts'
   body content, not just one relational reference).
2. If it's in use, the delete is **refused** by default, with a clear list
   of which posts use it. The admin must explicitly click "Delete Anyway"
   to force it.
3. On confirmed delete: removes the Cloudinary asset first, then the
   database record. If the Cloudinary delete fails (network issue, already
   gone, etc.), the database record is still removed — the library never
   shows a "phantom" image the admin can't get rid of, even if cleanup on
   the storage side didn't fully succeed.

## AI-generated alt text: deliberately not built

Sprint 9's Groq integration uses `llama-3.3-70b-versatile`, a **text-only**
model — it cannot see or analyze image content. Per this sprint's own
explicit instruction ("If reliable image understanding is not supported by
the configured Groq model, DO NOT fake image analysis — instead omit this
feature gracefully"), this feature was omitted rather than faked with a
generic, meaningless suggestion. If a vision-capable model becomes
available and configured via `GROQ_MODEL` in the future, this would be a
reasonable, low-risk addition to revisit.

## How to test uploads locally

1. Set the three `CLOUDINARY_*` env vars in `.env.local`.
2. Run `npm run dev`, sign in to `/admin`, go to Media Library.
3. Upload a JPEG/PNG/WebP/AVIF under 8MB — it should appear in the grid
   immediately.
4. Try uploading a non-image file (e.g. rename a `.txt` to `.jpg`) — it
   should be rejected server-side even though the extension looks valid,
   because the actual file signature doesn't match.

## Migrating existing images

Any post created before this sprint with a `coverImage` URL or inline
image references pointing elsewhere (e.g. a manually-pasted external URL)
continues to work exactly as before — the Media Library is additive, not a
replacement for the existing "paste a URL directly" option, which is still
available everywhere. There's no automatic migration of pre-existing
external image URLs into the Media Library/Cloudinary — if you want an
existing image cataloged and optimized through Cloudinary, re-upload it
through the Media Library and update the reference.
