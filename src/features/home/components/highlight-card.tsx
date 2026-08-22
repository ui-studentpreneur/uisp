import { Card, CardDescription, CardTitle } from "@/components/ui";

import type { Highlight } from "../types";

export function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <Card>
      <CardTitle>
        <a
          href={highlight.href}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          {highlight.title}
        </a>
      </CardTitle>
      <CardDescription>{highlight.description}</CardDescription>
    </Card>
  );
}
