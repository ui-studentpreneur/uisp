import { heroFields, speakerFields, type PageSpec } from "./types";

/** Fields for one entry in a "what, when, where" list under an event hero. */
const detailFields = [
  { name: "heading", label: "Heading", type: "text" as const },
  {
    name: "date",
    label: "Date",
    type: "text" as const,
    help: "Optional. Shown with a calendar icon.",
  },
  {
    name: "location",
    label: "Location",
    type: "text" as const,
    help: "Optional. Shown with a pin icon.",
  },
  {
    name: "body",
    label: "Body",
    type: "textarea" as const,
    help: "Optional. Use instead of date and location for prose.",
  },
];

/** The floating register button that appears once the hero scrolls away. */
const widgetFields = [
  { name: "headline", label: "Headline", type: "text" as const },
  { name: "ctaText", label: "Button label", type: "text" as const },
];

export const seminarPage: PageSpec = {
  slug: "seminar",
  title: "Seminar",
  path: "/events/seminar",
  blocks: [
    {
      key: "seminar.hero",
      title: "Hero",
      fields: heroFields,
      defaults: {
        heading: "National Seminar",
        description:
          "The National Seminar is the largest entrepreneurial seminar organized by The 16th UI Studentpreneurs designed to provide valuable insights and discussions on entrepreneurship, innovation, and current industry trends through inspiring sessions led by experienced professionals. This event provides an immersive platform to individuals to explore self-potential and entrepreneurial interest .",
        ctaText: "Register Now!",
        ctaLink: "/",
        image: "/seminar-bg.png",
      },
    },
    {
      key: "seminar.widget",
      title: "Floating register button",
      fields: widgetFields,
      defaults: {
        headline: "Ready to Grow Beyond Limits?",
        ctaText: "Register Now!",
      },
    },
    {
      key: "seminar.speakers",
      title: "Speakers heading",
      fields: [{ name: "heading", label: "Heading", type: "text" }],
      defaults: { heading: "Our Speakers" },
    },
    {
      key: "seminar.cta",
      title: "Benefit and closing call to action",
      fields: [
        { name: "benefitHeading", label: "Benefit heading", type: "text" },
        { name: "benefitBody", label: "Benefit body", type: "textarea" },
        { name: "heading", label: "Closing heading", type: "text" },
        { name: "ctaText", label: "Button label", type: "text" },
        { name: "ctaLink", label: "Button link", type: "url" },
      ],
      defaults: {
        benefitHeading: "Benefit",
        benefitBody:
          "Participants will gain valuable insights from experienced professionals, expand their network, and deepen their understanding of entrepreneurship through inspiring discussions and knowledge-sharing sessions",
        heading: "Ready to Discover New Insights?",
        ctaText: "Register Now!",
        ctaLink: "/",
      },
    },
  ],
  collections: [
    {
      key: "seminar.details",
      title: "Event details",
      itemLabel: "Detail",
      fields: detailFields,
      defaults: [
        { heading: "Date", date: "17 February 2027", location: "", body: "" },
        {
          heading: "Location",
          date: "",
          location: "",
          body: "Auditorium Soeria Atmadja Fakultas Ekonomi dan Bisnis, Universitas Indonesia, Kota Depok, Jawa Barat, 16424",
        },
      ],
    },
    {
      key: "seminar.speakers",
      title: "Speakers",
      itemLabel: "Person",
      fields: speakerFields,
      defaults: [
        {
          group: "Speakers",
          name: "Alfyn Wendi P.",
          role: "Co-Founder of",
          company: "Republik Investor",
          image: "/speaker1.png",
        },
        {
          group: "Speakers",
          name: "Harwindra Yoga P.",
          role: "E-Commerce Manager of",
          company: "PT Campina Ice Cream Industry Tbk",
          image: "/speaker2.png",
        },
        {
          group: "Speakers",
          name: "Ketty Lie",
          role: "Co-founder of",
          company: "Danacita",
          image: "/speaker3.png",
        },
        {
          group: "Speakers",
          name: "Sandiaga S. Uno",
          role: "Former Minister of",
          company: "Tourism and Creative Economy of Indonesia",
          image: "/speaker4.png",
        },
        {
          group: "Speakers",
          name: "Airyn Tanu",
          role: "Founder & COO of",
          company: "Passion Jewelry Group",
          image: "/speaker5.png",
        },
      ],
    },
  ],
};

