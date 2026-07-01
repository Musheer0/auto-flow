import z from "zod";
import { NodeType } from "@/generated/prisma/enums";

export const defaultSchema = z.object({
  node_name: z.string().min(1),
});

export const httpSchema = defaultSchema.extend({
  url: z.string().url(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  headers: z.record(z.string(), z.string()),
  body: z.string().optional(),
});

export const telegramSchema = defaultSchema.extend({
  botToken: z.string().min(1),
  chatId: z.string().min(1),
  message: z.string().min(1),
});

export const discordSchema = defaultSchema.extend({
  webhookUrl: z.string().url(),
  message: z.string().min(1),
});

export const webhookSchema = defaultSchema.extend({
  headers: z.record(z.string(), z.string()),
});

export const manualTriggerSchema = defaultSchema;

export const nodeSchemas: Record<NodeType, z.ZodObject<any>> = {
  HTTP_REQUEST: httpSchema,
  TELEGRAM_BOT: telegramSchema,
  SEND_DISCORD_MESSAGE: discordSchema,
  WEBHOOK: webhookSchema,
  MANUAL_TRIGGER: manualTriggerSchema,
};
