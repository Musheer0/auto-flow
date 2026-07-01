"use client";

import useWorkflowById from "@/hooks/workflows/use-workflow-by-id";
import { createContext, useEffect, type ReactNode } from "react";
import type { tWorkflowDataSchema } from "@/schemas/editor";
import { useEditorStore } from "@/features/editor/hooks/use-editor-store";
import { transformServerDataToReactFlowData } from "@/features/editor/utils/transform-data";

type WorkflowData = {
  id: string;
  name: string;
  description: string | null;
  user_id: string;
  org_id: string;
  created_at: string;
  updated_at: string;
  flow_data?: tWorkflowDataSchema | null;
};

type WorkflowContextValue = ReturnType<typeof useWorkflowById>;

const WorkflowContext = createContext<WorkflowData | null>(null);

export function WorkflowProvider({
  id,
  initialData,
  children,
}: {
  id: string;
  initialData: WorkflowData;
  children: ReactNode;
}) {
  const {initialize} = useEditorStore()
  const initializedData = ()=>{
    const t_data = transformServerDataToReactFlowData(initialData.flow_data as tWorkflowDataSchema)
    initialize(t_data.nodes,t_data.edges,t_data.viewport)
  }
  useEffect(()=>{
    initializedData()
  },[initialData])
  return (
    <WorkflowContext.Provider value={initialData}>
      {children}
    </WorkflowContext.Provider>
  );
}

export { WorkflowContext };
