import { ApiError } from "./api-error";

export type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  /** Serialised as JSON unless it is already a `BodyInit`. */
  body?: unknown;
  /** Appended to the URL as a query string; `undefined` values are dropped. */
  searchParams?: Record<string, string | number | boolean | undefined>;
};

/**
 * Thin `fetch` wrapper: one place for base URL, default headers, JSON
 * encoding and error normalisation.
 *
 * Feature code calls this from its `server/queries.ts`, never from a component.
 */
export function createHttpClient(baseUrl: string, defaults: RequestInit = {}) {
  async function request<T>(
    method: string,
    path: string,
    { body, searchParams, ...init }: RequestOptions = {},
  ): Promise<T> {
    const url = new URL(path, baseUrl);
    for (const [key, value] of Object.entries(searchParams ?? {})) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }

    const isRawBody = body instanceof FormData || body instanceof URLSearchParams;

    const response = await fetch(url, {
      ...defaults,
      ...init,
      method,
      headers: {
        ...(isRawBody ? {} : { "Content-Type": "application/json" }),
        ...defaults.headers,
        ...init.headers,
      },
      body: body === undefined || isRawBody ? (body as BodyInit | undefined) : JSON.stringify(body),
    });

    const payload = await parseBody(response);

    if (!response.ok) {
      throw new ApiError(response.statusText || "Request failed", response.status, payload);
    }

    return payload as T;
  }

  return {
    get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
    post: <T>(path: string, options?: RequestOptions) => request<T>("POST", path, options),
    put: <T>(path: string, options?: RequestOptions) => request<T>("PUT", path, options),
    patch: <T>(path: string, options?: RequestOptions) => request<T>("PATCH", path, options),
    delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
  };
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") ?? "";
  return contentType.includes("application/json") ? response.json() : response.text();
}

export type HttpClient = ReturnType<typeof createHttpClient>;
