"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Check, ChevronDown } from "lucide-react";
import { routing } from "@/i18n/routing";

const LOCALES: {
  code: string;
  flag: string;
  short: string;
  native: string;
}[] = [
  { code: "en", flag: "🇺🇸", short: "EN", native: "English" },
  { code: "es", flag: "🇪🇸", short: "ES", native: "Español" },
  { code: "pt-BR", flag: "🇧🇷", short: "PT", native: "Português" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.native}`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-card-hover transition-colors border border-border/30 hover:border-border/60"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.short}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-1.5 w-40 rounded-xl border border-border/50 bg-card shadow-lg shadow-black/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {routing.locales.map((code) => {
            const opt = LOCALES.find((l) => l.code === code)!;
            const isActive = code === locale;
            return (
              <button
                key={code}
                role="option"
                aria-selected={isActive}
                onClick={() => switchLocale(code)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors ${
                  isActive
                    ? "text-accent bg-accent/10"
                    : "text-muted hover:text-foreground hover:bg-card-hover"
                }`}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {opt.flag}
                </span>
                <span className="flex-1">{opt.native}</span>
                {isActive && (
                  <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
