import { Button } from "@/components/ui";
import { siteConfig } from "@/config";

export function HeroSection() {
  return (
    <section className="flex flex-col items-start gap-6 py-20">
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {siteConfig.description} Start by editing a feature under{" "}
        <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
          src/features
        </code>
        .
      </p>
      {/* <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer"> */}
      <Button size="lg">Read the docs</Button>
      {/* </a> */}
    </section>
  );
}
