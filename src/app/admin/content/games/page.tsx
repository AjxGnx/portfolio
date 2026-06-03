import { createClient } from "@/lib/supabase/server";
import { GamesClient } from "./_GamesClient";

export default async function GamesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("games")
    .select("id, title, platform, genre, rating, status, image_path, review, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Games</h1>
        <p className="text-sm text-muted">Video games, platforms and reviews.</p>
      </div>
      <GamesClient items={data ?? []} />
    </div>
  );
}
