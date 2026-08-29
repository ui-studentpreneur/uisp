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
            className="flex max-md:flex-col justify-center items-center gap-20"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="p-1 max-w-70 rounded-3xl bg-gradient-gold"
              >
                <div className="rounded-3xl w-full h-full p-10 bg-gradient-timeline flex flex-col gap-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={0}
                    height={0}
                    className="w-auto h-40 object-contain"
                  />
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
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
