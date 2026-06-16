import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Alirio Gutierrez for software development projects, tech leadership roles, and collaborations. Based in Bogotá, Colombia — available for remote work.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
