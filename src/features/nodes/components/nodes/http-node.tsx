import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
} from "@/components/base-node";
import { Handle, Node, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { GlobeIcon, MouseIcon } from "lucide-react";
import React from "react";
import BaseWorkflowNode from "../base-workflow-node";

const HttpNode = (data: NodeProps<Node>) => {
  return (
    <BaseWorkflowNode
      name={data.type.split("_").join(" ").toLowerCase() + " node"}
      type={data.type as any}
      action="EXECUTION"
    >
      <BaseNodeContent>
        <GlobeIcon size={14} />
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default HttpNode;
