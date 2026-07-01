import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
} from "@/components/base-node";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { MouseIcon } from "lucide-react";
import React from "react";
import BaseWorkflowNode from "../base-workflow-node";

const ManualTriggerNode = (data: NodeProps<Node>) => {
  return (
    <BaseWorkflowNode
      type={data.type as any}
      action="TRIGGER"
      name={data.type.split("_").join(" ").toLowerCase() + " node"}
    >
      <BaseNodeContent>
        <MouseIcon />
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default ManualTriggerNode;
