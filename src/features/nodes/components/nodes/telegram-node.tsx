import type { Node, NodeProps } from "@xyflow/react";
import { BaseNodeContent } from "@/components/base-node";
import { Button } from "@/components/ui/button";
import BaseWorkflowNode from "../base-workflow-node";
import { useFormDialog } from "../forms/form-dialog-provider";

const TelegramNode = (data: NodeProps<Node>) => {
  const { open } = useFormDialog();
  return (
    <BaseWorkflowNode data={data}>
      <BaseNodeContent>
        <Button
          onClick={() => {
            open(data);
          }}
          variant={"ghost"}
          size={"icon"}
        >
          <img
            src="https://cdn.simpleicons.org/telegram"
            alt="telegram"
            className="size-4"
          />
        </Button>
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default TelegramNode;
