"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import type { tWorkflowDataSchema } from "@/schemas/editor";

type WorkflowData = {
  id: string;
  name: string;
  description: string | null;
  user_id: string;
  org_id: string;
  created_at: string;
  updated_at: string;
  flow_data?: tWorkflowDataSchema | null;
};

const useWorkflowById = (id: string, initialData?: WorkflowData) => {
  const trpc = useTRPC();
  return useQuery({
    ...trpc.workflows.getById.queryOptions({ id, include_data: true }),
    initialData,
    refetchOnWindowFocus:false
  });
};

export default useWorkflowById;
