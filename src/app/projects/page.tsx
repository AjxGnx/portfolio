import ProjectsClient from "@/app/projects/ProjectsClient";
import { getProjects } from "@/lib/data/portfolio";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
