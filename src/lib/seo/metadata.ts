import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  GOOGLE_SITE_VERIFICATION,
  LOCALE_TO_OG,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/site";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
  locale?: Locale;
};

function buildLocalizedUrl(path: string, locale: Locale): string {
  const base = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  if (locale === routing.defaultLocale) return base;
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = buildLocalizedUrl(path, locale as Locale);
  }
  return languages;
}

export function createPageMetadata({
  title,
  description,
  path,
  locale = "en",
}: PageMetadataOptions): Metadata {
  const canonical = buildLocalizedUrl(path, locale);
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const ogLocale = LOCALE_TO_OG[locale] ?? "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages: buildAlternates(path),
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: "https://github.com/AjxGnx" }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: buildAlternates("/"),
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};
