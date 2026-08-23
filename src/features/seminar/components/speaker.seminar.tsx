import { SpeakerSection, type SpeakerGroup } from "@/components/speaker";

// TODO: placeholder — these are the home page's previous speakers, reused so
// the section has something to render. Swap for this seminar's line-up.
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
];

const SpeakerSeminar = () => (
  <SpeakerSection heading="Our Speakers" groups={GROUPS} />
);

export default SpeakerSeminar;
