"use client";

import { AdminModal } from "@/components/admin/AdminModal";
import { AdminTable, type Column } from "@/components/admin/AdminTable";
import { AlertCircle, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import {
  createCertification,
  deleteCertification,
  updateCertification,
} from "./actions";

type Cert = {
  id: string;
  name: string;
  issuer: string;
  sort_order: number;
};

const emptyForm = { name: "", issuer: "", sort_order: "0" };

const columns: Column<Cert>[] = [
  { key: "name", label: "Certification" },
  { key: "issuer", label: "Issuer" },
  { key: "sort_order", label: "Order" },
];

export function CertificationsClient({ items }: { items: Cert[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Cert | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        issuer: editing.issuer,
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
        ? await updateCertification(editing.id, fd)
        : await createCertification(fd);
      if (result.ok) handleClose();
      else setError(result.error);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">{items.length} certification(s)</p>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New certification
        </button>
      </div>

      <AdminTable
        rows={items}
        columns={columns}
        onEdit={(row) => {
          setEditing(row);
          setOpen(true);
        }}
        onDelete={deleteCertification}
        emptyMessage="No certifications yet."
      />

      <AdminModal
        open={open}
        onClose={handleClose}
        title={editing ? "Edit certification" : "New certification"}
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
              Issuer / Institution
            </label>
            <input
              name="issuer"
              required
              value={form.issuer}
              onChange={(e) =>
                setForm((f) => ({ ...f, issuer: e.target.value }))
              }
              placeholder="e.g.: AWS, Google, Meta"
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
