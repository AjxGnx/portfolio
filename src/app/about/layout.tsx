import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Alirio Gutierrez, his experience and skills as a software developer.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
