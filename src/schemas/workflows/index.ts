import { z } from "zod";

export const getWorkflowsSchema = z.object({
  orgId: z.string().min(1),
});

export const getByWorkflowIdSchema = z.object({
  id: z.string().min(1),
  orgId: z.string().min(1),
});

export const createWorkflowSchema = z.object({
  orgId: z.string().min(1),
  userId: z.string().min(1),
  name: z.string().min(1).optional(),
});

export const editWorkflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  orgId: z.string().min(1),
  workflowId: z.string().min(1),
});

export const deleteWorkflowSchema = z.object({
  id: z.string().min(1),
  orgId: z.string().min(1),
});

export type GetWorkflowsInput = z.infer<typeof getWorkflowsSchema>;
export type GetWorkflowByIdInput = z.infer<typeof getByWorkflowIdSchema>;
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type EditWorkflowInput = z.infer<typeof editWorkflowSchema>;
export type DeleteWorkflowInput = z.infer<typeof deleteWorkflowSchema>;
