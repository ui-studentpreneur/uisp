"use client";

import { useActionState, type ReactNode } from "react";

import type { Result } from "@/lib/utils";

type State = Result<unknown> | null;

/**
 * A form wired to a Server Action that returns a `Result`.
 *
 * `useActionState` is what makes the returned value reachable — React's bare
 * `action={fn}` prop discards it, which is why every action in this feature is
 * shaped `(…bound, previousState, formData)`.
 *
 * `children` arrive already rendered on the server, so wrapping a form in this
 * client component does not pull its inputs into the browser bundle.
 */
export function ActionForm({
  action,
  children,
  className,
  /** Suppress the success line. For icon buttons, where it would be noise. */
  quiet = false,
}: {
  action: (previous: State, form: FormData) => Promise<Result<unknown>>;
  children: ReactNode;
  className?: string;
  quiet?: boolean;
}) {
  const [state, formAction] = useActionState<State, FormData>(action, null);

  return (
    <form action={formAction} className={className}>
      {children}

      {state && !state.ok ? (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {String(state.error)}
        </p>
      ) : null}

      {state?.ok && !quiet ? (
        <p role="status" className="mt-2 text-sm text-gold-400">
          Saved.
        </p>
      ) : null}
    </form>
  );
}
