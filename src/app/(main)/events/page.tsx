import { PagePlaceholder } from "@/components/ui";

export const metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <PagePlaceholder
      title="Events"
      todo={[
        "Overview listing that links to each event",
        "Shared event card component for the children below",
        "Decide if this stays a landing page or redirects to the first event",
      ]}
    />
  );
}
