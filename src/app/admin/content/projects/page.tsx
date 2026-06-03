import { createClient } from "@/lib/supabase/server";
import { ProjectsClient } from "./_ProjectsClient";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_projects")
    .select(
      "id, title, description, image_path, technologies, github_url, live_url, featured, sort_order"
    )
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Projects</h1>
        <p className="text-sm text-muted">Personal and professional portfolio projects.</p>
      </div>
      <ProjectsClient items={data ?? []} />
    </div>
  );
}
