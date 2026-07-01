"use client"
import React from 'react'
import { useEditorStore } from '../hooks/use-editor-store'

const SaveChangesButton = () => {
    const { edges, nodes , viewport} =useEditorStore()
  return (
    <div>SaveChangesButton</div>
  )
}

export default SaveChangesButton