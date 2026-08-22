"use client";

/**
 * Last-resort boundary: replaces the root layout, so it must render its own
 * `<html>` and `<body>`. Keep it dependency-free — anything it imports could
 * be the thing that failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem" }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Application error
        </h1>
        <p style={{ marginTop: "0.5rem", color: "#666" }}>
          {error.digest ? `Reference: ${error.digest}` : "Please try again."}
        </p>
        <button type="button" onClick={reset} style={{ marginTop: "1.5rem" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
