import type { Node, NodeProps } from "@xyflow/react";
import { BaseNodeContent } from "@/components/base-node";
import { Button } from "@/components/ui/button";
import BaseWorkflowNode from "../base-workflow-node";
import { useFormDialog } from "../forms/form-dialog-provider";

const DiscordNode = (data: NodeProps<Node>) => {
  const { open } = useFormDialog();
  return (
    <BaseWorkflowNode data={data}>
      <BaseNodeContent>
        <Button variant={"ghost"} size={"icon"} onClick={() => open(data)}>
          <img
            src="https://cdn.simpleicons.org/discord"
            alt="discord"
            className="size-4"
          />
        </Button>
      </BaseNodeContent>
    </BaseWorkflowNode>
  );
};

export default DiscordNode;
