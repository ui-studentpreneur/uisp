import { SpeakerSection, type SpeakerGroup } from "@/components/speaker";

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

/**
 * Home page's speaker list. Only the copy and the people are the home
 * page's — the carousel and layout are shared with `seminar/`.
 */
const HomeSpeakerSection = () => (
  <SpeakerSection
    heading="Our Previous Speakers and Assessors"
    groups={GROUPS}
  />
);

export default HomeSpeakerSection;
