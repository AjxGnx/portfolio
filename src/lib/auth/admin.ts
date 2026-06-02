import type { User } from "@supabase/supabase-js";

export function isAdminUser(user: User | null | undefined): boolean {
  if (!user) return false;
  const metadata = user.app_metadata as Record<string, unknown> | undefined;
  return metadata?.role === "admin";
}
