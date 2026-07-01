"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";
import { Button } from "@/components/ui/button";
import useDeleteCredential from "@/hooks/credentials/use-delete-credential";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function DeleteCredentialDialog({
  credential,
  children,
}: {
  credential: { id: string; name: string };
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const deleteCredential = useDeleteCredential();

  const handleDelete = async () => {
    await deleteCredential.mutateAsync({ id: credential.id });
    queryClient.invalidateQueries({ queryKey: [["credentials"]] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete credential</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{credential.name}</strong>?
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
            disabled={deleteCredential.isPending}
            onClick={handleDelete}
          >
            {deleteCredential.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
