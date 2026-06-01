"use client";

import { useState } from "react";
import { Gamepad2, Star, Trophy, Play, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Card, { CardContent } from "@/components/Card";
import FilterBar from "@/components/FilterBar";
import PageContainer from "@/components/PageContainer";
import SectionHeader from "@/components/SectionHeader";
import StatGrid from "@/components/StatGrid";
import StatusBadge from "@/components/StatusBadge";
import { games } from "@/data/mock";

type GameStatus = "all" | "Completed" | "Playing" | "Backlog";

const statusConfig = {
  Completed: { icon: Trophy, colorClass: "text-emerald-400", bgClass: "bg-emerald-400/10", borderClass: "border-emerald-400/30" },
  Playing: { icon: Play, colorClass: "text-amber-400", bgClass: "bg-amber-400/10", borderClass: "border-amber-400/30" },
  Backlog: { icon: Clock, colorClass: "text-blue-400", bgClass: "bg-blue-400/10", borderClass: "border-blue-400/30" },
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "Completed", label: "Completed" },
  { value: "Playing", label: "Playing" },
  { value: "Backlog", label: "Backlog" },
];

export default function GamingPage() {
  const [filter, setFilter] = useState<GameStatus>("all");

  const filtered =
    filter === "all" ? games : games.filter((g) => g.status === filter);

  const stats = [
    { value: games.filter((g) => g.status === "Completed").length, label: "Completed" },
    { value: games.filter((g) => g.status === "Playing").length, label: "Playing", colorClass: "text-amber-400" },
    { value: games.filter((g) => g.status === "Backlog").length, label: "Backlog", colorClass: "text-blue-400" },
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
        onChange={(v) => setFilter(v as GameStatus)}
      />

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((game, i) => {
          const status = statusConfig[game.status as keyof typeof statusConfig];

          return (
            <AnimatedSection key={game.id} delay={i * 0.08}>
              <Card
                media={
                  <div className="relative h-44 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 overflow-hidden flex items-center justify-center">
                    <Gamepad2 className="h-12 w-12 text-emerald-400/30" />
                    <div className="absolute top-3 left-3">
                      <StatusBadge
                        icon={status.icon}
                        label={game.status}
                        colorClass={status.colorClass}
                        bgClass={status.bgClass}
                        borderClass={status.borderClass}
                      />
                    </div>
                    {game.rating > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-2 py-0.5 text-xs font-bold text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400" />
                          {game.rating}
                        </span>
                      </div>
                    )}
                  </div>
                }
              >
                <CardContent>
                  <h3 className="font-bold text-foreground mb-1">{game.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted mb-1">
                    <span>{game.platform}</span>
                    <span className="text-border">•</span>
                    <span>{game.genre}</span>
                  </div>

                  {game.review && (
                    <p className="text-xs text-muted leading-relaxed mt-3 flex-1">
                      &ldquo;{game.review}&rdquo;
                    </p>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>
    </PageContainer>
  );
}
