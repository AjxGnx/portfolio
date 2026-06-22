"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  es: "ES",
  "pt-BR": "PT",
};

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  "pt-BR": "Português",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-card-hover transition-colors border border-border/30 hover:border-border/60"
        aria-label="Switch language"
      >
        <Globe className="h-3.5 w-3.5" />
        {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-border/50 bg-card shadow-lg shadow-black/20 overflow-hidden z-50">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-colors ${
                l === locale
                  ? "text-accent bg-accent/10"
                  : "text-muted hover:text-foreground hover:bg-card-hover"
              }`}
            >
              <span className="text-xs font-mono font-bold w-6 shrink-0">
                {LOCALE_LABELS[l]}
              </span>
              <span>{LOCALE_NAMES[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
