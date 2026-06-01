"use client";

import { useState } from "react";
import { BookOpen, Star, BookMarked, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Card, { CardContent } from "@/components/Card";
import CategoryLabel from "@/components/CategoryLabel";
import FilterBar from "@/components/FilterBar";
import PageContainer from "@/components/PageContainer";
import SectionHeader from "@/components/SectionHeader";
import StatGrid from "@/components/StatGrid";
import StatusBadge from "@/components/StatusBadge";
import { books } from "@/data/mock";

type BookStatus = "all" | "Read" | "Reading" | "To Read";

const statusConfig = {
  Read: { icon: BookMarked, colorClass: "text-emerald-400", bgClass: "bg-emerald-400/10", borderClass: "border-emerald-400/30" },
  Reading: { icon: BookOpen, colorClass: "text-amber-400", bgClass: "bg-amber-400/10", borderClass: "border-amber-400/30" },
  "To Read": { icon: Clock, colorClass: "text-blue-400", bgClass: "bg-blue-400/10", borderClass: "border-blue-400/30" },
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "Read", label: "Read" },
  { value: "Reading", label: "Reading" },
  { value: "To Read", label: "To Read" },
];

export default function ReadingPage() {
  const [filter, setFilter] = useState<BookStatus>("all");

  const filtered =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  const categories = [...new Set(books.map((b) => b.category))];

  const stats = [
    { value: books.filter((b) => b.status === "Read").length, label: "Read" },
    { value: books.filter((b) => b.status === "Reading").length, label: "Reading", colorClass: "text-amber-400" },
    { value: books.filter((b) => b.status === "To Read").length, label: "To Read", colorClass: "text-blue-400" },
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
        onChange={(v) => setFilter(v as BookStatus)}
      />

      {/* Categories */}
      <div>
        {categories.map((category) => {
          const categoryBooks = filtered.filter((b) => b.category === category);
          if (categoryBooks.length === 0) return null;

          return (
            <div key={category} className="mb-10">
              <AnimatedSection>
                <CategoryLabel label={category} />
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryBooks.map((book, i) => {
                  const status = statusConfig[book.status];

                  return (
                    <AnimatedSection key={book.id} delay={i * 0.08}>
                      <Card
                        media={
                          <div className="h-36 bg-gradient-to-br from-accent/10 to-accent-secondary/10 flex items-center justify-center">
                            <BookOpen className="h-10 w-10 text-accent/30" />
                          </div>
                        }
                      >
                        <CardContent>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-bold text-foreground text-sm leading-tight">
                              {book.title}
                            </h4>
                            <StatusBadge
                              icon={status.icon}
                              label={book.status}
                              colorClass={status.colorClass}
                              bgClass={status.bgClass}
                              borderClass={status.borderClass}
                              className="shrink-0"
                            />
                          </div>

                          <p className="text-xs text-muted mb-3">{book.author}</p>

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
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
