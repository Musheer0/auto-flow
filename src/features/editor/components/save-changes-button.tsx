"use client";

import React from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useSaveWorkflow from "@/hooks/workflows/use-save-workflow";
import { useEditorStore } from "../hooks/use-editor-store";
import { transformReactFlowDataToServerData } from "../utils/transform-data";

const SaveChangesButton = () => {
  const { nodes, edges, viewport } = useEditorStore();
  const { id} = useParams<{ id: string }>();

  const { mutateAsync, isPending } = useSaveWorkflow();

  if (!id) return <>No workflow id</>;

  const onClick = async () => {
    try {
      await toast.promise(
        mutateAsync({
          workflow_id: id,
          data: transformReactFlowDataToServerData(
            nodes,
            edges,
            viewport
          ),
        }),
        {
          loading: "Saving workflow...",
          success: "Workflow saved successfully!",
          error: (err) =>
            err instanceof Error ? err.message : "Failed to save workflow.",
        }
      );
    } catch {
      // toast.promise already shows the error toast
    }
  };

  return (
    <Button onClick={onClick} disabled={isPending}>
      {isPending ? "Saving..." : "Save Changes"}
    </Button>
  );
};

export default SaveChangesButton;