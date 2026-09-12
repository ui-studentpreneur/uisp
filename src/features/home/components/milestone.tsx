import { Container, Reveal } from "@/components/ui";
import Image from "next/image";

import type { MilestoneItem } from "../types";

const MilestoneSection = ({
  heading,
  items,
}: {
  heading: string;
  items: readonly MilestoneItem[];
}) => {
  return (
    <section id="milestone" className="relative isolate flex items-center">
      <div className="flex w-full flex-col items-center gap-20 max-md:gap-10 py-24 text-center">
        <Reveal motion="stamp">
          <h2 className="text-gradient-gold text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
        </Reveal>

        {/* The row moved off `Container` and onto `Reveal`: the cards have to
            be the animated element's own children for the deal to stagger. */}
        <Container>
          <Reveal
            motion="deal"
            className="flex max-md:flex-col justify-center items-stretch max-md:items-center gap-20"
          >
            {items.map((item, index) => (
              // `w-70` over `max-w-70`: the cards have to be one width even
              // when the shorter titles would let them shrink.
              <div
                key={index}
                className="flex w-70 max-w-full p-1 rounded-3xl bg-gradient-gold"
              >
                <div className="rounded-3xl w-full p-10 bg-gradient-timeline flex flex-col gap-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={0}
                    height={0}
                    className="w-auto h-40 object-contain"
                  />
                  {/* Pushed to the bottom so a two-line title does not shift
                      the image off the line its neighbours sit on. */}
                  <h3 className="mt-auto text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  );
};
export default MilestoneSection;
