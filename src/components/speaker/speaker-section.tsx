import Image from "next/image";

import { Button, Container } from "@/components/ui";

import { SpeakerCarousel } from "./speaker-carousel";
import type { Speaker } from "./speaker-card";

/** A titled list of people. The title renders as the pill above the carousel. */
export type SpeakerGroup = {
  title: string;
  people: readonly Speaker[];
};

/**
 * Speaker list section: heading, then one pill-labelled carousel per group.
 *
 * Shared by `home/` and `seminar/`, which differ only in the heading and the
 * people — the artwork and layout are the same, so they live here.
 */
export function SpeakerSection({
  heading,
  groups,
}: {
  heading: string;
  groups: readonly SpeakerGroup[];
}) {
  return (
    <section id="speaker" className="relative isolate flex items-center">
      <Image
        src="/bg-speaker.svg"
        alt=""
        aria-hidden
        width={0}
        height={0}
        sizes="100vw"
        className="pointer-events-none absolute top-[10%] z-0 h-auto w-full max-md:top-[30%]"
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-20 py-24 text-center max-md:gap-10">
        <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>

        {/*
          No `Container` around the carousel: the peeking cards need the full
          viewport width to work out their own gutters.
        */}
        <div className="flex w-full flex-col items-center gap-40 max-md:gap-20">
          {groups.map((group) => (
            <div
              key={group.title}
              className="flex w-full flex-col items-center gap-20 max-md:gap-10"
            >
              <Container className="flex justify-center">
                <Button size="lg" className="w-fit">
                  {group.title}
                </Button>
              </Container>

              <SpeakerCarousel people={group.people} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
