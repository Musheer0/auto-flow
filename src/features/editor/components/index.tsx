"use client";
import { ReactFlow, Background, Panel, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodeSheet } from "./node-sheet";
import { Button } from "../../../components/ui/button";
import { PlusIcon } from "lucide-react";
import { type NodeType } from "@/generated/prisma/enums";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import { nodeTypes } from "@/constants/nodes-ui";
import SaveChangesButton from "./save-changes-button";
import { useCurrentWorkflow } from "@/hooks/workflows/use-current-workflow";
import { transformServerDataToReactFlowData } from "@/features/editor/utils/transform-data";
import { useEffect, useRef } from "react";

export default function Editor() {
  const { nodes, edges, viewport, onNodesChange, onEdgesChange, onConnect, addNode, setViewport } =
    useEditorStore();


  const onAdd = (type: NodeType) => {
    addNode(type);
  };

  return (
    <div className="w-full h-full flex-1 ">

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMoveEnd={(_event, viewport) => setViewport(viewport)}
        viewport={viewport}
        snapGrid={[20, 20]}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Panel position="bottom-center">
          <SaveChangesButton />
        </Panel>
        <Panel position="top-right">
          <NodeSheet onClick={onAdd}>
            <Button size={"icon-lg"}>
              <PlusIcon />
            </Button>
          </NodeSheet>
        </Panel>
      </ReactFlow>
    </div>
  );
}
