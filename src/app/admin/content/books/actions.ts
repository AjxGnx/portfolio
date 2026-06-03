"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import { revalidatePortfolioContent } from "@/lib/cache/revalidate";
import type { BookStatus } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/books";

export async function createBook(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("books").insert({
    title: (formData.get("title") as string).trim(),
    author: (formData.get("author") as string).trim(),
    cover_path: (formData.get("cover_path") as string).trim(),
    rating: Number(formData.get("rating")),
    status: formData.get("status") as BookStatus,
    review: (formData.get("review") as string).trim(),
    category: (formData.get("category") as string).trim(),
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  revalidatePortfolioContent();
  return { ok: true };
}

export async function updateBook(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("books")
    .update({
      title: (formData.get("title") as string).trim(),
      author: (formData.get("author") as string).trim(),
      cover_path: (formData.get("cover_path") as string).trim(),
      rating: Number(formData.get("rating")),
      status: formData.get("status") as BookStatus,
      review: (formData.get("review") as string).trim(),
      category: (formData.get("category") as string).trim(),
      sort_order: Number(formData.get("sort_order")) || 0,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  revalidatePortfolioContent();
  return { ok: true };
}

export async function deleteBook(id: string): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  revalidatePortfolioContent();
  return { ok: true };
}
