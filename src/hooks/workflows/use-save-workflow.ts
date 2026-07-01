import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useSaveWorkflow = () => {
  const trpc =  useTRPC()
  return useMutation(trpc.workflows.saveWorkflow.mutationOptions())
}

export default useSaveWorkflow