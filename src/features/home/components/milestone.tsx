import { Container } from "@/components/ui";
import Image from "next/image";

const data = [
  {
    image: "/milestone1.svg",
    title: "Grand Opening Webinar",
  },
  {
    image: "/milestone2.svg",
    title: "Championpreneur Talks",
  },
  {
    image: "/milestone3.svg",
    title: "Young Entrepreneur Summit",
  },
];

const MilestoneSection = () => {
  return (
    <section id="milestone" className="relative isolate flex items-center">
      <div className="flex w-full flex-col items-center gap-6 py-24 text-center max-md:gap-4">
        <h2 className="text-gradient-gold text-3xl font-semibold tracking-tight sm:text-4xl">
          Our Milestones
        </h2>

        <Container className="flex max-md:flex-col justify-center items-center gap-20">
          {data.map((item, index) => (
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
        </Container>
      </div>
    </section>
  );
};
export default MilestoneSection;
