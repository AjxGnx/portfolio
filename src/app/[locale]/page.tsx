import HomeClient from "@/app/[locale]/HomeClient";
import { getSiteConfig, getSkills } from "@/lib/data/portfolio";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const [siteConfig, skills] = await Promise.all([
    getSiteConfig(locale as Locale),
    getSkills(),
  ]);
  const topSkills = skills.slice(0, 8);

  return <HomeClient siteConfig={siteConfig} topSkills={topSkills} />;
}
