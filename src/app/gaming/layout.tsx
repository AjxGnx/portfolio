import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaming",
  description: "Favorite video games by Alirio Gutierrez. RPGs, metroidvanias, roguelikes, and more.",
};

export default function GamingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
