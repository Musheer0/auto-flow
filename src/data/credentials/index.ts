import { TRPCError } from "@trpc/server";
import type { CredentialsModel } from "@/generated/prisma/models";
import { encrypt } from "@/lib/crypto";
import prisma from "@/lib/db";
import redis from "@/lib/redis";
import { credentialKey, credentialsByOrgKey } from "@/lib/redis-keys";
import {
  type CreateCredentialInput,
  createCredentialSchema,
  type DeleteCredentialInput,
  deleteCredentialSchema,
  type EditCredentialInput,
  editCredentialSchema,
  type GetCredentialByIdInput,
  type GetCredentialsInput,
  getCredentialByIdSchema,
  getCredentialsSchema,
} from "@/schemas/credentials";

const CACHE_TTL = 300;

async function getCached<T>(key: string): Promise<T | null> {
  const cached = await redis.get<T>(key);
  return cached ?? null;
}

function notFound(message = "Credential not found"): never {
  throw new TRPCError({ code: "NOT_FOUND", message });
}

function parseInput<T>(
  schema: {
    safeParse: (v: unknown) => {
      success: boolean;
      data?: T;
      error?: { message: string };
    };
  },
  input: unknown,
): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: result.error?.message ?? "Invalid input",
    });
  }
  return result.data!;
}

export async function getCredentials(
  input: GetCredentialsInput,
): Promise<CredentialsModel[]> {
  const { orgId } = parseInput(getCredentialsSchema, input);

  const cacheKey = credentialsByOrgKey(orgId);
  const cached = await getCached<CredentialsModel[]>(cacheKey);
  if (cached) return cached;

  const credentials = await prisma.credentials.findMany({
    where: { org_id: orgId },
    orderBy: { updated_at: "desc" },
  });

  await redis.setex(cacheKey, CACHE_TTL, credentials);
  return credentials;
}

export async function getById(
  input: GetCredentialByIdInput,
): Promise<CredentialsModel> {
  const { id, orgId } = parseInput(getCredentialByIdSchema, input);

  const cacheKey = credentialKey(id);
  const cached = await getCached<CredentialsModel>(cacheKey);
  if (cached) {
    if (cached.org_id !== orgId) notFound();
    return cached;
  }

  const credential = await prisma.credentials.findFirst({
    where: { id, org_id: orgId },
  });
  if (!credential) notFound();

  await redis.setex(cacheKey, CACHE_TTL, credential);
  return credential;
}

export async function createCredential(
  input: CreateCredentialInput,
): Promise<CredentialsModel> {
  const { orgId, userId, name, type, secret } = parseInput(
    createCredentialSchema,
    input,
  );

  const encryptedSecret = encrypt(secret);

  const [credential] = await Promise.all([
    prisma.credentials.create({
      data: {
        org_id: orgId,
        user_id: userId,
        name: name?.trim() || "Untitled Credential",
        type: type ,
        secret: encryptedSecret,
      },
    }),
    redis.del(credentialsByOrgKey(orgId)),
  ]);

  return credential;
}

export async function editCredential(
  input: EditCredentialInput,
): Promise<CredentialsModel> {
  const { name, orgId, credentialId } = parseInput(editCredentialSchema, input);

  const [credential] = await prisma.credentials.updateManyAndReturn({
    where: { id: credentialId, org_id: orgId },
    data: { name: name.trim() },
  });

  if (!credential) notFound();

  await Promise.all([
    redis.del(credentialKey(credentialId)),
    redis.del(credentialsByOrgKey(orgId)),
  ]);
  return credential;
}

export async function deleteCredential(
  input: DeleteCredentialInput,
): Promise<void> {
  const { id, orgId } = parseInput(deleteCredentialSchema, input);

  const result = await prisma.credentials.deleteMany({
    where: { id, org_id: orgId },
  });
  if (result.count === 0) notFound();

  await Promise.all([
    redis.del(credentialKey(id)),
    redis.del(credentialsByOrgKey(orgId)),
  ]);
}
