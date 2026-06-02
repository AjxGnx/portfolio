import GamingClient from "@/app/gaming/GamingClient";
import { getGames } from "@/lib/data/portfolio";

export default async function GamingPage() {
  const games = await getGames();
  return <GamingClient games={games} />;
}
