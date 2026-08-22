import Image from "next/image";

import { siteConfig } from "@/config";

import { SocialLinks } from "./social-links";

/**
 * The combined lockup: mark, gradient rule, then wordmark over the socials.
 *
 * The row is left at the flex default `items-stretch` on purpose — that is what
 * lets the rule size itself to the taller column instead of collapsing.
 */
export function FooterBrand() {
  return (
    <div className="flex gap-6">
      <Image
        src="/logo-only.svg"
        alt=""
        width={46}
        height={98}
        className="h-20 w-auto shrink-0"
      />

      <div aria-hidden className="w-1.5 rounded-full shrink-0 bg-gradient-gold" />

      <div className="flex flex-col justify-between">
        <Image
          src="/text-only.svg"
          alt={siteConfig.name}
          width={219}
          height={56}
          className="h-9 w-auto"
        />
        <SocialLinks />
      </div>
    </div>
  );
}
