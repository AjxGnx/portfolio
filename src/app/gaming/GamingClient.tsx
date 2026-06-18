"use client";

import { useState } from "react";
import { Gamepad2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FilterBar from "@/components/FilterBar";
import PageContainer from "@/components/PageContainer";
import SectionHeader from "@/components/SectionHeader";
import StatGrid from "@/components/StatGrid";
import type { Game } from "@/lib/types/portfolio";
import type { GameStatus } from "@/lib/supabase/database.types";

type Filter = "all" | GameStatus;

const gameFallback = (
  <div className="absolute inset-0 flex items-center justify-center">
    <Gamepad2 className="h-10 w-10 text-muted/30" />
  </div>
);

const statusConfig: Record<GameStatus, { colorClass: string; dot: string; label: string }> = {
  Completed: { colorClass: "text-emerald-400", dot: "bg-emerald-400", label: "Completed" },
  Playing:   { colorClass: "text-amber-400",   dot: "bg-amber-400",   label: "Playing" },
  Backlog:   { colorClass: "text-blue-400",    dot: "bg-blue-400",    label: "Backlog" },
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "Completed", label: "Completed" },
  { value: "Playing", label: "Playing" },
  { value: "Backlog", label: "Backlog" },
];

type Props = {
  games: Game[];
};

export default function GamingClient({ games }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? games : games.filter((g) => g.status === filter);

  let completed = 0, playing = 0, backlog = 0;
  for (const g of games) {
    if (g.status === "Completed") completed++;
    else if (g.status === "Playing") playing++;
    else backlog++;
  }
  const stats = [
    { value: completed, label: "Completed", colorClass: "gradient-text" },
    { value: playing,   label: "Playing",   colorClass: "text-amber-400" },
    { value: backlog,   label: "Backlog",   colorClass: "text-blue-400" },
  ];

  return (
    <PageContainer>
      <SectionHeader
        title="Gaming"
        subtitle="The video games I'm passionate about. From epic RPGs to challenging platformers."
      />

      <StatGrid stats={stats} />

      <FilterBar
        options={filterOptions}
        value={filter}
        onChange={(v) => setFilter(v as Filter)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((game, i) => {
          const status = statusConfig[game.status];

          return (
            <AnimatedSection key={game.id} delay={i * 0.06}>
              <div className="group rounded-xl overflow-hidden border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-black/20 flex flex-col">
                {/* Cover image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-card">
                  {/* Blurred background layer */}
                  <div
                    className="absolute inset-0 scale-110 blur-2xl opacity-60"
                    style={{ backgroundImage: `url(${game.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                  {gameFallback}
                  {/* Main cover */}
                  <img
                    src={game.image}
                    alt={game.title}
                    className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-3 py-2 bg-card border-t border-border/40">
                  {/* Rating badge */}
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                    <span className="text-amber-400/70 font-normal">★</span>
                    {game.rating > 0 ? game.rating : "—"}
                    <span className="text-muted font-normal">/10</span>
                  </span>

                  {/* Status — hidden when filtering by that status */}
                  {filter === "all" && (
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${status.colorClass}`}
                    >
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
