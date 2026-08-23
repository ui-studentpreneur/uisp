import { Navbar, SiteFooter } from "@/components/layout";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {/*
        No `Container` here: sections set their own width so a hero can go
        full-bleed. The top padding clears the fixed navbar.
      */}
      <main className="flex-1 pt-[var(--navbar-height)]">{children}</main>
      <SiteFooter />
    </>
  );
}
