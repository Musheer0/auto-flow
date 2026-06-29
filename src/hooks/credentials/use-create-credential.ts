"use client";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const useCreateCredential = () => {
  const trpc = useTRPC();
  return useMutation(trpc.credentials.create.mutationOptions());
};

export default useCreateCredential;
