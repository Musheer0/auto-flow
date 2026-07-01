"use client";

import { PlusIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface KeyValueInputProps {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export function KeyValueInput({
  value = {},
  onChange,
  keyPlaceholder = "key",
  valuePlaceholder = "value",
}: KeyValueInputProps) {
  const entries = React.useMemo(() => Object.entries(value), [value]);

  const updateEntry = (oldKey: string, newKey: string, newVal: string) => {
    const updated = { ...value };
    delete updated[oldKey];
    updated[newKey] = newVal;
    onChange(updated);
  };

  const removeEntry = (key: string) => {
    const updated = { ...value };
    delete updated[key];
    onChange(updated);
  };

  const addEntry = () => {
    onChange({ ...value, "": "" });
  };

  return (
    <div className="space-y-2">
      {entries.map(([k, v]) => (
        <div key={k} className="flex gap-2 items-center">
          <Input
            value={k}
            onChange={(e) => updateEntry(k, e.target.value, v)}
            placeholder={keyPlaceholder}
            className="flex-1 font-mono text-xs"
          />
          <Input
            value={v}
            onChange={(e) => updateEntry(k, k, e.target.value)}
            placeholder={valuePlaceholder}
            className="flex-1 font-mono text-xs"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeEntry(k)}
          >
            <XIcon className="size-3" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addEntry}
        className="w-full"
      >
        <PlusIcon className="size-3" />
        Add
      </Button>
    </div>
  );
}
