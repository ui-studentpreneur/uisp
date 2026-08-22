import { SiteFooter, SiteHeader } from "@/components/layout";
import { Container } from "@/components/ui";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <Container as="main" className="flex-1">
        {children}
      </Container>
      <SiteFooter />
    </>
  );
}
