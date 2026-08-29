import Image from "next/image";

/**
 * One person on a speaker list. Declared here rather than in `src/types/`
 * because it is this component's props contract, not a domain type any
 * feature owns.
 */
export type Speaker = {
  name: string;
  role: string;
  company: string;
  image: string;
};

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div
      // Animation hook for callers that reveal the cards on scroll.
      data-speaker-card
      className="flex w-80 flex-col items-center gap-4"
    >
      <h3 className="text-gradient-gold text-lg font-bold">{speaker.name}</h3>

      <Image
        src={speaker.image}
        alt={speaker.name}
        width={200}
        height={200}
        className="h-50 w-50 object-cover mr-4"
      />

      <div className="text-gradient-gold">
        <p className="text-md font-semibold">{speaker.role}</p>
        <p className="text-lg font-bold text-shadow-2xs">{speaker.company}</p>
      </div>
    </div>
  );
}
