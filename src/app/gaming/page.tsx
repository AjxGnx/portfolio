"use client";

import { useState } from "react";
import { Gamepad2, Star, Trophy, Play, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import { games } from "@/data/mock";

type GameStatus = "all" | "Completed" | "Playing" | "Backlog";

const statusConfig = {
  Completed: {
    icon: Trophy,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  Playing: {
    icon: Play,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  Backlog: {
    icon: Clock,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
  },
};

export default function GamingPage() {
  const [filter, setFilter] = useState<GameStatus>("all");

  const filtered =
    filter === "all" ? games : games.filter((g) => g.status === filter);

  return (
    <div className="dot-pattern">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeader
          title="Gaming"
          subtitle="The video games I'm passionate about. From epic RPGs to challenging platformers."
        />

        {/* Stats */}
        <AnimatedSection className="grid grid-cols-3 gap-3 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold gradient-text">
              {games.filter((g) => g.status === "Completed").length}
            </p>
            <p className="text-xs text-muted mt-1">Completed</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">
              {games.filter((g) => g.status === "Playing").length}
            </p>
            <p className="text-xs text-muted mt-1">Playing</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">
              {games.filter((g) => g.status === "Backlog").length}
            </p>
            <p className="text-xs text-muted mt-1">Backlog</p>
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection className="flex flex-wrap items-center gap-2 mb-8">
          {(["all", "Completed", "Playing", "Backlog"] as const).map(
            (f) => (
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
            )
          )}
        </AnimatedSection>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((game, i) => {
              const status =
                statusConfig[game.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <AnimatedSection key={game.id} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-accent/20 hover:glow transition-all h-full flex flex-col">
                    {/* Image placeholder */}
                    <div className="relative h-44 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 overflow-hidden flex items-center justify-center">
                      <Gamepad2 className="h-12 w-12 text-emerald-400/30" />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full ${status.bg} border ${status.border} px-2 py-0.5 text-xs font-medium ${status.color}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {game.status}
                        </span>
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

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-foreground mb-1">
                        {game.title}
                      </h3>
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
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
        </div>
      </div>
    </div>
  );
}
