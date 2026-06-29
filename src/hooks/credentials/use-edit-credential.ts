"use client";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const useEditCredential = () => {
  const trpc = useTRPC();
  return useMutation(trpc.credentials.edit.mutationOptions());
};

export default useEditCredential;
