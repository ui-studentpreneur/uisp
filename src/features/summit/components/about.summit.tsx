import Image from "next/image";

import { EventDetail, type EventDetailData } from "@/components/event";
import { Container, Reveal } from "@/components/ui";

const AboutSummit = ({ details }: { details: readonly EventDetailData[] }) => {
  return (
    <section className="w-full relative">
      <Image
        src="/yes-vector.svg"
        alt=""
        aria-hidden
        width={0}
        height={0}
        className="absolute top-0 right-0 w-60 max-md:w-30 h-auto object-cover z-0"
      />
      <div className="size-100 z-0 rounded-full absolute blur-[500px]  left-0 bg-gold-500 -translate-x-1/2"></div>

      <Container className="relative z-10 py-20">
        <Reveal motion="brief" className="flex flex-col gap-10">
          {details.map((detail, index) => (
            <EventDetail key={index} detail={detail} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
};
export default AboutSummit;
