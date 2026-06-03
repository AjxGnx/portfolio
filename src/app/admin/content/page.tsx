import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Gamepad2,
  GraduationCap,
  Settings,
  Star,
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    href: "/admin/content/skills",
    icon: Star,
    label: "Skills",
    description: "Technical skills and proficiency levels",
  },
  {
    href: "/admin/content/work",
    icon: Briefcase,
    label: "Work experience",
    description: "Jobs, roles and technologies used",
  },
  {
    href: "/admin/content/education",
    icon: GraduationCap,
    label: "Education",
    description: "Degrees and academic background",
  },
  {
    href: "/admin/content/certifications",
    icon: Award,
    label: "Certifications",
    description: "Certificates and professional credentials",
  },
  {
    href: "/admin/content/projects",
    icon: FileText,
    label: "Projects",
    description: "Portfolio projects",
  },
  {
    href: "/admin/content/books",
    icon: BookOpen,
    label: "Books",
    description: "Reading list and reviews",
  },
  {
    href: "/admin/content/games",
    icon: Gamepad2,
    label: "Games",
    description: "Games and reviews",
  },
  {
    href: "/admin/content/site-settings",
    icon: Settings,
    label: "Site settings",
    description: "Name, bio, email and social links",
  },
];

export default async function ContentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Content editor</h1>
      <p className="text-muted text-sm mb-8">
        Manage your portfolio content directly from here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ href, icon: Icon, label, description }) => (
          <Link
            key={href}
            href={href}
            className="glass rounded-2xl p-6 hover:border-accent/30 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent/10 p-3 shrink-0">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {label}
                </h2>
                <p className="text-sm text-muted mt-1">{description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
