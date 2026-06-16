"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  BookOpen,
  Gamepad2,
  Briefcase,
  Terminal,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SkillCard from "@/components/SkillCard";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import type { SiteConfig, Skill } from "@/lib/types/portfolio";

const highlights = [
  {
    icon: Code2,
    title: "Projects",
    description: "Microservices, APIs and backend solutions with Go, Python & Node.js",
    href: "/projects",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description: "Dev books, good reads, and more",
    href: "/reading",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "RPGs, metroidvanias & epic adventures",
    href: "/gaming",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Briefcase,
    title: "Experience",
    description: "+7 years at Rappi, Platzi, Gipsyy & more",
    href: "/about",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

type Props = {
  siteConfig: SiteConfig;
  topSkills: Skill[];
};

export default function HomeClient({ siteConfig, topSkills }: Props) {
  return (
    <div className="dot-pattern">
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-accent-secondary/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo: above text on mobile (order-1), right column on desktop (order-2) */}
            <div className="flex justify-center items-center order-1 lg:order-2 animate-fade-in-up-2">
              <div className="relative w-64 sm:w-80 lg:w-full">
                <div className="absolute -inset-4 bg-accent/15 rounded-3xl blur-2xl" />
                <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/30 to-accent-secondary/30 rounded-2xl" />
                <Image
                  src="/hero.jpg"
                  alt={siteConfig.name}
                  width={471}
                  height={446}
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Left column: text, buttons, and terminal (order-2 on mobile, order-1 on desktop) */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
                Hey, I&apos;m{" "}
                <span className="gradient-text">{siteConfig.name}</span>
              </h1>

              <p className="text-base sm:text-lg text-accent-secondary font-medium mb-4 animate-fade-in-up-1">
                {siteConfig.shortTitle}
              </p>

              <p className="text-sm sm:text-base text-muted max-w-xl mb-3 animate-fade-in-up-2">
                {siteConfig.name} — {siteConfig.shortTitle}. Based in{" "}
                {siteConfig.location}.
              </p>

              <p className="text-sm sm:text-base text-muted max-w-xl mb-3 animate-fade-in-up-2">
                {siteConfig.description}
              </p>

              <p className="text-sm sm:text-base text-muted max-w-xl mb-8 animate-fade-in-up-2">
                {siteConfig.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 animate-fade-in-up-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:scale-105 active:scale-95"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-card hover:border-accent/30 hover:scale-105 active:scale-95"
                >
                  Get in Touch
                </Link>
                <div className="flex items-center gap-3 ml-2">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="mt-12 glass rounded-xl p-4 max-w-md animate-fade-in-up-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-muted font-mono ml-2">
                    <Terminal className="h-3 w-3 inline mr-1" />
                    terminal
                  </span>
                </div>
                <pre className="font-mono text-xs sm:text-sm text-muted leading-relaxed">
                  <code>
                    <span className="text-accent">$</span>{" "}
                    <span className="text-foreground">whoami</span>
                    {"\n"}
                    <span className="text-accent-secondary">→</span> Senior Backend
                    Developer & Tech Lead
                    {"\n"}
                    <span className="text-accent">$</span>{" "}
                    <span className="text-foreground">cat interests.txt</span>
                    {"\n"}
                    <span className="text-accent-secondary">→</span> Go, Python,
                    Node.js, Kafka
                    {"\n"}
                    <span className="text-accent">$</span>{" "}
                    <span className="text-foreground">cat hobbies.txt</span>
                    {"\n"}
                    <span className="text-accent-secondary">→</span> books, gaming,
                    learning
                    {"\n"}
                    <span className="text-accent">$</span>{" "}
                    <span className="text-foreground animate-pulse">▊</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Explore my <span className="gradient-text">world</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <Link
                href={item.href}
                className="group block rounded-2xl border border-border/50 bg-card p-6 transition-all hover:bg-card-hover hover:border-accent/20 hover:glow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-xl ${item.bg} p-3 transition-transform group-hover:scale-110`}
                  >
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      {item.title}
                      <ArrowRight className="h-4 w-4 text-muted opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 border-t border-border/50">
        <AnimatedSection className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-sm text-muted max-w-2xl">
            A selection of the technologies I work with most, including{" "}
            {topSkills.map((skill) => skill.name).join(", ")}.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topSkills.map((skill, i) => (
            <AnimatedSection key={skill.id} delay={i * 0.05}>
              <SkillCard name={skill.name} level={skill.level} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="mt-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            View all skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
