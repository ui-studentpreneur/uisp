import Image from "next/image";

import { Container } from "@/components/ui";
import { Calendar, MapPin } from "lucide-react";

const AboutSummit = () => {
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
      <Container className="relative z-10 flex flex-col gap-10 py-20">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl text-gradient-gold">Day 1</h1>
          {/* Matches the home page timeline. */}

          <div className="flex items-center gap-2">
            <Calendar className="text-gold-300" />
            <h1 className="font-bold text-xl text-gold-300">28 January 2027</h1>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-gold-300" />
            <h1 className="font-bold text-xl text-gold-300">
              Online Zoom Meeting
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl text-gradient-gold">Day 2</h1>
          {/* Matches the home page timeline. */}

          <div className="flex items-center gap-2">
            <Calendar className="text-gold-300" />
            <h1 className="font-bold text-xl text-gold-300">30 January 2027</h1>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-gold-300" />
            <h1 className="font-bold text-xl text-gold-300">
              Online Zoom Meeting
            </h1>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-3xl text-gradient-gold">Description</h1>
          <p className="text-gold-300 font-bold text-xl">
            Young Entrepreneur Summit (YES) is one of the flagship event series
            organized by The 16th UI Studentpreneurs, designed to empower young
            entrepreneurs through meaningful discussions, mentorship, and
            business development opportunities
          </p>
        </div>
        <div>
          <h1 className="font-bold text-3xl text-gradient-gold">
            Event Series
          </h1>
          <p className="text-gold-300 font-bold text-xl">
            Sharing Session, Mentoring Sessions, and Networking Session designed
            to provide participant with valuable insights, practical guidance,
            and meaningful professional connections
          </p>
        </div>
        <div>
          <h1 className="font-bold text-3xl text-gradient-gold">Benefit</h1>
          <p className="text-gold-300 font-bold text-xl">
            Gain strategic business insights, personalized mentorship, and
            valuable networking opportunities with experienced industry
            professionals
          </p>
        </div>
      </Container>
    </section>
  );
};
export default AboutSummit;
