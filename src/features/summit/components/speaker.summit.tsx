import { SpeakerSection, type SpeakerGroup } from "@/components/speaker";

// TODO: placeholder — these are the home page's previous speakers, reused so
// the section has something to render. Swap for this summit's line-up.
const GROUPS: readonly SpeakerGroup[] = [
  {
    title: "Mentors for Technology",
    people: [
      {
        name: "Ihsansyah Galih",
        role: "IT Cybersecurity Co-Lead at",
        image: "/tech1.png",
        company: "Paragon Technology & Innovation",
      },
      {
        name: "Edy Susanto",
        role: "IT Director at ",
        image: "/tech2.png",
        company: "PT Trans Retail Indonesia",
      },
      {
        name: "Shabrina A. A. L.",
        role: "CRM & Digital Transformation Lead at ",
        image: "/tech3.png",
        company: "Paragon Technology & Innovation",
      },
      {
        name: "Sebastian Djaya A.",
        role: "Product Business Solution at ",
        image: "/tech4.png",
        company: "Paragon Technology & Innovation",
      },
    ],
  },
];

const SpeakerSummit = () => (
  <SpeakerSection heading="Previous Speakers" groups={GROUPS} />
);

export default SpeakerSummit;
