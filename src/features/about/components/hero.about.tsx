import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="relative flex max-md:flex-col gap-4 justify-center items-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="size-100 z-0 rounded-full absolute blur-[200px]  left-0 bg-gold-500 -translate-x-1/2"></div>
      <div className="relative z-10 flex items-center">
        <div className="relative mr-20 max-md:mr-6 flex justify-center">
          {" "}
          <Image
            src="/logo-only.svg"
            alt="Hero Image"
            width={0}
            height={0}
            className="object-contain shrink-0 w-50 max-md:w-20 h-auto"
          />
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-6 max-md:gap-3 w-[70%] max-md:text-center max-md:w-full">
        <h1 className="text-gradient-gold text-3xl max-md:text-xl font-bold">
          About Us
        </h1>
        <p className="text-gradient-gold text-lg max-md:text-sm">
          UI Studentpreneurs is a national-scale entrepreneurship event held
          annually to accommodate college students in entrepreneurship and
          innovation, aiming to serve as a business incubator for the younger
          generation. UI Studentpreneurs operates under Entrepreneur and
          Leadership Department (ELD) of Badan Eksekutif Mahasiswa Fakultas
          Ekonomi dan Bisnis Universitas Indonesia. Entering its 16th year, UISP
          presents a series of events consisting of the Business Model Canvas
          Competition, Seminars, and the Young Entrepreneur Summit (YES).
        </p>
      </div>
    </section>
  );
};
export default AboutHero;
