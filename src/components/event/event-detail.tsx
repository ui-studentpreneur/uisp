import { Calendar, MapPin } from "lucide-react";

/**
 * One "what, when, where" row under an event hero.
 *
 * Every field but the heading is optional, which is what lets one shape cover
 * both kinds of row the events pages need: a dated session with a venue, and a
 * plain block of prose such as Description or Benefit. The editor decides which
 * by filling in date and location, or body.
 */
export type EventDetailData = {
  heading: string;
  date?: string;
  location?: string;
  body?: string;
};

const VALUE = "font-bold text-xl text-gold-300";

export function EventDetail({ detail }: { detail: EventDetailData }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-3xl text-gradient-gold">
        {detail.heading}
      </h2>

      {detail.date ? (
        <div className="flex items-center gap-2">
          <Calendar aria-hidden className="text-gold-300" />
          <p className={VALUE}>{detail.date}</p>
        </div>
      ) : null}

      {detail.location ? (
        <div className="flex items-center gap-2">
          <MapPin aria-hidden className="text-gold-300" />
          <p className={VALUE}>{detail.location}</p>
        </div>
      ) : null}

      {detail.body ? <p className={VALUE}>{detail.body}</p> : null}
    </div>
  );
}
