import Image from "next/image";

import { Button, Container } from "@/components/ui";

import type { SpeakerGroup } from "../types";

import { SpeakerCarousel } from "./speaker-carousel";

// TODO: move to `home/server/queries.ts` when this comes from a CMS.
const GROUPS: readonly SpeakerGroup[] = [
  {
    title: "Speakers",
    people: [
      {
        name: "Alfyn Wendi P.",
        role: "Co-Founder of",
        image: "/speaker1.png",
        company: "Republik Investor",
      },
      {
        name: "Harwindra Yoga P.",
        role: "E-Commerce Manager of",
        image: "/speaker2.png",
        company: "PT Campina Ice Cream Industry Tbk",
      },
      {
        name: "Ketty Lie",
        role: "Co-founder of",
        image: "/speaker3.png",
        company: "Danacita",
      },
      {
        name: "Sandiaga S. Uno",
        role: "Former Minister of",
        image: "/speaker4.png",
        company: "Tourism and Creative Economy of Indonesia",
      },
      {
        name: "Airyn Tanu",
        role: "Founder & COO of",
        image: "/speaker5.png",
        company: "Passion Jewelry Group",
      },
    ],
  },
  {
    title: "Assessors",
    people: [
      {
        name: "Anindita Nur Annisa",
        role: "Investment Analyst of",
        image: "/speaker6.png",
        company: "MDI Ventures",
      },
      {
        name: "Maksun Djatmiko",
        role: "Director of",
        image: "/speaker7.png",
        company: "Arka Investama Raharja",
      },
      {
        name: "Salsabila Firyal Fitri",
        role: "Investments of",
        image: "/speaker8.png",
        company: "Telkomsel Ventures",
      },
    ],
  },
];

const SpeakerSection = () => {
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
          Our Previous Speakers and Assessors
        </h2>

        {/*
          No `Container` around the carousel: the peeking cards need the full
          viewport width to work out their own gutters.
        */}
        <div className="flex w-full flex-col items-center gap-40 max-md:gap-20">
          {GROUPS.map((group) => (
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
};

export default SpeakerSection;
