"use client"

import { DeleteWorkflowDialog } from "@/components/workflows/delete-workflow-dialog"
import { EditWorkflowDialog } from "@/components/workflows/edit-workflow-dialog"
import { Button } from "@/components/ui/button"
import { useCurrentWorkflow } from "@/hooks/workflows/use-current-workflow"
import { PencilIcon, Trash2Icon } from "lucide-react"

export function PageContent() {
  const { data: workflow, isLoading } = useCurrentWorkflow()

  if (isLoading) {
    return <div className="p-6 text-muted-foreground">Loading...</div>
  }

  if (!workflow) {
    return <div className="p-6 text-muted-foreground">Workflow not found</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{workflow.name}</h1>
          {workflow.description && (
            <p className="text-sm text-muted-foreground">
              {workflow.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <EditWorkflowDialog workflow={workflow}>
            <Button variant="outline" size="sm">
              <PencilIcon className="mr-2 size-4" />
              Rename
            </Button>
          </EditWorkflowDialog>
          <DeleteWorkflowDialog workflow={workflow}>
            <Button variant="destructive" size="sm">
              <Trash2Icon className="mr-2 size-4" />
              Delete
            </Button>
          </DeleteWorkflowDialog>
        </div>
      </div>


    </div>
  )
}
