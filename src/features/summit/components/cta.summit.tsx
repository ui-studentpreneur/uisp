import { Button, Container } from "@/components/ui";
import { registrationUrls } from "@/config";

const CtaSummit = () => {
  return (
    <section className="relative isolate">
      <div className="absolute left-0 z-0 size-100 -translate-x-1/2 rounded-full bg-gold-500 blur-[200px]" />

      <Container className="relative z-10 flex flex-col items-center gap-8 py-24 text-center max-md:gap-6 max-md:py-16">
        <p className="text-gradient-gold max-w-3xl text-2xl font-bold max-md:text-lg">
          Join the Young Entrepreneur Summit and spend two days with the
          founders, investors and builders shaping Indonesia&apos;s next
          generation of businesses.
        </p>

        <a href={registrationUrls.youthEntrepreneurSummit} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Register Now!</Button>
        </a>
      </Container>
    </section>
  );
};

export default CtaSummit;
