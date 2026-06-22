import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/data/portfolio";
import { rootMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/site";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export const metadata = rootMetadata;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const siteConfig = await getSiteConfig(locale as Locale);

  const richDescription = [siteConfig.description, siteConfig.bio]
    .filter(Boolean)
    .join(" ");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: SITE_URL,
    image: `${SITE_URL}/hero.jpg`,
    jobTitle: siteConfig.shortTitle,
    description: richDescription,
    email: siteConfig.email,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: [
      "Go",
      "Python",
      "Node.js",
      "Microservices",
      "Apache Kafka",
      "PostgreSQL",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: SITE_URL,
    description: richDescription,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
