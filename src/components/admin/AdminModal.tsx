"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AdminModal({ open, onClose, title, children }: AdminModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border shadow-2xl flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:text-foreground hover:bg-card/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
