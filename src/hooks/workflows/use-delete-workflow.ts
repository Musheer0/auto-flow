"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const useDeleteWorkflow = () => {
  const trpc = useTRPC();
  return useMutation(trpc.workflows.delete.mutationOptions());
};

export default useDeleteWorkflow;
