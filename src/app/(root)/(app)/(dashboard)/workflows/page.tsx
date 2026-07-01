"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateWorkflowDialog } from "@/components/workflows/create-workflow-dialog";
import useWorkflows from "@/hooks/workflows/use-workflows";

const PAGE_SIZE = 10;

function PageContent() {
  const { isLoaded } = useOrganizationList();

  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: workflows, isLoading } = useWorkflows();

  const filtered = React.useMemo(() => {
    if (!workflows) return [];
    if (!search) return workflows;
    const q = search.toLowerCase();
    return workflows.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.description?.toLowerCase().includes(q),
    );
  }, [workflows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  if (!isLoaded) {
    return <WorkflowsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Workflows</h1>
        <CreateWorkflowDialog>
          <Button>Create workflow</Button>
        </CreateWorkflowDialog>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search workflows..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (page !== 1) setPage(1);
          }}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <WorkflowsSkeleton />
      ) : paginated.length > 0 ? (
        <>
          <div className="flex flex-col divide-y">
            {paginated.map((workflow) => (
              <WorkflowRow key={workflow.id} workflow={workflow} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-lg font-medium">No workflows found</p>
          <p className="text-sm text-muted-foreground">
            {search
              ? "Try a different search term."
              : "Create your first workflow to get started."}
          </p>
        </div>
      )}
    </div>
  );
}

function WorkflowRow({
  workflow,
}: {
  workflow: {
    id: string;
    name: string;
    description: string | null;
    updated_at: string;
  };
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/workflows/${workflow.id}`)}
      className="flex items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50"
    >
      <div className="flex-1">
        <p className="font-medium">{workflow.name}</p>
        {workflow.description && (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {workflow.description}
          </p>
        )}
      </div>
      <span className="text-xs text-muted-foreground">
        {new Date(workflow.updated_at).toLocaleDateString()}
      </span>
    </button>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <span className="text-sm tabular-nums">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

function WorkflowsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="flex flex-col gap-2 px-4 py-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
      ))}
    </div>
  );
}

function Page() {
  return (
    <React.Suspense fallback={<WorkflowsSkeleton />}>
      <PageContent />
    </React.Suspense>
  );
}

export default Page;
