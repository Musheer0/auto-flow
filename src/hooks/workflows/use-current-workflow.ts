"use client"

import { WorkflowContext } from "@/contexts/workflow-context"
import { useContext } from "react"

export function useCurrentWorkflow() {
  const context = useContext(WorkflowContext)
  if (!context) {
    throw new Error(
      "useCurrentWorkflow must be used within a WorkflowProvider",
    )
  }
  return context
}
