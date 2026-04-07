"use client";

import { useState } from "react";
import { ExternalLink, FolderGit2, Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import { GitHubIcon } from "@/components/SocialIcons";
import { projects } from "@/data/mock";

type Filter = "all" | "featured";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <div className="dot-pattern">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeader
          title="Projects"
          subtitle="A selection of projects I've worked on. From full platforms to creative experiments."
        />

        {/* Filters */}
        <AnimatedSection className="flex items-center gap-2 mb-8">
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? "bg-accent text-white"
                  : "bg-card text-muted border border-border/50 hover:text-foreground hover:border-accent/30"
              }`}
            >
              {f === "all" ? "All" : "Featured"}
            </button>
          ))}
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.08}>
                <div className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-accent/20 hover:glow transition-all h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="relative h-44 bg-gradient-to-br from-accent/20 to-accent-secondary/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FolderGit2 className="h-12 w-12 text-accent/40" />
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-xs font-medium text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400" />
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
                      >
                        <GitHubIcon className="h-4 w-4" />
                        Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
        </div>
      </div>
    </div>
  );
}
