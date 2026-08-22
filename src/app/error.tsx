"use client";

import { useEffect } from "react";

import { Button, Container } from "@/components/ui";

/** Catches render errors in any nested segment that has no closer boundary. */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the project's reporter (Sentry, OTel, …).
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        {error.digest ? `Reference: ${error.digest}` : "An unexpected error occurred."}
      </p>
      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}
