import { NodeAction, NodeType } from "@/generated/prisma/enums";
import z from "zod";

export const WorkflowDataSchema = z.object({
     nodes:z.array(z.object({
        id:z.cuid2(),
        node_name:z.string(),
        position:z.object({x:z.number().default(0), y:z.number().default(0)}),
        data:z.record(z.string(),z.any()),
        type:z.enum(NodeType),
        action_type:z.enum(NodeAction),
    })),
    edges:z.array(z.object({
        id:z.cuid2(),
        target:z.string(),
        source:z.string(),
        targetHandle:z.string().default("target"),
        sourceHandle:z.string().default("source"),
    })),
    view_port:z.object({
    x: z.number().default(50),
    y:z.number().default(50),
    zoom: z.number().default(50)
    })
})