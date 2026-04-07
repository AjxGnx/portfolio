"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="dot-pattern min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-8xl sm:text-9xl font-bold gradient-text mb-4">
            404
          </h1>
          <p className="text-xl text-muted mb-8">
            This page doesn't exist... yet.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:scale-105 active:scale-95"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-card hover:border-accent/30 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
