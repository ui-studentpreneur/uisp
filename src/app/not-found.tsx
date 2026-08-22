import Link from "next/link";

import { Button, Container } from "@/components/ui";
import { routes } from "@/config";

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The page you are looking for does not exist or has moved.
      </p>
      <Link href={routes.home}>
        <Button>Back to home</Button>
      </Link>
    </Container>
  );
}
