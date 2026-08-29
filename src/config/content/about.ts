import type { PageSpec } from "./types";

export const aboutPage: PageSpec = {
  slug: "about",
  title: "About Us",
  path: "/about-us",
  blocks: [
    {
      key: "about.hero",
      title: "Hero",
      fields: [
        { name: "heading", label: "Heading", type: "text" },
        { name: "body", label: "Body", type: "textarea" },
        { name: "image", label: "Mark", type: "image" },
      ],
      defaults: {
        heading: "About Us",
        body: "UI Studentpreneurs is a national-scale entrepreneurship event held annually to accommodate college students in entrepreneurship and innovation, aiming to serve as a business incubator for the younger generation. UI Studentpreneurs operates under Entrepreneur and Leadership Department (ELD) of Badan Eksekutif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Indonesia. Entering its 16th year, UISP presents a series of events consisting of the Business Model Canvas Competition, Seminars, and the Young Entrepreneur Summit (YES).",
        image: "/logo-only.svg",
      },
    },
    {
      key: "about.video",
      title: "Company profile video",
      fields: [
        { name: "title", label: "Accessible title", type: "text" },
        {
          name: "src",
          label: "Video URL",
          type: "url",
          help: "YouTube, Vimeo or a file path — anything ReactPlayer understands.",
        },
      ],
      defaults: {
        title: "UI Studentpreneurs Company Profile",
        src: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
      },
    },
    {
      key: "about.theme",
      title: "Grand theme",
      fields: [
        { name: "heading", label: "Heading", type: "text" },
        {
          name: "quote",
          label: "Theme quote",
          type: "textarea",
          help: "Rendered inside the ellipse. Quotation marks are added for you.",
        },
        { name: "body", label: "Body", type: "textarea" },
        { name: "valuesHeading", label: "Core values heading", type: "text" },
      ],
      defaults: {
        heading: "Introducing Our Grand Theme",
        quote:
          "Innovate Beyond Uncertainty: Empowering Young Entrepreneurs to Shape Ideas into Impact.",
        body: "Amidst economic uncertainty, The 16th UI Studentpreneurs is here to empower young entrepreneurs to ensure their ideas go beyond mere concepts. Through encouragement to innovate, take concrete operational action, and build resilience, participants are driven to transform their ideas into solutions that create a real impact for society.",
        valuesHeading: "Core Values",
      },
    },
  ],
  collections: [
    {
      key: "about.values",
      title: "Core values",
      itemLabel: "Value",
      fields: [{ name: "label", label: "Label", type: "text" }],
      defaults: [
        { label: "INNOVATION" },
        { label: "ACTION" },
        { label: "RESILIENCE" },
      ],
    },
  ],
};
