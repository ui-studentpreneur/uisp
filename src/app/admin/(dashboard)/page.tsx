import { PageIndex, pageSummaries } from "@/features/admin";

export default async function AdminHomePage() {
  return <PageIndex summaries={await pageSummaries()} />;
}
