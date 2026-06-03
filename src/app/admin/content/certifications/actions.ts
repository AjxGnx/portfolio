"use server";

import { getAdminClient, type ActionResult } from "@/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";

const PATH = "/admin/content/certifications";

export async function createCertification(
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("certifications").insert({
    name: (formData.get("name") as string).trim(),
    issuer: (formData.get("issuer") as string).trim(),
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function updateCertification(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("certifications")
    .update({
      name: (formData.get("name") as string).trim(),
      issuer: (formData.get("issuer") as string).trim(),
      sort_order: Number(formData.get("sort_order")) || 0,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}

export async function deleteCertification(id: string): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(PATH);
  return { ok: true };
}
