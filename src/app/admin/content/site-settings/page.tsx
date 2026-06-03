import { createClient } from "@/lib/supabase/server";
import { SiteSettingsClient } from "./_SiteSettingsClient";

export default async function SiteSettingsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">Site settings</h1>
        <p className="text-sm text-red-400">
          No site settings record found in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Site settings</h1>
        <p className="text-sm text-muted">
          Name, bio, email and portfolio links.
        </p>
      </div>
      <SiteSettingsClient settings={data} />
    </div>
  );
}
