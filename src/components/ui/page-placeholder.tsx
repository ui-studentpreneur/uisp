import { Container } from "./container";

/**
 * Scaffolding for a route that exists but has no content yet.
 *
 * Temporary: delete this component once every route renders a real feature
 * view. It is here so route files stay thin instead of each carrying its own
 * throwaway markup.
 */
export function PagePlaceholder({
  title,
  todo,
}: {
  title: string;
  /** What still has to be built on this route. */
  todo: readonly string[];
}) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <h1 className="text-gradient-gold text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>

      <div className="w-full max-w-xl rounded-2xl border border-dashed border-gold-700/50 p-6 text-left">
        <p className="text-sm font-semibold text-gold-200">TODO</p>
        <ul className="mt-3 space-y-2 text-sm text-gold-300/70">
          {todo.map((entry) => (
            <li key={entry} className="flex gap-2">
              <span aria-hidden>&bull;</span>
              <span>{entry}</span>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
