"use client";

import { AdminModal } from "@/components/admin/AdminModal";
import { AdminTable, type Column } from "@/components/admin/AdminTable";
import { AlertCircle, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { createSkill, deleteSkill, updateSkill } from "./actions";

type Skill = {
  id: string;
  name: string;
  level: number;
  category: string;
  sort_order: number;
};

const emptyForm = { name: "", level: "50", category: "", sort_order: "0" };

const columns: Column<Skill>[] = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  {
    key: "level",
    label: "Level",
    render: (row) => (
      <span className="flex items-center gap-2">
        <span className="w-20 h-1.5 rounded-full bg-border/50 overflow-hidden">
          <span
            className="h-full block rounded-full bg-accent"
            style={{ width: `${row.level}%` }}
          />
        </span>
        <span className="text-xs text-muted">{row.level}%</span>
      </span>
    ),
  },
  { key: "sort_order", label: "Order" },
];

export function SkillsClient({ skills }: { skills: Skill[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        level: String(editing.level),
        category: editing.category,
        sort_order: String(editing.sort_order),
      });
    } else {
      setForm(emptyForm);
    }
    setError(null);
  }, [editing, open]);

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = editing
        ? await updateSkill(editing.id, fd)
        : await createSkill(fd);
      if (result.ok) {
        handleClose();
      } else {
        setError(result.error);
      }
    });
  };

  const handleDelete = (id: string) => deleteSkill(id);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">{skills.length} skill(s)</p>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New skill
        </button>
      </div>

      <AdminTable
        rows={skills}
        columns={columns}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage="No skills yet. Create the first one."
      />

      <AdminModal
        open={open}
        onClose={handleClose}
        title={editing ? "Edit skill" : "New skill"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Level: {form.level}%
            </label>
            <input
              name="level"
              type="range"
              min={0}
              max={100}
              value={form.level}
              onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
              className="w-full accent-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <input
              name="category"
              required
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              placeholder="e.g.: Frontend, Backend, DevOps"
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Display order
            </label>
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm((f) => ({ ...f, sort_order: e.target.value }))
              }
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-xl border border-border/50 px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-60 transition-colors"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
