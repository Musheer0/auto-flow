"use client"
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'

const useEditWorkflow = () => {
  const trpc = useTRPC()
  return useMutation(trpc.workflows.edit.mutationOptions())
}

export default useEditWorkflow
