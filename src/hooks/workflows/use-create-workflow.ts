"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const useCreateWorkflow = () => {
  const trpc = useTRPC();
  return useMutation(trpc.workflows.create.mutationOptions());
};

export default useCreateWorkflow;
