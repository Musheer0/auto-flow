import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createCredential,
  deleteCredential,
  editCredential,
  getById,
  getCredentials,
} from "@/data/credentials";
import { createTRPCRouter, protectedProcudre } from "../init";

const requireOrg = (orgId: string | null | undefined): string => {
  if (!orgId)
    throw new TRPCError({ code: "BAD_REQUEST", message: "orgId required" });
  return orgId;
};

export const credentialsRouter = createTRPCRouter({
  getAll: protectedProcudre.query(async ({ ctx }) => {
    const orgId = requireOrg(ctx.session.orgId);
    return getCredentials({ orgId });
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
        type: z.string().min(1),
        secret: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, orgId } = ctx.session;
      requireOrg(orgId);
      return createCredential({
        orgId: orgId!,
        userId,
        name: input.name,
        type: input.type,
        secret: input.secret,
      });
    }),

  edit: protectedProcudre
    .input(
      z.object({
        credentialId: z.string().min(1),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const orgId = requireOrg(ctx.session.orgId);
      return editCredential({
        ...input,
        orgId,
      });
    }),

  delete: protectedProcudre
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const orgId = requireOrg(ctx.session.orgId);
      return deleteCredential({ id: input.id, orgId });
    }),
});
