import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alirio Gutierrez | Tech Lead & Senior Backend Developer",
    template: "%s | Alirio Gutierrez",
  },
  description:
    "Tech Lead & Senior Backend Developer. Go, Python, Node.js. Building scalable systems at Gipsyy, ex-Rappi, ex-Platzi.",
  authors: [
    { name: "Alirio Gutierrez", url: "https://github.com/AjxGnx" },
  ],
  openGraph: {
    title: "Alirio Gutierrez | Tech Lead & Senior Backend Developer",
    description:
      "Tech Lead & Senior Backend Developer. Go, Python, Node.js. Building scalable systems at Gipsyy, ex-Rappi, ex-Platzi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
