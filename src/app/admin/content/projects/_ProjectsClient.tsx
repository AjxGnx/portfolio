"use client";

import { AdminModal } from "@/components/admin/AdminModal";
import { AdminTable, type Column } from "@/components/admin/AdminTable";
import { AlertCircle, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { createProject, deleteProject, updateProject } from "./actions";

type Project = {
  id: string;
  title: string;
  description: string;
  image_path: string;
  technologies: string[];
  github_url: string;
  live_url: string;
  featured: boolean;
  sort_order: number;
};

const emptyForm = {
  title: "",
  description: "",
  image_path: "",
  technologies: "",
  github_url: "",
  live_url: "",
  featured: false,
  sort_order: "0",
};

const columns: Column<Project>[] = [
  { key: "title", label: "Title" },
  {
    key: "featured",
    label: "Featured",
    render: (row) =>
      row.featured ? (
        <span className="inline-block rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">
          Yes
        </span>
      ) : (
        <span className="text-xs text-muted">No</span>
      ),
  },
  {
    key: "technologies",
    label: "Technologies",
    render: (row) => (
      <span className="text-xs text-muted">
        {row.technologies.slice(0, 3).join(", ")}
        {row.technologies.length > 3 ? "..." : ""}
      </span>
    ),
  },
];

export function ProjectsClient({ items }: { items: Project[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        description: editing.description,
        image_path: editing.image_path,
        technologies: editing.technologies.join(", "),
        github_url: editing.github_url,
        live_url: editing.live_url,
        featured: editing.featured,
        sort_order: String(editing.sort_order),
      });
    } else {
      setForm(emptyForm);
    }
    setError(null);
  }, [editing, open]);

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
        ? await updateProject(editing.id, fd)
        : await createProject(fd);
      if (result.ok) handleClose();
      else setError(result.error);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">{items.length} project(s)</p>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New project
        </button>
      </div>

      <AdminTable
        rows={items}
        columns={columns}
        onEdit={(row) => {
          setEditing(row);
          setOpen(true);
        }}
        onDelete={async (id) => {
          await deleteProject(id);
        }}
        emptyMessage="No projects yet."
      />

      <AdminModal
        open={open}
        onClose={handleClose}
        title={editing ? "Edit project" : "New project"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              required
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={3}
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Image path
            </label>
            <input
              name="image_path"
              required
              value={form.image_path}
              onChange={(e) =>
                setForm((f) => ({ ...f, image_path: e.target.value }))
              }
              placeholder="/images/projects/my-project.png"
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Technologies
            </label>
            <input
              name="technologies"
              value={form.technologies}
              onChange={(e) =>
                setForm((f) => ({ ...f, technologies: e.target.value }))
              }
              placeholder="React, TypeScript, Supabase (comma-separated)"
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              GitHub URL
            </label>
            <input
              name="github_url"
              required
              value={form.github_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, github_url: e.target.value }))
              }
              placeholder="https://github.com/username/repo"
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Live URL
            </label>
            <input
              name="live_url"
              value={form.live_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, live_url: e.target.value }))
              }
              placeholder="https://my-project.vercel.app"
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Order</label>
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

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              name="featured"
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm((f) => ({ ...f, featured: e.target.checked }))
              }
              className="h-4 w-4 rounded accent-accent"
            />
            <span className="text-sm font-medium">Featured project</span>
          </label>

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
