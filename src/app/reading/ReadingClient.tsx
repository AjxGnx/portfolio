"use client";

import { useState } from "react";
import { BookOpen, Star, BookMarked, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FilterBar from "@/components/FilterBar";
import PageContainer from "@/components/PageContainer";
import SectionHeader from "@/components/SectionHeader";
import StatGrid from "@/components/StatGrid";
import type { Book } from "@/lib/types/portfolio";
import type { BookStatus } from "@/lib/supabase/database.types";

type Filter = "all" | BookStatus;

const statusConfig = {
  Read:      { icon: BookMarked, colorClass: "text-emerald-400", label: "Read" },
  Reading:   { icon: BookOpen,   colorClass: "text-amber-400",   label: "Reading" },
  "To Read": { icon: Clock,      colorClass: "text-blue-400",    label: "To Read" },
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

  const stats = [
    { value: books.filter((b) => b.status === "Read").length,     label: "Read",    colorClass: "text-emerald-400" },
    { value: books.filter((b) => b.status === "Reading").length,  label: "Reading", colorClass: "text-amber-400" },
    { value: books.filter((b) => b.status === "To Read").length,  label: "To Read", colorClass: "text-blue-400" },
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
              <div className="flex flex-col rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/70">

                {/* Cover — portrait, clean, no overlays */}
                <div className="relative aspect-[2/3] bg-black">
                  {book.cover && (
                    <img
                      src={book.cover}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
                    />
                  )}
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="absolute inset-0 w-full h-full object-contain z-10"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <BookOpen className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                </div>

                {/* Footer strip — outside the image */}
                <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-card border-t border-white/5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-3.5 w-3.5 ${
                          idx < book.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-white/10"
                        }`}
                      />
                    ))}
                  </div>

                  {filter === "all" && (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${status.colorClass}`}>
                      <status.icon className="h-3 w-3" />
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
