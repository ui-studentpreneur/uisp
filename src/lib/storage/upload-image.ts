import { routes } from "@/config/routes";

import { rejectImage } from "./image-file";

/**
 * Browser half of the upload. Imported by Client Components only — it talks to
 * the presign route and then to R2 directly, and never sees a credential.
 *
 * Two requests rather than one multipart POST through the app: the file never
 * touches the Next server, which keeps a 6 MB photo clear of the request-body
 * limits every serverless host imposes.
 */

type PresignResponse = {
  uploadUrl?: string;
  publicUrl?: string;
  error?: string;
};

type Presigned = { uploadUrl: string; publicUrl: string };

/** Fraction uploaded, `0`–`1`. Called only while bytes are actually moving. */
export type ProgressHandler = (fraction: number) => void;

async function presignUpload(file: File): Promise<Presigned> {
  const response = await fetch(routes.api.adminUploadUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });

  // A rejected upload answers with a readable reason; anything else (a proxy
  // page, an HTML error) would blow up in `json()`, so guard the parse.
  const body: PresignResponse = await response
    .json()
    .catch(() => ({ error: `Upload could not start (${response.status}).` }));

  const { uploadUrl, publicUrl } = body;
  if (!response.ok || !uploadUrl || !publicUrl) {
    throw new Error(
      body.error ?? `Upload could not start (${response.status}).`,
    );
  }

  return { uploadUrl, publicUrl };
}

/**
 * `XMLHttpRequest`, not `fetch`: only XHR reports upload progress, and a photo
 * on a phone connection is exactly the case where a progress bar is the
 * difference between "working" and "broken".
 */
function put(url: string, file: File, onProgress: ProgressHandler) {
  return new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("PUT", url);
    request.setRequestHeader("Content-Type", file.type);

    request.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    });

    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 300) return resolve();
      reject(new Error(`The storage bucket refused it (${request.status}).`));
    });
    request.addEventListener("error", () =>
      reject(new Error("The upload could not reach the storage bucket.")),
    );
    request.addEventListener("abort", () =>
      reject(new Error("Upload cancelled.")),
    );

    request.send(file);
  });
}

/** Uploads one file and resolves with the URL it is now readable at. */
export async function uploadImage(
  file: File,
  onProgress: ProgressHandler,
): Promise<string> {
  const reason = rejectImage(file);
  if (reason) throw new Error(reason);

  const { uploadUrl, publicUrl } = await presignUpload(file);
  await put(uploadUrl, file, onProgress);

  return publicUrl;
}
