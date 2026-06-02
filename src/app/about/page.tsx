import AboutClient from "@/app/about/AboutClient";
import {
  getCertifications,
  getEducation,
  getSiteConfig,
  getSkills,
  getWorkExperiences,
} from "@/lib/data/portfolio";

export default async function AboutPage() {
  const [siteConfig, skills, experience, education, certifications] =
    await Promise.all([
      getSiteConfig(),
      getSkills(),
      getWorkExperiences(),
      getEducation(),
      getCertifications(),
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
