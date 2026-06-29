"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const useCredentials = () => {
  const trpc = useTRPC();
  return useQuery(trpc.credentials.getAll.queryOptions());
};

export default useCredentials;
