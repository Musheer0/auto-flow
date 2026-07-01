import { NodeAction, NodeType } from "@/generated/prisma/enums";
import { X } from "lucide-react";
import z from "zod";

export const WorkflowDataSchema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      node_name: z.string(),
      position: z.object({
        x: z.number().default(0),
        y: z.number().default(0),
      }),
      data: z.record(z.string(), z.any()),
      type: z.enum(NodeType),
    }),
  ),
  edges: z.array(
    z.object({
      id: z.string(),
      target: z.string(),
      source: z.string(),
      targetHandle: z.string().default("target"),
      sourceHandle: z.string().default("source"),
    }),
  ),
  view_port: z.object({
    x: z.number().default(50),
    y: z.number().default(50),
    zoom: z.number().default(50),
  }),
});


export type tWorkflowDataSchema = z.infer<typeof WorkflowDataSchema>