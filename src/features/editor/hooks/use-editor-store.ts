"use client";

import { create } from "zustand";
import {
  type Node,
  type Edge,
  type Viewport,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import { type NodeType } from "@/generated/prisma/enums";
import { nodeUiList } from "@/constants/node-sidebar";

type EditorState = {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: NodeType) => void;
  setViewport: (viewport: Viewport) => void;
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
    const nodeInfo = nodeUiList[type];
    const newNode: Node = {
      id: crypto.randomUUID(),
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

  setViewport: (viewport) => {
    set({ viewport });
  },
}));
