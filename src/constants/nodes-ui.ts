import { type NodeType } from "@/generated/prisma/enums";
import ManualTriggerNode from "@/features/nodes/components/nodes/manual-trigger-node";
import HttpNode from "@/features/nodes/components/nodes/http-node";
import WebhookNode from "@/features/nodes/components/nodes/webhook-node";
import DiscordNode from "@/features/nodes/components/nodes/discord-node";
import TelegramNode from "@/features/nodes/components/nodes/telegram-node";

export const nodeTypes: Record<NodeType, any> = {
  MANUAL_TRIGGER: ManualTriggerNode,
  HTTP_REQUEST: HttpNode,
  WEBHOOK: WebhookNode,
  SEND_DISCORD_MESSAGE: DiscordNode,
  TELEGRAM_BOT: TelegramNode,
};