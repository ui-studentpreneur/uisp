import { Container } from "@/components/ui";

export default function Loading() {
  return (
    <Container className="flex flex-1 items-center py-24">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading…</p>
    </Container>
  );
}
