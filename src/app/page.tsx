import HomeClient from "@/app/HomeClient";
import { getSiteConfig, getSkills } from "@/lib/data/portfolio";

export default async function Home() {
  const [siteConfig, skills] = await Promise.all([getSiteConfig(), getSkills()]);
  const topSkills = skills.slice(0, 8);

  return <HomeClient siteConfig={siteConfig} topSkills={topSkills} />;
}
