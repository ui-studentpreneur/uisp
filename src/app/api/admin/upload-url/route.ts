import { currentUser } from "@/lib/auth/session";
import {
  imageObjectKey,
  isImageMimeType,
  MAX_IMAGE_BYTES,
  presignUpload,
} from "@/lib/storage";

/**
 * Hands the admin's browser a short-lived URL it may PUT one image to.
 *
 * `currentUser()` rather than `requireUser()`: this is called by `fetch`, and a
 * redirect to the login page would arrive as an opaque HTML body instead of a
 * status the uploader can report. Same gate, different failure shape.
 *
 * The checks here are the real ones. The dropzone runs the same rules before
 * asking, but this endpoint is a plain POST any signed-in client can craft, so
 * nothing is taken on trust — including the size, which is what the key's
 * extension and the bucket's contents ultimately depend on.
 */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const { filename, contentType, size } = body as Record<string, unknown>;

  if (typeof filename !== "string" || !filename) {
    return Response.json({ error: "Missing file name." }, { status: 400 });
  }
  if (typeof contentType !== "string" || !isImageMimeType(contentType)) {
    return Response.json(
      { error: `${contentType} is not an image type we accept.` },
      { status: 415 },
    );
  }
  if (typeof size !== "number" || size <= 0 || size > MAX_IMAGE_BYTES) {
    return Response.json(
      { error: `Too large — the limit is ${MAX_IMAGE_BYTES / 1024 / 1024} MB.` },
      { status: 413 },
    );
  }

  const key = imageObjectKey(filename, contentType);

  try {
    return Response.json({ key, ...presignUpload(key) });
  } catch (cause) {
    // Almost always an unset R2_* variable. The reader names every missing key,
    // and the only reader of this response is a signed-in editor, so the real
    // message is more use here than a generic 500.
    return Response.json(
      {
        error: `Storage is not configured. ${cause instanceof Error ? cause.message : ""}`.trim(),
      },
      { status: 500 },
    );
  }
}
