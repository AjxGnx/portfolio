import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/seo/site";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

function buildUrl(path: string, locale: Locale): string {
  if (locale === routing.defaultLocale) {
    return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  }
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PUBLIC_ROUTES) {
    const isHome = path === "/";

    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      alternates[locale] = buildUrl(path, locale as Locale);
    }

    for (const locale of routing.locales) {
      entries.push({
        url: buildUrl(path, locale as Locale),
        changeFrequency: isHome ? "weekly" : "monthly",
        priority: isHome ? 1 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
