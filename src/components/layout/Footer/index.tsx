import Image from "next/image";

import { Container } from "@/components/ui";

import { ContactList } from "./contact-list";
import { FooterBrand } from "./footer-brand";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-donker">
      {/*
        Decorative skyline. Its own alpha fades toward the top, so it melts into
        the gradient without needing a mask.

        `-z-10` inside `isolate` paints it above the footer's gradient
        background but below the content — that is the whole point of the
        negative index here. Full width with `h-auto` keeps the natural aspect
        and anchors it to the bottom, rather than `object-cover` blowing the
        skyline up on wide screens.
      */}
      <Image
        src="/footer-bg.png"
        alt=""
        aria-hidden
        width={1420}
        height={432}
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 bottom-0 opacity-50 -z-10 h-auto w-full"
      />

      <Container className="relative pt-20 max-md:pt-16 pb-60 max-md:pb-30">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <FooterBrand />
          <ContactList />
        </div>
      </Container>
    </footer>
  );
}
