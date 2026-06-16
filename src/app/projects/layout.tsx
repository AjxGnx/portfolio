import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Software projects by Alirio Gutierrez — microservices, event-driven systems, and backend platforms built with Go, Python, Node.js, Kafka, and PostgreSQL.",
  path: "/projects",
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
