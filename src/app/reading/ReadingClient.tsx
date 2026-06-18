"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FilterBar from "@/components/FilterBar";
import PageContainer from "@/components/PageContainer";
import SectionHeader from "@/components/SectionHeader";
import StatGrid from "@/components/StatGrid";
import type { Book } from "@/lib/types/portfolio";
import type { BookStatus } from "@/lib/supabase/database.types";

type Filter = "all" | BookStatus;

const bookFallback = (
  <div className="absolute inset-0 flex items-center justify-center">
    <BookOpen className="h-12 w-12 text-white/20" />
  </div>
);

const statusConfig: Record<BookStatus, { colorClass: string; dot: string; label: string }> = {
  Read:      { colorClass: "text-emerald-400", dot: "bg-emerald-400", label: "Read" },
  Reading:   { colorClass: "text-amber-400",   dot: "bg-amber-400",   label: "Reading" },
  "To Read": { colorClass: "text-blue-400",    dot: "bg-blue-400",    label: "To Read" },
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "Read", label: "Read" },
  { value: "Reading", label: "Reading" },
  { value: "To Read", label: "To Read" },
];

type Props = {
  books: Book[];
};

export default function ReadingClient({ books }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  let read = 0, reading = 0, toRead = 0;
  for (const b of books) {
    if (b.status === "Read") read++;
    else if (b.status === "Reading") reading++;
    else toRead++;
  }
  const stats = [
    { value: read,    label: "Read",    colorClass: "text-emerald-400" },
    { value: reading, label: "Reading", colorClass: "text-amber-400" },
    { value: toRead,  label: "To Read", colorClass: "text-blue-400" },
  ];

  return (
    <PageContainer>
      <SectionHeader
        title="Reading"
        subtitle="Books that shaped me as a developer and that I enjoy in my free time."
      />

      <StatGrid stats={stats} />

      <FilterBar
        options={filterOptions}
        value={filter}
        onChange={(v) => setFilter(v as Filter)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((book, i) => {
          const status = statusConfig[book.status];

          return (
            <AnimatedSection key={book.id} delay={i * 0.04}>
              <div className="group rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 flex flex-col">

                {/* Cover — portrait, clean, no overlays */}
                <div className="relative aspect-[2/3] overflow-hidden bg-black">
                  {bookFallback}

                  {book.cover && (
                    <>
                      {/* Blur layer via CSS background-image — single network fetch */}
                      <div
                        aria-hidden
                        className="absolute inset-0 scale-110 blur-2xl opacity-40"
                        style={{ backgroundImage: `url(${book.cover})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      />
                      {/* Main cover — zoom on hover */}
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </>
                  )}
                </div>

                {/* Footer strip */}
                <div className="flex items-center justify-between gap-2 px-3 py-2 bg-card border-t border-white/5">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                    <span className="text-amber-400/70 font-normal">★</span>
                    {book.rating > 0 ? book.rating : "—"}
                    <span className="text-muted font-normal">/5</span>
                  </span>

                  {filter === "all" && (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${status.colorClass}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  )}
                </div>

              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </PageContainer>
  );
}
