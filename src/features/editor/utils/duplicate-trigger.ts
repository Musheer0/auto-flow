import type { Node } from "@xyflow/react";
import { nodeUiList } from "@/constants/node-sidebar";
import type { NodeType } from "@/generated/prisma/enums";

export function isDuplicateTrigger(
  type: NodeType,
  existingNodes: Node[],
): boolean {
  const nodeInfo = nodeUiList[type];
  if (!nodeInfo || nodeInfo.action !== "TRIGGER") return false;
  return existingNodes.some((n) => n.type === type);
}
