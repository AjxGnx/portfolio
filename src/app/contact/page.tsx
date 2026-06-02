import ContactClient from "@/app/contact/ContactClient";
import { getSiteConfig } from "@/lib/data/portfolio";

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  return <ContactClient siteConfig={siteConfig} />;
}
