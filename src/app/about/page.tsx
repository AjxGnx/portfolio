"use client";

import Image from "next/image";
import { MapPin, Calendar, Download, GraduationCap, Award, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SkillBar from "@/components/SkillBar";
import SectionHeader from "@/components/SectionHeader";
import { LinkedInIcon } from "@/components/SocialIcons";
import { siteConfig, skills, experience, education, certifications } from "@/data/mock";

export default function AboutPage() {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="dot-pattern">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeader
          title="About Me"
          subtitle="Learn more about who I am, what I do, and what drives me."
        />

        {/* Bio Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <AnimatedSection className="md:col-span-1">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-accent-secondary p-0.5 mb-4">
                <Image
                  src="/profile.jpg"
                  alt="Alirio Gutierrez"
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                  priority
                />
              </div>
              <h2 className="text-lg font-bold">{siteConfig.name}</h2>
              <p className="text-xs text-accent mb-1">{siteConfig.shortTitle}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-muted mb-4">
                <MapPin className="h-3 w-3" />
                {siteConfig.location}
              </div>
              <div className="space-y-2">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors w-full justify-center"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:border-accent/20 transition-colors w-full justify-center"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
                <button className="inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:border-accent/20 transition-colors w-full justify-center">
                  <Download className="h-4 w-4" />
                  Download CV
                </button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="md:col-span-2" delay={0.1}>
            <div className="glass rounded-2xl p-6 h-full">
              <h3 className="text-xl font-bold mb-4">
                <span className="gradient-text">Who am I?</span>
              </h3>
              <div className="space-y-4 text-muted text-sm leading-relaxed">
                <p>{siteConfig.description}</p>
                <p>{siteConfig.bio}</p>
                <p>
                  Throughout my career I've had the opportunity to work at companies
                  like <span className="text-accent font-medium">Rappi</span>,{" "}
                  <span className="text-accent font-medium">Platzi</span>, and{" "}
                  <span className="text-accent font-medium">Gipsyy</span>, where I've
                  led development teams, designed microservice architectures,
                  and built solutions that impact millions of users.
                </p>
                <p>
                  My main stack includes <span className="text-foreground font-medium">Go</span>,{" "}
                  <span className="text-foreground font-medium">Python</span>, and{" "}
                  <span className="text-foreground font-medium">Node.js</span>, with
                  deep experience in microservices, Apache Kafka, event-driven
                  architectures, BigData, and cloud services (AWS, GCP).
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Skills */}
        <AnimatedSection className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Technical <span className="gradient-text">Skills</span>
          </h2>

          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, i) => (
                      <AnimatedSection key={skill.name} delay={i * 0.05}>
                        <div className="rounded-xl border border-border/50 bg-card p-4 hover:bg-card-hover transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {skill.name}
                            </span>
                            <span className="text-xs text-muted">
                              {skill.level}%
                            </span>
                          </div>
                          <SkillBar level={skill.level} delay={i * 0.1} />
                        </div>
                      </AnimatedSection>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Professional <span className="gradient-text">Experience</span>
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <AnimatedSection key={exp.id} delay={i * 0.1}>
                  <div className="relative pl-12 md:pl-20">
                    <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background" />

                    <div className="glass rounded-2xl p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-bold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-accent">{exp.company}</p>
                          {exp.location && (
                            <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs text-muted whitespace-nowrap">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              <span className="gradient-text">Education</span>
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="glass rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-accent/10 p-2.5 shrink-0">
                      <GraduationCap className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-accent">{edu.field}</p>
                      <p className="text-xs text-muted mt-1">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-muted flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {edu.period}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Certifications */}
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              <span className="gradient-text">Certifications</span>
            </h2>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-4 flex items-center gap-3 hover:border-accent/20 transition-colors"
                >
                  <div className="rounded-lg bg-amber-400/10 p-2 shrink-0">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {cert.name}
                    </p>
                    <p className="text-xs text-muted">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
