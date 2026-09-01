/**
 * Object storage. Server side only — `r2.ts` imports `server-only`, so pulling
 * this barrel into a Client Component is a build error by design.
 *
 * The browser half lives in `./upload-image` and is imported from its own path.
 */
export {
  IMAGE_ACCEPT,
  IMAGE_EXTENSIONS,
  MAX_IMAGE_BYTES,
  isImageMimeType,
  rejectImage,
  type ImageMimeType,
} from "./image-file";
export { imageObjectKey } from "./object-key";
export { presignUpload, publicUrl } from "./r2";
