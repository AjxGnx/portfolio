"use client";

import { AdminModal } from "@/components/admin/AdminModal";
import { AdminTable, type Column } from "@/components/admin/AdminTable";
import type { GameStatus } from "@/lib/supabase/database.types";
import { AlertCircle, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { createGame, deleteGame, updateGame } from "./actions";

type Game = {
  id: string;
  title: string;
  platform: string;
  genre: string;
  rating: number;
  status: GameStatus;
  image_path: string;
  review: string;
  sort_order: number;
};

const STATUSES: GameStatus[] = ["Completed", "Playing", "Backlog"];

const emptyForm = {
  title: "",
  platform: "",
  genre: "",
  rating: "7",
  status: "Backlog" as GameStatus,
  image_path: "",
  review: "",
  sort_order: "0",
};

const columns: Column<Game>[] = [
  { key: "title", label: "Title" },
  { key: "platform", label: "Platform" },
  { key: "status", label: "Status" },
  {
    key: "rating",
    label: "Rating",
    render: (row) => <span className="text-sm">{row.rating}/10</span>,
  },
];

export function GamesClient({ items }: { items: Game[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Game | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        platform: editing.platform,
        genre: editing.genre,
        rating: String(editing.rating),
        status: editing.status,
        image_path: editing.image_path,
        review: editing.review,
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
        ? await updateGame(editing.id, fd)
        : await createGame(fd);
      if (result.ok) handleClose();
      else setError(result.error);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">{items.length} game(s)</p>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New game
        </button>
      </div>

      <AdminTable
        rows={items}
        columns={columns}
        onEdit={(row) => {
          setEditing(row);
          setOpen(true);
        }}
        onDelete={deleteGame}
        emptyMessage="No games yet."
      />

      <AdminModal
        open={open}
        onClose={handleClose}
        title={editing ? "Edit game" : "New game"}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Platform
              </label>
              <input
                name="platform"
                required
                value={form.platform}
                onChange={(e) =>
                  setForm((f) => ({ ...f, platform: e.target.value }))
                }
                placeholder="PC, PS5, Switch…"
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Genre</label>
              <input
                name="genre"
                required
                value={form.genre}
                onChange={(e) =>
                  setForm((f) => ({ ...f, genre: e.target.value }))
                }
                placeholder="RPG, Action…"
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
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
              placeholder="/images/games/title.jpg"
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    status: e.target.value as GameStatus,
                  }))
                }
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Rating (0–10)
              </label>
              <input
                name="rating"
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={form.rating}
                onChange={(e) =>
                  setForm((f) => ({ ...f, rating: e.target.value }))
                }
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Review</label>
            <textarea
              name="review"
              value={form.review}
              onChange={(e) =>
                setForm((f) => ({ ...f, review: e.target.value }))
              }
              rows={3}
              className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50 resize-none"
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
