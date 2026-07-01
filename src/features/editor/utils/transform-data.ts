import { NodeType } from "@/generated/prisma/enums";
import { tWorkflowDataSchema } from "@/schemas/editor";
import { Edge, Node, Viewport } from "@xyflow/react";

export const transformReactFlowDataToServerData = (
  nodes: Node[],
  edges: Edge[],
  viewport: Viewport
): tWorkflowDataSchema => {
  return {
    view_port: viewport,
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle!,
      targetHandle: edge.targetHandle!,

    })),
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type as NodeType,
      position: node.position,
      data: node.data,
      node_name: node.data.node_name as string || "untitled_node"
    })),
  };
};
export const transformServerDataToReactFlowData = (
  workflow: tWorkflowDataSchema
): {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
} => {
  return {
    viewport: workflow.view_port ?? { x: 0, y: 0, zoom: 1 },

    edges: (workflow.edges ?? []).map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    })),

    nodes: (workflow.nodes ?? []).map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    })),
  };
};