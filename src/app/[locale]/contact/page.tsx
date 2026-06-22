import ContactClient from "@/app/[locale]/contact/ContactClient";
import { getSiteConfig } from "@/lib/data/portfolio";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const siteConfig = await getSiteConfig(locale as Locale);
  return <ContactClient siteConfig={siteConfig} />;
}
