import { createClient } from "@/lib/supabase/server";
import { WorkClient } from "./_WorkClient";

export default async function WorkPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("work_experiences")
    .select("id, role, company, period, location, description, technologies, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Work experience</h1>
        <p className="text-sm text-muted">Jobs, roles and technologies used.</p>
      </div>
      <WorkClient items={data ?? []} />
    </div>
  );
}
