import { Reveal } from "@/components/ui";

import { Marquee } from "./marquee";

/** One band: a heading and the logos that scroll beneath it. */
export type SponsorBand = {
  title: string;
  items: readonly { id: string; image?: string }[];
};

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

const SponsorSection = ({ groups }: { groups: readonly SponsorBand[] }) => {
  return (
    <section id="sponsor" className="relative isolate flex items-center">
      <div className="relative z-10 flex w-full flex-col items-center gap-20 py-24 text-center max-md:gap-10">
        {groups.map((sponsor) => {
          // The same logos twice: two bands drifting at different speeds and
          // in opposite directions is what gives the section its depth.
          const logos = sponsor.items.map((item) => item.image ?? "");
          const rows = [logos, logos];

          return (
            <div
              key={sponsor.title}
              className="flex w-full flex-col gap-10 max-md:gap-6"
            >
              <Reveal motion="stamp">
                <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {sponsor.title}
                </h2>
              </Reveal>

              {/* Each band waits for its own trigger — the two are stacked far
                  enough apart that one shared one would spend the second. */}
              <Reveal motion="unfurl">
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
                        {logos.map((logo, index) => (
                          <img
                            key={`${logo}-${index}`}
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
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default SponsorSection;
