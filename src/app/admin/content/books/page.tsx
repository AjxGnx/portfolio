import { createClient } from "@/lib/supabase/server";
import { BooksClient } from "./_BooksClient";

export default async function BooksPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("books")
    .select("id, title, author, cover_path, rating, status, review, category, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Books</h1>
        <p className="text-sm text-muted">Reading list, reviews and reading status.</p>
      </div>
      <BooksClient items={data ?? []} />
    </div>
  );
}