export const summitPage: PageSpec = {
  slug: "summit",
  title: "Young Entrepreneur Summit",
  path: "/events/youth-entrepreneur-summit",
  blocks: [
    {
      key: "summit.hero",
      title: "Hero",
      fields: heroFields,
      defaults: {
        heading: "Young Entrepreneur Summit",
        description:
          "The Young Entrepreneur Summit (YES) is an event that brings young entrepreneurs gain valuable insights, mentorships, and networking opportunities from industry experts,  startups and business experts from all over Indonesia. The goal itself is to help develop startups through sharing sessions.",
        ctaText: "Register Now!",
        ctaLink: "/",
        image: "/yes-bg.png",
      },
    },
    {
      key: "summit.widget",
      title: "Floating register button",
      fields: widgetFields,
      defaults: {
        headline: "Ready to Grow Beyond Limits?",
        ctaText: "Register Now!",
      },
    },
    {
      key: "summit.speakers",
      title: "Speakers heading",
      fields: [{ name: "heading", label: "Heading", type: "text" }],
      defaults: { heading: "Previous Speakers" },
    },
    {
      key: "summit.cta",
      title: "Closing call to action",
      fields: [
        { name: "heading", label: "Heading", type: "textarea" },
        { name: "ctaText", label: "Button label", type: "text" },
        { name: "ctaLink", label: "Button link", type: "url" },
      ],
      defaults: {
        heading:
          "Join the Young Entrepreneur Summit and spend two days with the founders, investors and builders shaping Indonesia's next generation of businesses.",
        ctaText: "Register Now!",
        ctaLink: "/",
      },
    },
  ],
  collections: [
    {
      key: "summit.details",
      title: "Event details",
      itemLabel: "Detail",
      fields: detailFields,
      defaults: [
        {
          heading: "Day 1",
          date: "28 January 2027",
          location: "Online Zoom Meeting",
          body: "",
        },
        {
          heading: "Day 2",
          date: "30 January 2027",
          location: "Online Zoom Meeting",
          body: "",
        },
        {
          heading: "Description",
          date: "",
          location: "",
          body: "Young Entrepreneur Summit (YES) is one of the flagship event series organized by The 16th UI Studentpreneurs, designed to empower young entrepreneurs through meaningful discussions, mentorship, and business development opportunities",
        },
        {
          heading: "Event Series",
          date: "",
          location: "",
          body: "Sharing Session, Mentoring Sessions, and Networking Session designed to provide participant with valuable insights, practical guidance, and meaningful professional connections",
        },
        {
          heading: "Benefit",
          date: "",
          location: "",
          body: "Gain strategic business insights, personalized mentorship, and valuable networking opportunities with experienced industry professionals",
        },
      ],
    },
    {
      key: "summit.speakers",
      title: "Mentors",
      itemLabel: "Mentor",
      fields: speakerFields,
      defaults: [
        {
          group: "Mentors for Technology",
          name: "Ihsansyah Galih",
          role: "IT Cybersecurity Co-Lead at",
          company: "Paragon Technology & Innovation",
          image: "/tech1.png",
        },
        {
          group: "Mentors for Technology",
          name: "Edy Susanto",
          role: "IT Director at ",
          company: "PT Trans Retail Indonesia",
          image: "/tech2.png",
        },
        {
          group: "Mentors for Technology",
          name: "Shabrina A. A. L.",
          role: "CRM & Digital Transformation Lead at ",
          company: "Paragon Technology & Innovation",
          image: "/tech3.png",
        },
        {
          group: "Mentors for Technology",
          name: "Sebastian Djaya A.",
          role: "Product Business Solution at ",
          company: "Paragon Technology & Innovation",
          image: "/tech4.png",
        },
        {
          group: "Mentors for Finance",
          name: "Sintawati K.",
          role: "Finance Director at",
          company: "Haleon",
          image: "/finance1.png",
        },
        {
          group: "Mentors for Finance",
          name: "Roni Syaputra",
          role: "Chief Financial Officer at",
          company: "MAKA",
          image: "/tech2.png",
        },
        {
          group: "Mentors for Finance",
          name: "William Djumadi",
          role: "Chief Financial Officer at",
          company: "Vidio",
          image: "/tech3.png",
        },
        {
          group: "Mentors for Finance",
          name: "Yopi Ivanda",
          role: "Chief Financial Officer at",
          company: "Gunung Prisma",
          image: "/tech4.png",
        },
        {
          group: "Mentors for Operations",
          name: "Daniel Trisno S.",
          role: "Operations Director at ",
          company: "Informa",
          image: "/ops1.png",
        },
        {
          group: "Mentors for Operations",
          name: "Rangga W. Primanto",
          role: "Head of Supply Chain & Logistics at ",
          company: "MAKA",
          image: "/ops2.png",
        },
        {
          group: "Mentors for Operations",
          name: "Artha Nugraha J.",
          role: "Warehouse Operations Support Manager at ",
          company: "IKEA Indonesia",
          image: "/ops3.png",
        },
        {
          group: "Mentors for Operations",
          name: "Arliansyah",
          role: "District Manager at ",
          company: "Paris Baguette Indonesia",
          image: "/ops4.png",
        },
        {
          group: "Mentors for Human Resources",
          name: "Didin Dimas",
          role: "Head of Human Resources at  ",
          company: "PT Astra International Tbk. - Daihatsu Sales Ops.",
          image: "/hr1.png",
        },
        {
          group: "Mentors for Human Resources",
          name: "Apriza Dewi",
          role: "Head of Human Resources  at",
          company: "Astra Zeneca",
          image: "/hr2.png",
        },
        {
          group: "Mentors for Human Resources",
          name: "Aukaria Rahman",
          role: "Head of Human Resources at ",
          company: "Central Proteina",
          image: "/hr3.png",
        },
        {
          group: "Mentors for Human Resources",
          name: "Suryo Sasono",
          role: "Chief Human Resources Officer at ",
          company: "Prudential Syariah",
          image: "/hr4.png",
        },
        {
          group: "Mentors for Human Marketing",
          name: "Fauzan Romdhon",
          role: "Head of Marketing at ",
          company: "Roca Indonesia",
          image: "/hm1.png",
        },
        {
          group: "Mentors for Human Marketing",
          name: "Alwin Giovanno",
          role: "Digital Marketing Manager at ",
          company: "Orang Tua Group",
          image: "/hm2.png",
        },
        {
          group: "Mentors for Human Marketing",
          name: "Tobias Murtantyo",
          role: "Head of Marketing at ",
          company: "Tuku - Tuku Natural",
          image: "/hm3.png",
        },
        {
          group: "Mentors for Human Marketing",
          name: "Arif Darmawan",
          role: "Head of Marketing at ",
          company: "APP Groupa",
          image: "/hm4.png",
        },
      ],
    },
  ],
};
