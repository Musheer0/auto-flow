import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getById } from "@/data/workflow";
import { WorkflowProvider } from "@/contexts/workflow-context";
import { PageContent } from "./page-content";

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { orgId } = await auth();

  if (!orgId) notFound();

  const workflow = await getById({ id, orgId, include_data:true });
  const initialData = {
    ...workflow,
    created_at:
      typeof workflow.created_at === "string"
        ? workflow.created_at
        : workflow.created_at.toISOString(),
    updated_at:
      typeof workflow.updated_at === "string"
        ? workflow.updated_at
        : workflow.updated_at.toISOString(),
  };
  console.dir(initialData,null)
  return (
    <WorkflowProvider id={id} initialData={initialData}>
      <PageContent />
    </WorkflowProvider>
  );
}
