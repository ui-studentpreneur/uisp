import type { PageSpec } from "./types";

/**
 * The footer is not a page, but it is edited exactly like one — so it is
 * modelled as a `PageSpec` and the admin lists it beside the real pages.
 * `path` points at the contact anchor, which is where it lives on every page.
 */
export const footerPage: PageSpec = {
  slug: "footer",
  title: "Footer",
  path: "/#contact",
  blocks: [],
  collections: [
    {
      key: "footer.contacts",
      title: "Contact cards",
      itemLabel: "Contact",
      fields: [
        { name: "title", label: "Title", type: "text" },
        {
          name: "phone",
          label: "Phone",
          type: "text",
          help: "Spaces are fine — the tel: link strips them.",
        },
        { name: "email", label: "Email", type: "text" },
      ],
      defaults: [
        {
          title: "Sponsorship & In-kind",
          phone: "+62 812 0000 0001",
          email: "sales@example.com",
        },
        {
          title: "Media Partnership",
          phone: "+62 812 0000 0002",
          email: "partnership@example.com",
        },
        {
          title: "General Queries",
          phone: "+62 812 0000 0003",
          email: "support@example.com",
        },
      ],
    },
    {
      key: "footer.social",
      title: "Social links",
      itemLabel: "Social link",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          help: "Used as the link's accessible name.",
        },
        { name: "href", label: "Profile URL", type: "url" },
        { name: "icon", label: "Icon", type: "image" },
      ],
      defaults: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com",
          icon: "/linkedin.svg",
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com",
          icon: "/instagram.svg",
        },
        {
          label: "TikTok",
          href: "https://www.tiktok.com",
          icon: "/tiktok.svg",
        },
        { label: "X", href: "https://x.com", icon: "/x.svg" },
      ],
    },
  ],
};
