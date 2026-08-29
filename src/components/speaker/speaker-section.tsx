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
                {speakerLabel({ title: group.title })}
              </Container>

              <SpeakerCarousel people={group.people} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const speakerLabel = ({ title }: { title: string }) => {
  return (
    <div
      // Animation hook for callers that reveal the pills on scroll.
      data-speaker-label
      className="relative py-3 px-20 max-md:px-16 text-white font-bold text-2xl max-md:text-xl"
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.15) 27.28%, rgba(255, 255, 255, 0.16) 54.22%, rgba(255, 255, 255, 0.12) 76.92%, rgba(255, 255, 255, 0.00) 100%)",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(177, 119, 99, 0) 0%, #F6CCB3 25%, #F5B899 48%, #F6D6BF 74%, rgba(177, 119, 99, 0) 100%)",
        }}
        className="w-full h-1 absolute top-0 left-0"
      ></div>
      <p>{title}</p>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(177, 119, 99, 0) 0%, #F6CCB3 25%, #F5B899 48%, #F6D6BF 74%, rgba(177, 119, 99, 0) 100%)",
        }}
        className="w-full h-1 absolute bottom-0 left-0"
      ></div>
    </div>
  );
};
