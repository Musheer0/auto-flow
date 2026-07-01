import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
} from "@/components/base-node";
import { Handle, Node, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { GlobeIcon, MouseIcon, WebhookIcon } from "lucide-react";
import React from "react";
import BaseWorkflowNode from "../base-workflow-node";

const WebhookNode = (data: NodeProps<Node>) => {
  return (
    <BaseWorkflowNode
      name={data.type.split("_").join(" ").toLowerCase() + " node"}
      type={data.type as any}
      action="TRIGGER"
    >
      <BaseNodeContent>
        <WebhookIcon />
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default WebhookNode;
