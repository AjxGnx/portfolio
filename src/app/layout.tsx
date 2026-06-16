import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { rootMetadata } from "@/lib/seo/metadata";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
} from "@/lib/seo/site";
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/hero.jpg`,
  jobTitle: "Tech Lead & Senior Backend Developer",
  description: DEFAULT_DESCRIPTION,
  email: SOCIAL.email,
  sameAs: [SOCIAL.github, SOCIAL.linkedin],
  knowsAbout: [
    "Go",
    "Python",
    "Node.js",
    "Microservices",
    "Apache Kafka",
    "PostgreSQL",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Gipsyy",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: {
    "@type": "Person",
    name: SITE_NAME,
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
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
