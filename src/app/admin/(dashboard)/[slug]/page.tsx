import { notFound } from "next/navigation";

import { pageSpec } from "@/config/content";
import { PageEditor, loadPage } from "@/features/admin";

export default async function AdminPageEditor({
  params,
}: PageProps<"/admin/[slug]">) {
  const { slug } = await params;

  const spec = pageSpec(slug);
  if (!spec) notFound();

  return <PageEditor loaded={await loadPage(spec)} />;
}
