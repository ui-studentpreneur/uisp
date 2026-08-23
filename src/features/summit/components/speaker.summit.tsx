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
  {
    title: "Mentors for Finance",
    people: [
      {
        name: "Sintawati K.",
        role: "Finance Director at",
        image: "/finance1.png",
        company: "Haleon",
      },
      {
        name: "Roni Syaputra",
        role: "Chief Financial Officer at",
        image: "/tech2.png",
        company: "MAKA",
      },
      {
        name: "William Djumadi",
        role: "Chief Financial Officer at",
        image: "/tech3.png",
        company: "Vidio",
      },
      {
        name: "Yopi Ivanda",
        role: "Chief Financial Officer at",
        image: "/tech4.png",
        company: "Gunung Prisma",
      },
    ],
  },
  {
    title: "Mentors for Operations",
    people: [
      {
        name: "Daniel Trisno S.",
        role: "Operations Director at ",
        image: "/ops1.png",
        company: "Informa",
      },
      {
        name: "Rangga W. Primanto",
        role: "Head of Supply Chain & Logistics at ",
        image: "/ops2.png",
        company: "MAKA",
      },
      {
        name: "Artha Nugraha J.",
        role: "Warehouse Operations Support Manager at ",
        image: "/ops3.png",
        company: "IKEA Indonesia",
      },
      {
        name: "Arliansyah",
        role: "District Manager at ",
        image: "/ops4.png",
        company: "Paris Baguette Indonesia",
      },
    ],
  },
  {
    title: "Mentors for Human Resources",
    people: [
      {
        name: "Didin Dimas",
        role: "Head of Human Resources at  ",
        image: "/hr1.png",
        company: "PT Astra International Tbk. - Daihatsu Sales Ops.",
      },
      {
        name: "Apriza Dewi",
        role: "Head of Human Resources  at",
        image: "/hr2.png",
        company: "Astra Zeneca",
      },
      {
        name: "Aukaria Rahman",
        role: "Head of Human Resources at ",
        image: "/hr3.png",
        company: "Central Proteina",
      },
      {
        name: "Suryo Sasono",
        role: "Chief Human Resources Officer at ",
        image: "/hr4.png",
        company: "Prudential Syariah",
      },
    ],
  },
  {
    title: "Mentors for Human Marketing",
    people: [
      {
        name: "Fauzan Romdhon",
        role: "Head of Marketing at ",
        image: "/hm1.png",
        company: "Roca Indonesia",
      },
      {
        name: "Alwin Giovanno",
        role: "Digital Marketing Manager at ",
        image: "/hm2.png",
        company: "Orang Tua Group",
      },
      {
        name: "Tobias Murtantyo",
        role: "Head of Marketing at ",
        image: "/hm3.png",
        company: "Tuku - Tuku Natural",
      },
      {
        name: "Arif Darmawan",
        role: "Head of Marketing at ",
        image: "/hm4.png",
        company: "APP Groupa",
      },
    ],
  },
];

const SpeakerSummit = () => (
  <SpeakerSection heading="Previous Speakers" groups={GROUPS} />
);

export default SpeakerSummit;
