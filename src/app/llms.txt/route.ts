import { getSiteConfig, getSkills } from "@/lib/data/portfolio";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/seo/site";

export const revalidate = 86400;

const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": "Home page with hero, about section, tech stack, and highlights",
  "/about": "Full professional profile, work experience, and complete skill set",
  "/projects": "Portfolio of backend and full-stack engineering projects",
  "/reading": "Books read — technical reads, dev books, and personal growth",
  "/gaming": "Gaming collection — RPGs, metroidvanias, and open-world games",
  "/contact": "Contact form to get in touch",
};

export async function GET() {
  const [siteConfig, skills] = await Promise.all([
    getSiteConfig(),
    getSkills(),
  ]);

  const stackList = skills.map((s) => s.name).join(", ");

  const pages = PUBLIC_ROUTES.map((path) => {
    const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
    const desc = PAGE_DESCRIPTIONS[path] ?? "";
    return `- [${url}](${url})${desc ? `: ${desc}` : ""}`;
  }).join("\n");

  const body = `# ${siteConfig.name} — ${siteConfig.shortTitle}

> ${siteConfig.description}

${siteConfig.bio}

## Details

- Location: ${siteConfig.location}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}
- Stack: ${stackList}

## Pages

${pages}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
