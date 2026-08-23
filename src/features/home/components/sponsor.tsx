import { Marquee } from "./marquee";

const sponsorData = [
  {
    title: "Our Sponsor",
    mainItem: [
      "/sponsor1.png",
      "/sponsor2.png",
      "/sponsor3.png",
      "/sponsor4.png",
      "/sponsor5.png",
      "/sponsor6.png",
      "/sponsor7.png",
    ],
    item: [
      "/sponsor1.png",
      "/sponsor2.png",
      "/sponsor3.png",
      "/sponsor4.png",
      "/sponsor5.png",
      "/sponsor6.png",
      "/sponsor7.png",
    ],
  },
  {
    title: "Our Media Partner",
    mainItem: [
      "/medpar1.png",
      "/medpar2.png",
      "/medpar3.png",
      "/medpar4.png",
      "/medpar5.png",
      "/medpar6.png",
      "/medpar7.png",
      "/medpar8.png",
      "/medpar9.png",
      "/medpar10.png",
      "/medpar11.png",
      "/medpar12.png",
      "/medpar13.png",
      "/medpar14.png",
      "/medpar15.png",
      "/medpar16.png",
      "/medpar17.png",
      "/medpar18.png",
      "/medpar19.png",
      "/medpar20.png",
      "/medpar21.png",
      "/medpar22.png",
      "/medpar23.png",
      "/medpar24.png",
      "/medpar25.png",
      "/medpar26.png",
      "/medpar27.png",
      "/medpar28.png",
      "/medpar29.png",
      "/medpar30.png",
      "/medpar31.png",
      "/medpar32.png",
      "/medpar33.png",
      "/medpar34.png",
      "/medpar35.png",
      "/medpar36.png",
      "/medpar37.png",
      "/medpar38.png",
      "/medpar39.png",
      "/medpar40.png",
      "/medpar41.png",
      "/medpar42.png",
      "/medpar43.png",
      "/medpar44.png",
      "/medpar45.png",
      "/medpar46.png",
      "/medpar47.png",
    ],
    item: [
      "/medpar1.png",
      "/medpar2.png",
      "/medpar3.png",
      "/medpar4.png",
      "/medpar5.png",
      "/medpar6.png",
      "/medpar7.png",
      "/medpar8.png",
      "/medpar9.png",
      "/medpar10.png",
      "/medpar11.png",
      "/medpar12.png",
      "/medpar13.png",
      "/medpar14.png",
      "/medpar15.png",
      "/medpar16.png",
      "/medpar17.png",
      "/medpar18.png",
      "/medpar19.png",
      "/medpar20.png",
      "/medpar21.png",
      "/medpar22.png",
      "/medpar23.png",
      "/medpar24.png",
      "/medpar25.png",
      "/medpar26.png",
      "/medpar27.png",
      "/medpar28.png",
      "/medpar29.png",
      "/medpar30.png",
      "/medpar31.png",
      "/medpar32.png",
      "/medpar33.png",
      "/medpar34.png",
      "/medpar35.png",
      "/medpar36.png",
      "/medpar37.png",
      "/medpar38.png",
      "/medpar39.png",
      "/medpar40.png",
      "/medpar41.png",
      "/medpar42.png",
      "/medpar43.png",
      "/medpar44.png",
      "/medpar45.png",
      "/medpar46.png",
      "/medpar47.png",
    ],
  },
];

/**
 * Seconds of travel per logo. Duration is derived from the row's length, so a
 * 7-logo row and a 47-logo row drift at the same perceived speed.
 */
const SECONDS_PER_ITEM = 3;

/**
 * Relative speed of each row. The first row drifts slower than the second,
 * which is what gives the two bands their parallax against each other.
 */
const ROW_SPEED = [0.7, 1.4] as const;

/**
 * Travel direction per row. Flip a single entry to make the two bands run
 * against each other instead of together.
 */
const ROW_REVERSED = [true, false] as const;

const marqueeSeconds = (count: number, row: number) =>
  Math.round((count * SECONDS_PER_ITEM) / ROW_SPEED[row]);

const EDGE =
  "linear-gradient(90deg, rgba(177, 119, 99, 0) 0%, #F6CCB3 25%, #F5B899 48%, #F6D6BF 74%, rgba(177, 119, 99, 0) 100%)";

const SHEEN =
  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 27%, rgba(255,255,255,0.4) 54%, rgba(255,255,255,0.25) 77%, rgba(255,255,255,0) 100%)";

const SponsorSection = () => {
  return (
    <section id="sponsor" className="relative isolate flex items-center">
      <div className="relative z-10 flex w-full flex-col items-center gap-20 py-24 text-center max-md:gap-10">
        {sponsorData.map((sponsor) => {
          const rows = [sponsor.mainItem, sponsor.item];

          return (
            <div
              key={sponsor.title}
              className="flex w-full flex-col gap-10 max-md:gap-6"
            >
              <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {sponsor.title}
              </h2>

              <div className="relative w-full py-1">
                <div
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{ background: EDGE }}
                />
                <div
                  className="absolute bottom-0 left-0 h-1 w-full"
                  style={{ background: EDGE }}
                />

                <div
                  className="flex w-full flex-col gap-10 py-10"
                  style={{ background: SHEEN }}
                >
                  {rows.map((logos, row) => (
                    <Marquee
                      key={row}
                      seconds={marqueeSeconds(logos.length, row)}
                      reverse={ROW_REVERSED[row]}
                    >
                      {logos.map((logo) => (
                        <img
                          key={logo}
                          src={logo}
                          alt=""
                          className={
                            row === 0
                              ? "h-20 w-auto object-contain"
                              : "h-15 w-auto object-contain"
                          }
                        />
                      ))}
                    </Marquee>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default SponsorSection;
