"use client";

import { createId } from "@paralleldrive/cuid2";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type Viewport,
} from "@xyflow/react";
import { toast } from "sonner";
import { create } from "zustand";
import { nodeUiList } from "@/constants/node-sidebar";
import { isDuplicateTrigger } from "@/features/editor/utils/duplicate-trigger";
import type { NodeType } from "@/generated/prisma/enums";

type EditorState = {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: NodeType) => void;
  deleteNode: (id: string) => void;
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
  setViewport: (viewport: Viewport) => void;
  initialize: (nodes: Node[], edges: Edge[], viewport: Viewport) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },

  addNode: (type) => {
    if (isDuplicateTrigger(type, get().nodes)) {
      toast.error(`Only one "${type}" trigger is allowed`);
      return;
    }
    const nodeInfo = nodeUiList[type];
    const newNode: Node = {
      id: createId(),
      type,
      position: {
        x: 50 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      },
      data: {
        label: nodeInfo?.name ?? type,
      },
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
    });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    });
  },

  setViewport: (viewport) => {
    set({ viewport });
  },

  initialize: (nodes, edges, viewport) => {
    console.log(nodes, edges, viewport);
    set({ nodes, edges, viewport });
  },
}));
