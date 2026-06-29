"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { CreateCredentialDialog } from "@/components/credentials/create-credential-dialog";
import { DeleteCredentialDialog } from "@/components/credentials/delete-credential-dialog";
import { EditCredentialDialog } from "@/components/credentials/edit-credential-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCredentials from "@/hooks/credentials/use-credentials";

const nodeTypeLabels: Record<string, string> = {
  TELEGRAM_BOT_TOKEN: "Telegram Bot Token",
};

function Page() {
  const { isLoaded } = useOrganizationList();
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const { data: credentials, isLoading } = useCredentials();

  const filtered = React.useMemo(() => {
    if (!credentials) return [];
    if (!search) return credentials;
    const q = search.toLowerCase();
    return credentials.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q),
    );
  }, [credentials, search]);

  if (!isLoaded) {
    return <CredentialsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Credentials</h1>
        <CreateCredentialDialog>
          <Button>
            <Plus className="mr-2 size-4" />
            Create credential
          </Button>
        </CreateCredentialDialog>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search credentials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <CredentialsSkeleton />
      ) : filtered.length > 0 ? (
        <div className="flex flex-col divide-y">
          {filtered.map((credential) => (
            <div
              key={credential.id}
              className="flex items-center gap-4 px-4 py-3"
            >
              <div className="flex-1">
                <p className="font-medium">{credential.name}</p>
                <p className="text-sm text-muted-foreground">
                  {nodeTypeLabels[credential.type] ?? credential.type}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(credential.updated_at).toLocaleDateString()}
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <EditCredentialDialog
                    credential={{ id: credential.id, name: credential.name }}
                  >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Pencil className="mr-2 size-4" />
                      Rename
                    </DropdownMenuItem>
                  </EditCredentialDialog>
                  <DeleteCredentialDialog
                    credential={{ id: credential.id, name: credential.name }}
                  >
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DeleteCredentialDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-lg font-medium">No credentials found</p>
          <p className="text-sm text-muted-foreground">
            {search
              ? "Try a different search term."
              : "Create your first credential to get started."}
          </p>
        </div>
      )}
    </div>
  );
}

function CredentialsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="flex flex-col gap-2 px-4 py-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  );
}

export default Page;
