"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/work";

function parseTech(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createWork(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("work_experiences").insert({
    role: (formData.get("role") as string).trim(),
    company: (formData.get("company") as string).trim(),
    period: (formData.get("period") as string).trim(),
    location: (formData.get("location") as string).trim() || null,
    description: (formData.get("description") as string).trim(),
    technologies: parseTech(formData.get("technologies") as string),
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function updateWork(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("work_experiences")
    .update({
      role: (formData.get("role") as string).trim(),
      company: (formData.get("company") as string).trim(),
      period: (formData.get("period") as string).trim(),
      location: (formData.get("location") as string).trim() || null,
      description: (formData.get("description") as string).trim(),
      technologies: parseTech(formData.get("technologies") as string),
      sort_order: Number(formData.get("sort_order")) || 0,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function deleteWork(id: string): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("work_experiences")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}
