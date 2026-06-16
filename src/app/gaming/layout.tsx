import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Gaming",
  description:
    "Favorite video games by Alirio Gutierrez — RPGs, metroidvanias, roguelikes, and epic adventures enjoyed outside of building backend systems.",
  path: "/gaming",
});

export default function GamingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
