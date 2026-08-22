import { Navbar, SiteFooter } from "@/components/layout";
import { Container } from "@/components/ui";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {/* `pt-20` clears the fixed navbar. */}
      <Container as="main" className="flex-1 pt-20">
        {children}
      </Container>
      <SiteFooter />
    </>
  );
}
