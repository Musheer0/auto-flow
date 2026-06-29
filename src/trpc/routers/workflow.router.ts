import { TRPCError } from "@trpc/server";
import z from "zod";
import {
  createWorkflow,
  deleteWorkflow,
  editWorkflow,
  getById,
  getWorkflows,
} from "@/data/workflow";
import { createTRPCRouter, protectedProcudre } from "../init";

const requireOrg = (orgId: string | null | undefined): string => {
  if (!orgId)
    throw new TRPCError({ code: "BAD_REQUEST", message: "orgId required" });
  return orgId;
};

export const workflowsRouter = createTRPCRouter({
  getAll: protectedProcudre.query(async ({ ctx }) => {
    const orgId = requireOrg(ctx.session.orgId);
    return getWorkflows({ orgId });
  }),

  getById: protectedProcudre
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const orgId = requireOrg(ctx.session.orgId);
      return getById({ id: input.id, orgId });
    }),

  create: protectedProcudre
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

  edit: protectedProcudre
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

  delete: protectedProcudre
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const orgId = requireOrg(ctx.session.orgId);
      return deleteWorkflow({ id: input.id, orgId });
    }),
});
