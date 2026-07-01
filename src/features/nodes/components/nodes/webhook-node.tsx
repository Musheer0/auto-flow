import type { Node, NodeProps } from "@xyflow/react";
import { WebhookIcon } from "lucide-react";
import { BaseNodeContent } from "@/components/base-node";
import { Button } from "@/components/ui/button";
import BaseWorkflowNode from "../base-workflow-node";
import { useFormDialog } from "../forms/form-dialog-provider";

const WebhookNode = (data: NodeProps<Node>) => {
  const { open } = useFormDialog();
  return (
    <BaseWorkflowNode data={data}>
      <BaseNodeContent>
        <Button variant={"ghost"} size={"icon"} onClick={() => open(data)}>
          <WebhookIcon />
        </Button>
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default WebhookNode;
