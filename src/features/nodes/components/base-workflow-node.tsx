import { BaseNode } from "@/components/base-node"
import { NodeAction, NodeType } from "@/generated/prisma/enums"
import { cn } from "@/lib/utils"
import { Handle, NodeToolbar, Position } from "@xyflow/react"
import React from 'react'

interface props {
    name?:string
    type:NodeType,
    action:NodeAction,
    children:React.ReactNode, 
}


const BaseWorkflowNode:React.FC<props> = ({name,type,action,children}) => {
  return (
    <BaseNode className={cn(
        action==="TRIGGER" ? "rounded-r-none":""
    )}>
    {children}
    {action==="TRIGGER" ? 
    <>
    <Handle position={Position.Right} type="source"/>
    </>
    :
    <>
    <Handle position={Position.Left} type="target"/>
    <Handle position={Position.Right} type="source"/>
    </>
    }
    {name && 
    <NodeToolbar isVisible position={Position.Bottom}>
        <p className="text-xs text-muted-foreground">{name}</p>
    </NodeToolbar>
    }
    </BaseNode>
  )
}

export default BaseWorkflowNode