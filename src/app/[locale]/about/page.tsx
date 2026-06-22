import AboutClient from "@/app/[locale]/about/AboutClient";
import {
  getCertifications,
  getEducation,
  getSiteConfig,
  getSkills,
  getWorkExperiences,
} from "@/lib/data/portfolio";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const [siteConfig, skills, experience, education, certifications] =
    await Promise.all([
      getSiteConfig(locale as Locale),
      getSkills(),
      getWorkExperiences(locale as Locale),
      getEducation(locale as Locale),
      getCertifications(locale as Locale),
    ]);

  return (
    <AboutClient
      siteConfig={siteConfig}
      skills={skills}
      experience={experience}
      education={education}
      certifications={certifications}
    />
  );
}
