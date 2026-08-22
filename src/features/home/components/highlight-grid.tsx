import type { Highlight } from "../types";

import { HighlightCard } from "./highlight-card";

export function HighlightGrid({ highlights }: { highlights: readonly Highlight[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((highlight) => (
        <HighlightCard key={highlight.id} highlight={highlight} />
      ))}
    </div>
  );
}
