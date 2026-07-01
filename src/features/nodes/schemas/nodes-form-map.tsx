import type { Node, NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";
import { DiscordForm } from "@/features/nodes/components/forms/discord-form";

import { HttpForm } from "@/features/nodes/components/forms/http-form";
import { ManualTriggerForm } from "@/features/nodes/components/forms/manual-trigger-form";
import { TelegramForm } from "@/features/nodes/components/forms/telegram-form";
import { WebhookForm } from "@/features/nodes/components/forms/webhook-form";
import type { NodeType } from "@/generated/prisma/enums";

type FormComponent = ComponentType<{ data: NodeProps<Node> }>;

export const nodesFormMap: Record<NodeType, FormComponent> = {
  HTTP_REQUEST: HttpForm,
  TELEGRAM_BOT: TelegramForm,
  SEND_DISCORD_MESSAGE: DiscordForm,
  WEBHOOK: WebhookForm,
  MANUAL_TRIGGER: ManualTriggerForm,
};
