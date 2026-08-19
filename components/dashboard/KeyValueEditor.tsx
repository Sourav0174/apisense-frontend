import React from "react";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

interface KeyValueEditorProps {
  label: string;
  pairs: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
  isSensitive?: boolean;
}

export function KeyValueEditor({ label, pairs, onChange, isSensitive = false }: KeyValueEditorProps) {
  const addPair = () => {
    onChange([...pairs, { id: Math.random().toString(36).substr(2, 9), key: "", value: "" }]);
  };

  const removePair = (id: string) => {
    onChange(pairs.filter(p => p.id !== id));
  };

  const updatePair = (id: string, field: "key" | "value", newValue: string) => {
    onChange(
      pairs.map(p => {
        if (p.id === id) {
          return { ...p, [field]: newValue };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white/70">{label}</label>
        <Button type="button" variant="ghost" size="sm" onClick={addPair} className="h-6 text-xs px-2">
          <Plus className="w-3 h-3 mr-1" /> Add
        </Button>
      </div>

      {pairs.length === 0 ? (
        <div className="text-sm text-white/40 italic px-2 py-1">No {label.toLowerCase()} configured.</div>
      ) : (
        <div className="space-y-2">
          {pairs.map((pair) => (
            <div key={pair.id} className="flex items-center gap-2">
              <Input
                placeholder="Key"
                value={pair.key}
                onChange={(e) => updatePair(pair.id, "key", e.target.value)}
                className="w-1/3 rounded-md" // Override to less round for tight layout
              />
              <Input
                type={isSensitive ? "password" : "text"}
                placeholder="Value"
                value={pair.value}
                onChange={(e) => updatePair(pair.id, "value", e.target.value)}
                className="flex-1 rounded-md"
              />
              <button
                type="button"
                onClick={() => removePair(pair.id)}
                className="p-2 text-white/40 hover:text-error hover:bg-error/10 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
