import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getSiteConfig } from "@/lib/data/portfolio";
import { rootMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/site";
import "./globals.css";

export const metadata = rootMetadata;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: SITE_URL,
    image: `${SITE_URL}/hero.jpg`,
    jobTitle: siteConfig.shortTitle,
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: [
      "Go",
      "Python",
      "Node.js",
      "Microservices",
      "Apache Kafka",
      "PostgreSQL",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
