import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Alirio Gutierrez — Tech Lead and Senior Backend Developer with 7+ years of experience at Gipsyy, Rappi, and Platzi. Skills, career, and certifications.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
