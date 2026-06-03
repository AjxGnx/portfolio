import { createClient } from "@/lib/supabase/server";
import { SkillsClient } from "./_SkillsClient";

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("id, name, level, category, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Skills</h1>
        <p className="text-sm text-muted">Technical skills and proficiency levels.</p>
      </div>
      <SkillsClient skills={data ?? []} />
    </div>
  );
}
