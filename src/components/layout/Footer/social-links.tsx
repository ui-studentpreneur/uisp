import Image from "next/image";

import { readItems } from "@/lib/content/queries";

export async function SocialLinks() {
  const socials = await readItems("footer.social");

  return (
    <ul className="flex items-center gap-4">
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="block transition-opacity hover:opacity-70"
          >
            {/* Decorative: the accessible name is on the link. */}
            <Image
              src={social.icon}
              alt=""
              width={20}
              height={20}
              className="size-6"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
