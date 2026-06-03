"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import type { GameStatus } from "@/lib/supabase/database.types";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/games";

export async function createGame(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("games").insert({
    title: (formData.get("title") as string).trim(),
    platform: (formData.get("platform") as string).trim(),
    genre: (formData.get("genre") as string).trim(),
    rating: Number(formData.get("rating")),
    status: formData.get("status") as GameStatus,
    image_path: (formData.get("image_path") as string).trim(),
    review: (formData.get("review") as string).trim(),
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function updateGame(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("games")
    .update({
      title: (formData.get("title") as string).trim(),
      platform: (formData.get("platform") as string).trim(),
      genre: (formData.get("genre") as string).trim(),
      rating: Number(formData.get("rating")),
      status: formData.get("status") as GameStatus,
      image_path: (formData.get("image_path") as string).trim(),
      review: (formData.get("review") as string).trim(),
      sort_order: Number(formData.get("sort_order")) || 0,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function deleteGame(id: string): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("games").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}
