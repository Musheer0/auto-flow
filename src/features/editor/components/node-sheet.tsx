"use client";

import { useNodes } from "@xyflow/react";
import { SearchIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet as SheetBase,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NodeListUiArray } from "@/constants/node-sidebar";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import { isDuplicateTrigger } from "@/features/editor/utils/duplicate-trigger";
import { NodeAction, type NodeType } from "@/generated/prisma/enums";

type NodeSheetProps = {
  onClick: (type: NodeType) => void;
  children: React.ReactNode;
};

function NodeSheet({ onClick, children }: NodeSheetProps) {
  const [search, setSearch] = React.useState("");
  const [actionFilter, setActionFilter] = React.useState<NodeAction | null>(
    null,
  );
  const nodes = useEditorStore((s) => s.nodes);

  const filteredNodes = NodeListUiArray.filter((node) => {
    const matchesSearch = node.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesAction = !actionFilter || node.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <SheetBase>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-0 p-0">
        <SheetHeader className="px-4 pt-4 pb-0">
          <SheetTitle>Nodes</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-4 pt-4 pb-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search nodes..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {Object.values(NodeAction).map((action) => (
              <Badge
                key={action}
                variant={actionFilter === action ? "default" : "outline"}
                className="cursor-pointer select-none"
                onClick={() =>
                  setActionFilter(actionFilter === action ? null : action)
                }
              >
                {action === "TRIGGER" ? "Triggers" : "Actions"}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-1">
            {filteredNodes.map((node) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.type}
                  type="button"
                  disabled={isDuplicateTrigger(node.type, nodes)}
                  onClick={() => onClick(node.type)}
                  className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-muted disabled:opacity-40 disabled:pointer-events-none"
                >
                  <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                    {typeof Icon === "string" ? (
                      <img src={Icon} alt="" className="size-4" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">
                      {node.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {node.description}
                    </span>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {node.action === "TRIGGER" ? "Trigger" : "Execution"}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </SheetBase>
  );
}

export { NodeSheet };
