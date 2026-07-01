"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useDeleteWorkflow from "@/hooks/workflows/use-delete-workflow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export function DeleteWorkflowDialog({
  workflow,
  children,
}: {
  workflow: { id: string; name: string };
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const deleteWorkflow = useDeleteWorkflow();

  const handleDelete = async () => {
    await deleteWorkflow.mutateAsync({ id: workflow.id });
    setOpen(false);
    router.push("/workflows");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete workflow</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{workflow.name}</strong>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <DialogPrimitive.Close asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogPrimitive.Close>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteWorkflow.isPending}
            onClick={handleDelete}
          >
            {deleteWorkflow.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
