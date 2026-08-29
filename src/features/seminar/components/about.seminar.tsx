import { Container } from "@/components/ui";
import Image from "next/image";

const AboutSeminar = () => {
  return (
    <section className="w-full relative">
      <Image
        src="/bg-seminar.svg"
        alt="Seminar Background"
        width={0}
        height={0}
        className="absolute top-0 right-0 w-100 max-md:w-50 h-auto object-cover z-0"
      />
      <div className="size-100 z-0 rounded-full absolute blur-[500px]  left-0 bg-gold-500 -translate-x-1/2"></div>
      <Container className="z-10 flex flex-col gap-10 py-20">
        <div>
          <h1 className="font-bold text-3xl text-gradient-gold">Date</h1>
          <h1 className="font-bold text-3xl text-gold-300">17 February 2027</h1>
        </div>
        <div>
          <h1 className="font-bold text-3xl text-gradient-gold">Location</h1>
          <p className="text-gold-300 font-bold text-xl">
            Auditorium Soeria Atmadja Fakultas Ekonomi dan Bisnis, Universitas
            Indonesia, Kota Depok, Jawa Barat, 16424
          </p>
        </div>
      </Container>
    </section>
  );
};
export default AboutSeminar;
