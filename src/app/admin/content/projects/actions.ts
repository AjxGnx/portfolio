"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/projects";

function parseTech(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("portfolio_projects").insert({
    title: (formData.get("title") as string).trim(),
    description: (formData.get("description") as string).trim(),
    image_path: (formData.get("image_path") as string).trim(),
    technologies: parseTech(formData.get("technologies") as string),
    github_url: (formData.get("github_url") as string).trim(),
    live_url: (formData.get("live_url") as string).trim(),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("portfolio_projects")
    .update({
      title: (formData.get("title") as string).trim(),
      description: (formData.get("description") as string).trim(),
      image_path: (formData.get("image_path") as string).trim(),
      technologies: parseTech(formData.get("technologies") as string),
      github_url: (formData.get("github_url") as string).trim(),
      live_url: (formData.get("live_url") as string).trim(),
      featured: formData.get("featured") === "on",
      sort_order: Number(formData.get("sort_order")) || 0,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}
