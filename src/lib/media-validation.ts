export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"] as const;
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB — see docs/MEDIA_LIBRARY.md for rationale
export const MAX_DIMENSION_PX = 8000; // rejects absurd dimensions (e.g. corrupted/malicious files)

export class InvalidFileError extends Error {}

/**
 * Reads the actual file signature (magic bytes) rather than trusting the
 * browser-reported MIME type, which is easily spoofed. Returns the detected
 * MIME type, or null if it doesn't match any allowed image format.
 */
export function detectImageMimeType(buffer: Buffer): (typeof ALLOWED_MIME_TYPES)[number] | null {
  if (buffer.length < 12) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  // WebP: "RIFF" .... "WEBP"
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "image/webp";
  }

  // AVIF: ISOBMFF container with an "ftyp" box whose brand starts with "avif"/"avis"
  const ftypBox = buffer.slice(4, 8).toString("ascii");
  if (ftypBox === "ftyp") {
    const brand = buffer.slice(8, 12).toString("ascii");
    if (brand.startsWith("avif") || brand.startsWith("avis")) return "image/avif";
  }

  return null;
}

/** Validates an uploaded file's size and actual content type. Throws
 * InvalidFileError with a user-facing message if anything fails — never
 * trusts the client-reported MIME type or file extension alone. */
export function validateUploadedImage(buffer: Buffer, reportedSize: number): (typeof ALLOWED_MIME_TYPES)[number] {
  if (reportedSize > MAX_UPLOAD_BYTES) {
    throw new InvalidFileError(`File is too large — maximum size is ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB.`);
  }
  if (buffer.length === 0) {
    throw new InvalidFileError("The uploaded file is empty.");
  }

  const detected = detectImageMimeType(buffer);
  if (!detected) {
    throw new InvalidFileError("Unsupported or invalid file — only JPEG, PNG, WebP, and AVIF images are allowed.");
  }

  return detected;
}
