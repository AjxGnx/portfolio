"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T extends { id: string }> {
  rows: T[];
  columns: Column<T>[];
  onEdit: (row: T) => void;
  onDelete: (id: string) => Promise<void>;
  emptyMessage?: string;
}

export function AdminTable<T extends { id: string }>({
  rows,
  columns,
  onEdit,
  onDelete,
  emptyMessage = "No records yet.",
}: AdminTableProps<T>) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      await onDelete(id);
      setConfirmId(null);
      setDeletingId(null);
    });
  };

  if (rows.length === 0) {
    return (
      <p className="text-center text-sm text-muted py-10 glass rounded-2xl">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50 bg-card/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-3 px-4 text-xs font-medium text-muted uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            <th className="py-3 px-4 text-right text-xs font-medium text-muted uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-card/40 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4 text-foreground/80">
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              <td className="py-3 px-4 text-right">
                {confirmId === row.id ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="text-xs text-muted">Delete?</span>
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={isPending && deletingId === row.id}
                      className="text-xs font-medium text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                    >
                      {isPending && deletingId === row.id ? "..." : "Yes"}
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="text-xs text-muted hover:text-foreground transition-colors"
                    >
                      No
                    </button>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-3">
                    <button
                      onClick={() => onEdit(row)}
                      className="text-muted hover:text-accent transition-colors"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setConfirmId(row.id)}
                      className="text-muted hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
