import { heroFields, type PageSpec } from "./types";

export const competitionPage: PageSpec = {
  slug: "competition",
  title: "Competition",
  path: "/competition",
  blocks: [
    {
      key: "competition.hero",
      title: "Hero",
      fields: heroFields,
      defaults: {
        heading: "Business Model Canvas Competition",
        description:
          "The Business Model Canvas Competition is an event to foster entrepreneurial spirit, encourage innovative business ideas, and provide a platform for young people to present creative and viable business models.",
        ctaText: "Register Now!",
        ctaLink: "/",
        image: "/image-compe.png",
      },
    },
    {
      key: "competition.about",
      title: "Description",
      fields: [
        { name: "heading", label: "Heading", type: "text" },
        {
          name: "body",
          label: "Body",
          type: "textarea",
          help: "Blank lines become paragraph breaks.",
        },
      ],
      defaults: {
        heading: "Description",
        body: "Business Model Canvas Competition (BMCC), organized by The 16th UI Studentpreneurs, is designed to encourage students to explore entrepreneurship by developing innovative ideas and presenting impactful business models.\n\nCompete for a total prize pool of IDR 20.000.000+ and gain valuable opportunities to showcase your business ideas.\n\nParticipants will gain intensive training, exclusive mentoring sessions, networking opportunities, and valuable business pitching experience",
      },
    },
    {
      key: "competition.timeline",
      title: "Timeline heading",
      fields: [{ name: "heading", label: "Heading", type: "text" }],
      defaults: { heading: "Competition Timeline" },
    },
    {
      key: "competition.cta",
      title: "Closing call to action",
      fields: [
        { name: "heading", label: "Heading", type: "text" },
        { name: "ctaText", label: "Button label", type: "text" },
        { name: "ctaLink", label: "Button link", type: "url" },
      ],
      defaults: {
        heading: "Ready to Take the Challenge?",
        ctaText: "Register Now!",
        ctaLink: "/",
      },
    },
  ],
  collections: [
    {
      key: "competition.timeline",
      title: "Timeline",
      itemLabel: "Timeline entry",
      fields: [
        { name: "date", label: "Date", type: "text" },
        { name: "title", label: "Title", type: "text" },
      ],
      defaults: [
        { date: "19 September 2026", title: "Open Registration BMCC" },
        {
          date: "31 October 2026",
          title: "Close Registration & Submission BMCC",
        },
        { date: "2 November 2026", title: "Semifinal Round BMCC" },
        {
          date: "27 November 2026",
          title: "Close Semifinal Round Submission BMCC",
        },
        { date: "9 January 2027", title: "Technical Meeting Final Round" },
        { date: "19 - 20 February 2027", title: "Training & Mentoring" },
        { date: "27 February 2027", title: "Pitching Day & Awarding Night" },
      ],
    },
  ],
};
