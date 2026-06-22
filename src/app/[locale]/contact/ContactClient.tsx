"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PageContainer from "@/components/PageContainer";
import SectionHeader from "@/components/SectionHeader";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { submitContactMessage } from "@/app/actions/contact";
import type { SiteConfig } from "@/lib/types/portfolio";

type Props = {
  siteConfig: SiteConfig;
};

export default function ContactClient({ siteConfig }: Props) {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitContactMessage({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? ""),
      });

      if (result.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
        <AnimatedSection className="md:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 space-y-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-accent/10 p-2.5">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t("emailLabel")}</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-accent/10 p-2.5">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t("locationLabel")}</p>
                <p className="text-sm text-muted">{siteConfig.location}</p>
              </div>
            </div>

            <div className="border-t border-border/50 pt-5">
              <p className="text-xs text-muted mb-3">{t("findMeOn")}</p>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-sm text-muted hover:text-accent hover:border-accent/30 transition-all"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-sm text-muted hover:text-accent hover:border-accent/30 transition-all"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="md:col-span-3" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 space-y-4"
          >
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  {t("nameLabel")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("namePlaceholder")}
                  className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  {t("emailFieldLabel")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                {t("subjectLabel")}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder={t("subjectPlaceholder")}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                {t("messageLabel")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder={t("messagePlaceholder")}
                className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted || isPending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {submitted ? (
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {t("sentButton")}
                </span>
              ) : isPending ? (
                t("sendingButton")
              ) : (
                <>
                  {t("sendButton")}
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </PageContainer>
  );
}
