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
import { Textarea } from "@/components/ui/textarea";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import { telegramSchema } from "@/features/nodes/schemas/node-forms.schema";
import { useFormDialog } from "./form-dialog-provider";

type FormValues = z.infer<typeof telegramSchema>;

export function TelegramForm({ data }: { data: NodeProps<Node> }) {
  const updateNodeData = useEditorStore((s) => s.updateNodeData);
  const { close } = useFormDialog();
  const form = useForm<FormValues>({
    resolver: zodResolver(telegramSchema),
    defaultValues: data.data as FormValues,
  });

  function onSubmit(formData: FormValues) {
    updateNodeData(data.id, formData);
    toast("Telegram Bot saved");
    close();
  }

  return (
    <FormProvider {...form}>
      <form
        id="form-telegram"
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
                  placeholder="My Telegram Bot"
                  autoComplete="off"
                />
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="botToken"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>Bot Token</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="123456:ABC-DEF1234ghIkl"
                  autoComplete="off"
                  type="password"
                />
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="chatId"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>Chat ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="-123456789" autoComplete="off" />
              </FormControl>
              {fieldState.error && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Hello from n8n clone!"
                  rows={4}
                  className="min-h-20 resize-none"
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
          <Button type="submit" form="form-telegram">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
