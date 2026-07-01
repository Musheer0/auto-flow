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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import { httpSchema } from "@/features/nodes/schemas/node-forms.schema";
import { useFormDialog } from "./form-dialog-provider";
import { KeyValueInput } from "./key-value-input";

type FormValues = z.infer<typeof httpSchema>;

export function HttpForm({ data }: { data: NodeProps<Node> }) {
  const updateNodeData = useEditorStore((s) => s.updateNodeData);
  const { close } = useFormDialog();
  const form = useForm<FormValues>({
    resolver: zodResolver(httpSchema),
    defaultValues: data.data as FormValues,
  });

  function onSubmit(formData: FormValues) {
    updateNodeData(data.id, formData);
    toast("HTTP Request saved");
    close();
  }

  return (
    <FormProvider {...form}>
      <form
        id="form-http"
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
                  placeholder="My HTTP Request"
                  autoComplete="off"
                />
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://api.example.com/data"
                  autoComplete="off"
                />
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="method"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>Method</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="headers"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>Headers</FormLabel>
              <FormControl>
                <KeyValueInput
                  value={field.value ?? {}}
                  onChange={field.onChange}
                  keyPlaceholder="header name"
                  valuePlaceholder="header value"
                />
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="body"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='{"key": "value"}'
                  rows={4}
                  className="min-h-20 resize-none font-mono text-xs"
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
          <Button type="submit" form="form-http">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
