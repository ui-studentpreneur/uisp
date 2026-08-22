export type SocialLink = {
  label: string;
  href: string;
  /** Path under /public. */
  icon: string;
};

// TODO: swap for the real profile URLs.
export const socialLinks: readonly SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "/linkedin.svg" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "/instagram.svg" },
  { label: "TikTok", href: "https://www.tiktok.com", icon: "/tiktok.svg" },
  { label: "X", href: "https://x.com", icon: "/x.svg" },
] as const;

export type ContactCard = {
  title: string;
  phone: string;
  email: string;
};

// TODO: swap for the real contact people.
export const contactCards: readonly ContactCard[] = [
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
] as const;
