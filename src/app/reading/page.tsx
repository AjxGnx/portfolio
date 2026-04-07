"use client";

import { useState } from "react";
import { BookOpen, Star, BookMarked, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import { books } from "@/data/mock";

type BookStatus = "all" | "Read" | "Reading" | "To Read";

const statusConfig = {
  "Read": { icon: BookMarked, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  "Reading": { icon: BookOpen, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  "To Read": { icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
};

export default function ReadingPage() {
  const [filter, setFilter] = useState<BookStatus>("all");

  const filtered =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  const categories = [...new Set(books.map((b) => b.category))];

  return (
    <div className="dot-pattern">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeader
          title="Reading"
          subtitle="Books that shaped me as a developer and that I enjoy in my free time."
        />

        {/* Stats */}
        <AnimatedSection className="grid grid-cols-3 gap-3 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold gradient-text">
              {books.filter((b) => b.status === "Read").length}
            </p>
            <p className="text-xs text-muted mt-1">Read</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">
              {books.filter((b) => b.status === "Reading").length}
            </p>
            <p className="text-xs text-muted mt-1">Reading</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">
              {books.filter((b) => b.status === "To Read").length}
            </p>
            <p className="text-xs text-muted mt-1">To Read</p>
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection className="flex flex-wrap items-center gap-2 mb-8">
          {(["all", "Read", "Reading", "To Read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? "bg-accent text-white"
                  : "bg-card text-muted border border-border/50 hover:text-foreground hover:border-accent/30"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </AnimatedSection>

        {/* Categories */}
        <div>
            {categories.map((category) => {
              const categoryBooks = filtered.filter(
                (b) => b.category === category
              );
              if (categoryBooks.length === 0) return null;

              return (
                <div key={category} className="mb-10">
                  <AnimatedSection>
                    <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                      {category}
                    </h3>
                  </AnimatedSection>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryBooks.map((book, i) => {
                      const status = statusConfig[book.status];
                      const StatusIcon = status.icon;

                      return (
                        <AnimatedSection key={book.id} delay={i * 0.08}>
                          <div className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-accent/20 hover:glow transition-all h-full flex flex-col">
                            {/* Cover placeholder */}
                            <div className="h-36 bg-gradient-to-br from-accent/10 to-accent-secondary/10 flex items-center justify-center">
                              <BookOpen className="h-10 w-10 text-accent/30" />
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-bold text-foreground text-sm leading-tight">
                                  {book.title}
                                </h4>
                                <span
                                  className={`inline-flex items-center gap-1 shrink-0 rounded-full ${status.bg} border ${status.border} px-2 py-0.5 text-xs font-medium ${status.color}`}
                                >
                                  <StatusIcon className="h-3 w-3" />
                                  {book.status}
                                </span>
                              </div>

                              <p className="text-xs text-muted mb-3">
                                {book.author}
                              </p>

                              {/* Rating */}
                              <div className="flex items-center gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`h-3.5 w-3.5 ${
                                      idx < book.rating
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-border"
                                    }`}
                                  />
                                ))}
                              </div>

                              {book.review && (
                                <p className="text-xs text-muted leading-relaxed flex-1">
                                  &ldquo;{book.review}&rdquo;
                                </p>
                              )}
                            </div>
                          </div>
                        </AnimatedSection>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
