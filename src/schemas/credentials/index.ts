import { z } from "zod";

export const getCredentialsSchema = z.object({
  orgId: z.string().min(1),
});

export const getCredentialByIdSchema = z.object({
  id: z.string().min(1),
  orgId: z.string().min(1),
});

export const createCredentialSchema = z.object({
  orgId: z.string().min(1),
  userId: z.string().min(1),
  name: z.string().min(1).optional(),
  type: z.string().min(1),
  secret: z.string().min(1),
});

export const editCredentialSchema = z.object({
  name: z.string().min(1),
  orgId: z.string().min(1),
  credentialId: z.string().min(1),
});

export const deleteCredentialSchema = z.object({
  id: z.string().min(1),
  orgId: z.string().min(1),
});

export type GetCredentialsInput = z.infer<typeof getCredentialsSchema>;
export type GetCredentialByIdInput = z.infer<typeof getCredentialByIdSchema>;
export type CreateCredentialInput = z.infer<typeof createCredentialSchema>;
export type EditCredentialInput = z.infer<typeof editCredentialSchema>;
export type DeleteCredentialInput = z.infer<typeof deleteCredentialSchema>;
