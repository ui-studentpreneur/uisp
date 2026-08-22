import Image from "next/image";
import Link from "next/link";

import { routes, siteConfig } from "@/config";

/** `next/image` skips optimisation automatically for a `.svg` src. */
export function NavbarBrand() {
  return (
    <Link href={routes.home} aria-label={siteConfig.name} className="shrink-0">
      <Image
        src="/logo.svg"
        alt={siteConfig.name}
        width={288}
        height={71}
        priority
        className="h-8 w-auto sm:h-10"
      />
    </Link>
  );
}
