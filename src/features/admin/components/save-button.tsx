"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

/**
 * Submit button that reports the pending state of the form it sits in.
 *
 * A separate client leaf so the forms themselves stay Server Components —
 * `useFormStatus` only reads the nearest enclosing form, so it has to be a
 * child of it rather than the form itself.
 */
export function SaveButton({
  children = "Save",
  variant = "primary",
  ...props
}: {
  children?: React.ReactNode;
  variant?: "primary" | "ghost" | "danger";
} & React.ComponentPropsWithoutRef<"button">) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50",
        variant === "primary" && "bg-gold-500 text-blue-900 hover:bg-gold-400",
        variant === "ghost" &&
          "border border-blue-300/40 text-gold-200 hover:border-gold-500",
        variant === "danger" &&
          "border border-red-400/40 text-red-300 hover:bg-red-500/10",
      )}
      {...props}
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
