"use client";

import { useState } from "react";
import { ExternalLink, FolderGit2, Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Card, { CardContent, CardFooter } from "@/components/Card";
import FilterBar from "@/components/FilterBar";
import PageContainer from "@/components/PageContainer";
import SectionHeader from "@/components/SectionHeader";
import TechBadge from "@/components/TechBadge";
import { GitHubIcon } from "@/components/SocialIcons";
import { projects } from "@/data/mock";

type Filter = "all" | "featured";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "featured", label: "Featured" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <PageContainer>
      <SectionHeader
        title="Projects"
        subtitle="A selection of projects I've worked on. From full platforms to creative experiments."
      />

      <FilterBar
        options={filterOptions}
        value={filter}
        onChange={(v) => setFilter(v as Filter)}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.08}>
            <Card
              media={
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
              }
            >
              <CardContent>
                <h3 className="font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech} label={tech} variant="tag" />
                  ))}
                </div>

                <CardFooter>
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
                </CardFooter>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </PageContainer>
  );
}
