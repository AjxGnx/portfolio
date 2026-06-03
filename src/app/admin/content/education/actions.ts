"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import { revalidatePortfolioContent } from "@/lib/cache/revalidate";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/education";

export async function createEducation(
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("education_entries").insert({
    institution: (formData.get("institution") as string).trim(),
    degree: (formData.get("degree") as string).trim(),
    field: (formData.get("field") as string).trim(),
    period: (formData.get("period") as string).trim(),
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  revalidatePortfolioContent();
  return { ok: true };
}

export async function updateEducation(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("education_entries")
    .update({
      institution: (formData.get("institution") as string).trim(),
      degree: (formData.get("degree") as string).trim(),
      field: (formData.get("field") as string).trim(),
      period: (formData.get("period") as string).trim(),
      sort_order: Number(formData.get("sort_order")) || 0,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  revalidatePortfolioContent();
  return { ok: true };
}

export async function deleteEducation(id: string): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("education_entries")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  revalidatePortfolioContent();
  return { ok: true };
}
