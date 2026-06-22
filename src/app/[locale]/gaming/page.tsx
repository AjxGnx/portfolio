import GamingClient from "@/app/[locale]/gaming/GamingClient";
import { getGames } from "@/lib/data/portfolio";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function GamingPage({ params }: Props) {
  const { locale } = await params;
  const games = await getGames(locale as Locale);
  return <GamingClient games={games} />;
}
