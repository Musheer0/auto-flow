"use client";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const useDeleteCredential = () => {
  const trpc = useTRPC();
  return useMutation(trpc.credentials.delete.mutationOptions());
};

export default useDeleteCredential;
