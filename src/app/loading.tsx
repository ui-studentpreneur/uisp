import { BrandLoader, Container } from "@/components/ui";

/**
 * Root suspense fallback.
 *
 * It sits above `(main)/layout.tsx`, so the navbar and footer are inside the
 * boundary it replaces — there is no page chrome behind it, and it has to
 * paint the site's surface itself rather than inherit one.
 *
 * `role="status"` on the wrapper, with the animated mark `aria-hidden`: a
 * screen reader announces the sentence, not the decoration.
 */
export default function Loading() {
  return (
    <div
      role="status"
      className="bg-gradient-donker flex flex-1 items-center justify-center"
    >
      <Container className="flex flex-col items-center gap-6 py-24 text-center">
        <BrandLoader className="h-24 w-auto" />

        <p className="text-gradient-gold text-lg font-semibold tracking-tight">
          Loading…
        </p>
      </Container>
    </div>
  );
}
