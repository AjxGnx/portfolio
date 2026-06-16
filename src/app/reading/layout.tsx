import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Reading",
  description:
    "Books recommended by Alirio Gutierrez — software engineering, productivity, and development titles that shaped his career as a backend developer.",
  path: "/reading",
});

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
