"use client";

import { DeleteWorkflowDialog } from "@/components/workflows/delete-workflow-dialog";
import { EditWorkflowDialog } from "@/components/workflows/edit-workflow-dialog";
import { Button } from "@/components/ui/button";
import { useCurrentWorkflow } from "@/hooks/workflows/use-current-workflow";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Editor from "@/features/editor/components";

export function PageContent() {
  return (
    <div className="flex flex-col  w-full h-screen gap-6 p-6">

      <Editor/>
    </div>
  );
}
