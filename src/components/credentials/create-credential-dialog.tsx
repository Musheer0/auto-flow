"use client";

import { useForm } from "@tanstack/react-form";
import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import useCreateCredential from "@/hooks/credentials/use-create-credential";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { NodeType } from "@/generated/prisma/enums";

const credentialTypes = Object.values(NodeType) as readonly NodeType[];

export function CreateCredentialDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const createCredential = useCreateCredential();

  const form = useForm({
    defaultValues: {
      name: "",
      type: "" as NodeType,
      secret: "",
    },
    onSubmit: async ({ value, formApi }) => {
      await createCredential.mutateAsync({
        name: value.name,
        type: value.type,
        secret: value.secret,
      });
      formApi.reset();
      queryClient.invalidateQueries({ queryKey: [["credentials"]] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create credential</DialogTitle>
          <DialogDescription>
            Add a new credential for your workflows.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value?.trim() ? "Credential name is required" : undefined,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="My credential"
                  autoFocus
                />
                {field.state.meta.errors ? (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="type">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Type</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as NodeType)}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {credentialTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <form.Field
            name="secret"
            validators={{
              onChange: ({ value }) =>
                !value?.trim() ? "Secret value is required" : undefined,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Secret</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter the secret value"
                />
                {field.state.meta.errors ? (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-2">
            <DialogPrimitive.Close asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogPrimitive.Close>
            <Button type="submit" disabled={createCredential.isPending}>
              {createCredential.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
