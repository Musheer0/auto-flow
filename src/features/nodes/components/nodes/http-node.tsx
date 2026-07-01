import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { BaseNodeContent } from "@/components/base-node";
import { Button } from "@/components/ui/button";
import BaseWorkflowNode from "../base-workflow-node";
import { useFormDialog } from "../forms/form-dialog-provider";

const HttpNode = (data: NodeProps<Node>) => {
  const { open } = useFormDialog();
  return (
    <BaseWorkflowNode data={data}>
      <BaseNodeContent>
        <Button variant={"ghost"} size={"icon"} onClick={() => open(data)}>
          <GlobeIcon size={14} />
        </Button>
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default HttpNode;
