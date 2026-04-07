import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Alirio Gutierrez for software development projects and collaborations.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
