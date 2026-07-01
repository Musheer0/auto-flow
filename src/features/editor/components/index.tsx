"use client";
import {
  ReactFlow,
  Background,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodeSheet } from "./node-sheet";
import { Button } from "../../../components/ui/button";
import { PlusIcon } from "lucide-react";
import { type NodeType } from "@/generated/prisma/enums";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import { nodeTypes } from "@/constants/nodes-ui";


export default function Editor() {
  const { nodes, edges, viewport, onNodesChange, onEdgesChange, onConnect, addNode, setViewport } =
    useEditorStore();

  const onAdd = (type: NodeType) => {
    addNode(type);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMoveEnd={(_event, viewport) => setViewport(viewport)}
        defaultViewport={viewport}
        snapGrid={[20, 20]}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
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
