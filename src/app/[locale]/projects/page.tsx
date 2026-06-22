import ProjectsClient from "@/app/[locale]/projects/ProjectsClient";
import { getProjects } from "@/lib/data/portfolio";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const projects = await getProjects(locale as Locale);
  return <ProjectsClient projects={projects} />;
}
