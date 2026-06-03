import { createClient } from "@/lib/supabase/server";
import { EducationClient } from "./_EducationClient";

export default async function EducationPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("education_entries")
    .select("id, institution, degree, field, period, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Education</h1>
        <p className="text-sm text-muted">Academic background and degrees.</p>
      </div>
      <EducationClient items={data ?? []} />
    </div>
  );
}
