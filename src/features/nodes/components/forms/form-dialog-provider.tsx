"use client";

import type { Node, NodeProps } from "@xyflow/react";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { nodesFormMap } from "@/features/nodes/schemas/nodes-form-map";

type FormDialogContextValue = {
  isOpen: boolean;
  data: NodeProps<Node> | null;
  open: (data: NodeProps<Node>) => void;
  close: () => void;
};

const FormDialogContext = React.createContext<FormDialogContextValue | null>(
  null,
);

export function FormDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState<NodeProps<Node> | null>(null);

  const open = React.useCallback((nodeData: NodeProps<Node>) => {
    setData(nodeData);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const type = data?.type;
  const FormComponent = type
    ? nodesFormMap[type as keyof typeof nodesFormMap]
    : null;

  return (
    <FormDialogContext.Provider value={{ isOpen, data, open, close }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={(v) => !v && close()}>
        <AlertDialogContent showCloseButton={false}>
          <AlertDialogTitle className="capitalize">
            {type?.toLowerCase().replace(/_/g, " ")}
          </AlertDialogTitle>
          {data && FormComponent && <FormComponent data={data} />}
        </AlertDialogContent>
      </AlertDialog>
    </FormDialogContext.Provider>
  );
}

export function useFormDialog() {
  const ctx = React.useContext(FormDialogContext);
  if (!ctx) {
    throw new Error("useFormDialog must be used within FormDialogProvider");
  }
  return ctx;
}
