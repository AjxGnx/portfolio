"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/skills";

export async function createSkill(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("skills").insert({
    name: (formData.get("name") as string).trim(),
    level: Number(formData.get("level")),
    category: (formData.get("category") as string).trim(),
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function updateSkill(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("skills")
    .update({
      name: (formData.get("name") as string).trim(),
      level: Number(formData.get("level")),
      category: (formData.get("category") as string).trim(),
      sort_order: Number(formData.get("sort_order")) || 0,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}
