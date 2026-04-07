import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading",
  description: "Books recommended by Alirio Gutierrez. Development, sci-fi, and productivity.",
};

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
