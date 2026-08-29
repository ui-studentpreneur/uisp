"use client";

import { useActionState } from "react";

import type { Result } from "@/lib/utils";

import { signIn } from "../server/auth-actions";

import { SaveButton } from "./save-button";

const INPUT =
  "w-full rounded-lg border border-blue-300/40 bg-blue-900/40 px-3 py-2 text-sm " +
  "text-gold-100 outline-none focus:border-gold-500";

/**
 * The only way in. There is no sign-up: accounts come from `pnpm admin:create`.
 */
export function LoginForm() {
  const [state, action] = useActionState<Result<null> | null, FormData>(
    signIn,
    null,
  );

  return (
    <form
      action={action}
      className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-blue-300/25 bg-blue-800/40 p-8"
    >
      <h1 className="text-gradient-gold text-2xl font-bold">Content admin</h1>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide text-gold-300 uppercase">
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className={INPUT}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide text-gold-300 uppercase">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={INPUT}
        />
      </label>

      {state && !state.ok ? (
        <p role="alert" className="text-sm text-red-300">
          {state.error}
        </p>
      ) : null}

      <SaveButton>Sign in</SaveButton>
    </form>
  );
}
