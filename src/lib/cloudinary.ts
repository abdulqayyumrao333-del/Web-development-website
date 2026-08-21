import { v2 as cloudinary } from "cloudinary";

export class StorageConfigError extends Error {}
export class StorageUploadError extends Error {}

let configured = false;

function ensureConfigured() {
  if (configured) return;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new StorageConfigError(
      "Cloudinary is not configured — set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
  configured = true;
}

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
};

/** Uploads a buffer to Cloudinary's "blog-media" folder. Cloudinary itself
 * validates that the content is a genuine, non-corrupted image — an invalid
 * or corrupted file is rejected by Cloudinary with an error, not silently
 * accepted. f_auto/q_auto-equivalent optimization happens automatically at
 * delivery time via Cloudinary's own pipeline, not reprocessed here. */
export async function uploadImageToCloudinary(buffer: Buffer, originalFilename: string): Promise<CloudinaryUploadResult> {
  ensureConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blog-media",
        resource_type: "image",
        // Cloudinary's own strict format allowlist — matches the app-level
        // allowlist in lib/media-validation.ts, enforced a second time here.
        allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
        filename_override: originalFilename,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(new StorageUploadError(error?.message ?? "Upload to storage failed."));
          return;
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          bytes: result.bytes,
          width: result.width,
          height: result.height,
        });
      },
    );
    stream.end(buffer);
  });
}

/** Deletes an asset from Cloudinary by its public_id. Safe to call even if
 * the asset is already gone (Cloudinary returns "not found", not an error). */
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  ensureConfigured();
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
