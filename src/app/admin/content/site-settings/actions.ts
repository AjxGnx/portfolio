"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import { revalidatePortfolioContent } from "@/lib/cache/revalidate";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/site-settings";

export async function updateSiteSettings(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("site_settings")
    .update({
      name: (formData.get("name") as string).trim(),
      title: (formData.get("title") as string).trim(),
      short_title: (formData.get("short_title") as string).trim(),
      description: (formData.get("description") as string).trim(),
      bio: (formData.get("bio") as string).trim(),
      email: (formData.get("email") as string).trim(),
      linkedin: (formData.get("linkedin") as string).trim(),
      github: (formData.get("github") as string).trim(),
      location: (formData.get("location") as string).trim(),
      github_profile_url: (formData.get("github_profile_url") as string).trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  revalidatePortfolioContent();
  return { ok: true };
}
