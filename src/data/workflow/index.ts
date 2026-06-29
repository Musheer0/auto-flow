import { TRPCError } from "@trpc/server";
import type { WorkflowModel } from "@/generated/prisma/models";
import prisma from "@/lib/db";
import redis from "@/lib/redis";
import { workflowKey, workflowsByOrgKey } from "@/lib/redis-keys";
import {
  type CreateWorkflowInput,
  createWorkflowSchema,
  type DeleteWorkflowInput,
  deleteWorkflowSchema,
  type EditWorkflowInput,
  editWorkflowSchema,
  type GetWorkflowByIdInput,
  type GetWorkflowsInput,
  getByWorkflowIdSchema,
  getWorkflowsSchema,
} from "@/schemas/workflows";

const CACHE_TTL = 300;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function getCached<T>(key: string): Promise<T | null> {
  const cached = await redis.get<T>(key);
  return cached ?? null;
}

function notFound(message = "Workflow not found"): never {
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

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getWorkflows(
  input: GetWorkflowsInput,
): Promise<WorkflowModel[]> {
  const { orgId } = parseInput(getWorkflowsSchema, input);

  const cacheKey = workflowsByOrgKey(orgId);
  const cached = await getCached<WorkflowModel[]>(cacheKey);
  if (cached) return cached;

  const workflows = await prisma.workflow.findMany({
    where: { org_id: orgId },
    orderBy: { updated_at: "desc" },
  });

  await redis.setex(cacheKey, CACHE_TTL, workflows);
  return workflows;
}

export async function getById(
  input: GetWorkflowByIdInput,
): Promise<WorkflowModel> {
  const { id, orgId } = parseInput(getByWorkflowIdSchema, input);

  const cacheKey = workflowKey(id);
  const cached = await getCached<WorkflowModel>(cacheKey);

  if (cached) {
    if (cached.org_id !== orgId) notFound();
    return cached;
  }

  const workflow = await prisma.workflow.findFirst({
    where: { id, org_id: orgId },
  });
  if (!workflow) notFound();

  await redis.setex(cacheKey, CACHE_TTL, workflow);
  return workflow;
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export async function createWorkflow(
  input: CreateWorkflowInput,
): Promise<WorkflowModel> {
  const { orgId, userId, name } = parseInput(createWorkflowSchema, input);

  const [workflow] = await Promise.all([
    prisma.workflow.create({
      data: {
        org_id: orgId,
        user_id: userId,
        name: name?.trim() || "Untitled Workflow",
      },
    }),
    redis.del(workflowsByOrgKey(orgId)),
  ]);

  return workflow;
}

export async function editWorkflow(
  input: EditWorkflowInput,
): Promise<WorkflowModel> {
  const { name, description, orgId, workflowId } = parseInput(
    editWorkflowSchema,
    input,
  );

  const [workflow] = await prisma.workflow.updateManyAndReturn({
    where: { id: workflowId, org_id: orgId },
    data: { name: name.trim(), description },
  });

  if (!workflow) notFound();

  await Promise.all([
    redis.del(workflowKey(workflowId)),
    redis.del(workflowsByOrgKey(orgId)),
  ]);
  return workflow;
}

export async function deleteWorkflow(
  input: DeleteWorkflowInput,
): Promise<void> {
  const { id, orgId } = parseInput(deleteWorkflowSchema, input);

  const result = await prisma.workflow.deleteMany({
    where: { id, org_id: orgId },
  });
  if (result.count === 0) notFound();

  await Promise.all([
    redis.del(workflowKey(id)),
    redis.del(workflowsByOrgKey(orgId)),
  ]);
}
