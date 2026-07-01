import {
  Handle,
  type Node,
  type NodeProps,
  NodeToolbar,
  Position,
} from "@xyflow/react";
import { TrashIcon } from "lucide-react";
import type React from "react";
import { BaseNode } from "@/components/base-node";
import { Button } from "@/components/ui/button";
import { nodeUiList } from "@/constants/node-sidebar";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import type { NodeType } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";

interface props {
  data: NodeProps<Node>;
  children: React.ReactNode;
}

const BaseWorkflowNode: React.FC<props> = ({ data, children }) => {
  const { deleteNode } = useEditorStore();
  const nodeInfo = nodeUiList[data.type as NodeType];
  const name = nodeInfo?.name ?? data.type;
  const action = nodeInfo?.action ?? "EXECUTION";
  return (
    <BaseNode
      className={cn(action === "TRIGGER" ? "rounded-r-none" : "", "relative")}
    >
      <NodeToolbar
        className="flex gap-3
       items-center justify-between"
        isVisible
        position={Position.Top}
      >
        <Button
          size={"icon-sm"}
          variant={"destructive"}
          onClick={() => deleteNode(data.id)}
        >
          <TrashIcon />
        </Button>
      </NodeToolbar>
      {children}
      {action === "TRIGGER" ? (
        <Handle position={Position.Right} type="source" id="source" />
      ) : (
        <>
          <Handle position={Position.Left} type="target" id="target" />
          <Handle position={Position.Right} type="source" id="source" />
        </>
      )}
       <NodeToolbar isVisible position={Position.Bottom}>
          <p className="text-xs text-muted-foreground">{data.data?.node_name as string||name}</p>
        </NodeToolbar>
    </BaseNode>
  );
};

export default BaseWorkflowNode;
