"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Node, NodeProps } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import { manualTriggerSchema } from "@/features/nodes/schemas/node-forms.schema";
import { useFormDialog } from "./form-dialog-provider";

type FormValues = z.infer<typeof manualTriggerSchema>;

export function ManualTriggerForm({ data }: { data: NodeProps<Node> }) {
  const updateNodeData = useEditorStore((s) => s.updateNodeData);
  const { close } = useFormDialog();
  const form = useForm<FormValues>({
    resolver: zodResolver(manualTriggerSchema),
    defaultValues: data.data as FormValues,
  });

  function onSubmit(formData: FormValues) {
    updateNodeData(data.id, formData);
    toast("Manual Trigger saved");
    close();
  }

  return (
    <FormProvider {...form}>
      <form
        id="form-manual"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          name="node_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>Node Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="My Manual Trigger"
                  autoComplete="off"
                />
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-manual">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
