import { PagePlaceholder } from "@/components/ui";

export const metadata = { title: "Seminar" };

export default function SeminarPage() {
  return (
    <PagePlaceholder
      title="Seminar"
      todo={[
        "Date, venue and agenda",
        "Speaker line-up (reuse SpeakerCard from the home feature)",
        "Ticketing / registration link",
      ]}
    />
  );
}
