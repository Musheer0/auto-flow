import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
} from "@/components/base-node";
import { Handle, Node, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import React from "react";
import BaseWorkflowNode from "../base-workflow-node";

const TelegramNode = (data: NodeProps<Node>) => {
  return (
    <BaseWorkflowNode
      name={data.type.split("_").join(" ").toLowerCase() + " node"}
      type={data.type as any}
      action="EXECUTION"
    >
      <BaseNodeContent>
        <img
          src="https://cdn.simpleicons.org/telegram"
          alt="telegram"
          className="size-4"
        />
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default TelegramNode;
