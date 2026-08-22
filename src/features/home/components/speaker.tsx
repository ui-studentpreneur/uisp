import { Container } from "@/components/ui";
import { Button } from "@/components/ui";

const data = [
  {
    title: "Speakers",
    item: [
      {
        name: "Alfyn Wendi P.",
        role: "Co-Founder of",
        image: "/speaker1.png",
        company: "Republik Investor",
      },
      {
        name: "Harwindra Yoga P.",
        role: "E-Commerce Manager of ",
        image: "/speaker2.png",
        company: "PT Campina Ice Cream Industry Tbk",
      },
      {
        name: "Ketty Lie",
        role: "Co-founder of",
        image: "/speaker3.png",
        company: "Danacita",
      },
      {
        name: "Sandiaga S. Uno",
        role: "Former Minister of",
        image: "/speaker4.png",
        company: "Tourism and Creative Economy of Indonesia",
      },
      {
        name: "Airyn Tanu",
        role: "Founder & COO of",
        image: "/speaker5.png",
        company: "Passion Jewelry Group",
      },
    ],
  },
  {
    title: "Assessors",
    item: [
      {
        name: "Anindita Nur Annisa",
        role: "Investment Analyst of",
        image: "/speaker6.png",
        company: "MDI Ventures",
      },
      {
        name: "Maksun Djatmiko",
        role: "Director of",
        image: "/speaker7.png",
        company: "Arka Investama Raharja",
      },
      {
        name: "Salsabila Firyal Fitri",
        role: "Investments of",
        image: "/speaker8.png",
        company: "Telkomsel Ventures",
      },
    ],
  },
];

const SpeakerSection = () => {
  return (
    <section id="speaker" className="relative isolate flex items-center">
      <div className="flex w-full flex-col items-center gap-20 max-md:gap-10 py-24 text-center">
        <h2 className="text-gradient-gold text-3xl font-bold tracking-tight px-4 sm:text-4xl">
          Our Previous Speakers and Assessors
        </h2>

        <Container className="flex flex-col justify-center items-center gap-20">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-12"
            >
              <Button size={"lg"} className="w-fit" key={index}>
                {item.title}
              </Button>
              <div className="flex flex-wrap justify-center gap-20">
                {item.item.map((speaker, idx) => (
                  <div
                    key={idx}
                    className="w-70 flex flex-col items-center gap-4"
                  >
                    <h3 className="text-lg text-gradient-gold font-bold">
                      {speaker.name}
                    </h3>
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-50 h-50 object-cover mr-4"
                    />

                    <div className="text-gradient-gold">
                      <p className="font-semibold text-md">{speaker.role}</p>
                      <p className="font-bold text-lg text-shadow-2xs">{speaker.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
};
export default SpeakerSection;
