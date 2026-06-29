"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const useWorkflows = () => {
  const trpc = useTRPC();
  return useQuery(trpc.workflows.getAll.queryOptions());
};

export default useWorkflows;
