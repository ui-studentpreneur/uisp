import { PagePlaceholder } from "@/components/ui";

export const metadata = { title: "Competition" };

export default function CompetitionPage() {
  return (
    <PagePlaceholder
      title="Competition"
      todo={[
        "Categories and eligibility",
        "Stages, deadlines and prize pool",
        "Rules / guidebook download",
        "Registration CTA wired to the real form",
        "Move content into src/features/competition/ once it has data",
      ]}
    />
  );
}
