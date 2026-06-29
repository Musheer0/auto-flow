"use client"

import useWorkflowById from "@/hooks/workflows/use-workflow-by-id"
import { createContext, type ReactNode } from "react"

type WorkflowData = {
  id: string
  name: string
  description: string | null
  user_id: string
  org_id: string
  created_at: string
  updated_at: string
}

type WorkflowContextValue = ReturnType<typeof useWorkflowById>

const WorkflowContext = createContext<WorkflowContextValue | null>(null)

export function WorkflowProvider({
  id,
  initialData,
  children,
}: {
  id: string
  initialData: WorkflowData
  children: ReactNode
}) {
  const query = useWorkflowById(id, initialData)

  return (
    <WorkflowContext.Provider value={query}>
      {children}
    </WorkflowContext.Provider>
  )
}

export { WorkflowContext }
