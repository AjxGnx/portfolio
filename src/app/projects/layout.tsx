import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects by Alirio Gutierrez. Microservices, APIs, and backend solutions with Go, Python, and Node.js.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
