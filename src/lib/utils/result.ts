/**
 * Explicit success/failure envelope.
 *
 * Server Actions return this instead of throwing, because a thrown error
 * crosses the RSC boundary as an opaque "an error occurred" in production.
 * A `Result` gives the client a message it can actually render.
 */
export type Result<T, E = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function isOk<T, E>(
  result: Result<T, E>,
): result is { ok: true; data: T } {
  return result.ok;
}
