import { TRPCError } from "@trpc/server";
import z from "zod";
import {
  createWorkflow,
  deleteWorkflow,
  editWorkflow,
  getById,
  getWorkflows,
  saveWorkflowData,
} from "@/data/workflow";
import { createTRPCRouter, protectedProcedure } from "../init";
import { WorkflowDataSchema } from "@/schemas/editor";

const requireOrg = (orgId: string | null | undefined): string => {
  if (!orgId)
    throw new TRPCError({ code: "BAD_REQUEST", message: "orgId required" });
  return orgId;
};

export const workflowsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const orgId = requireOrg(ctx.session.orgId);
    return getWorkflows({ orgId });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().min(1),include_data:z.boolean().default(false).optional() }))
    .query(async ({ input, ctx }) => {
      const orgId = requireOrg(ctx.session.orgId);
      return getById({ id: input.id, orgId,include_data:input.include_data });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        id: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, orgId } = ctx.session;
      requireOrg(orgId);
      return createWorkflow({ orgId: orgId!, userId, name: input.name });
    }),

  edit: protectedProcedure
    .input(
      z.object({
        workflowId: z.string().min(1),
        name: z.string().min(1),
        description: z
          .string()
          .nullable()
          .optional()
          .transform((v) => v ?? null),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const orgId = requireOrg(ctx.session.orgId);
      return editWorkflow({
        ...input,
        orgId,
        description: input.description ?? null,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const orgId = requireOrg(ctx.session.orgId);
      return deleteWorkflow({ id: input.id, orgId });
    }),
  saveWorkflow: protectedProcedure
    .input(z.object({ workflow_id: z.string(), data: WorkflowDataSchema }))
    .mutation(async ({ ctx, input }) => {
      const { orgId, userId } = ctx.session;
      return saveWorkflowData({
        workflowId: input.workflow_id,
        flow_data: input.data,
        orgId: requireOrg(orgId),
        userId,
      });
    }),
});
