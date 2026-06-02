import {
  books as mockBooks,
  certifications as mockCertifications,
  education as mockEducation,
  experience as mockExperience,
  games as mockGames,
  projects as mockProjects,
  siteConfig as mockSiteConfig,
  skills as mockSkills,
} from "@/data/mock";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type {
  Book,
  Certification,
  ContactMessage,
  ContactMessageInput,
  EducationEntry,
  Game,
  PortfolioProject,
  SiteConfig,
  Skill,
  WorkExperience,
} from "@/lib/types/portfolio";

function mapSiteConfig(row: {
  name: string;
  title: string;
  short_title: string;
  description: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  github_profile_url: string;
}): SiteConfig {
  return {
    name: row.name,
    title: row.title,
    shortTitle: row.short_title,
    description: row.description,
    bio: row.bio,
    email: row.email,
    linkedin: row.linkedin,
    github: row.github,
    location: row.location,
    githubProfileUrl: row.github_profile_url,
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!isSupabaseConfigured()) {
    return {
      ...mockSiteConfig,
      githubProfileUrl: mockSiteConfig.github,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    return {
      ...mockSiteConfig,
      githubProfileUrl: mockSiteConfig.github,
    };
  }

  return mapSiteConfig(data);
}

export async function getSkills(): Promise<Skill[]> {
  if (!isSupabaseConfigured()) {
    return mockSkills.map((s, i) => ({
      id: String(i + 1),
      name: s.name,
      level: s.level,
      category: s.category,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("id, name, level, category")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return mockSkills.map((s, i) => ({
      id: String(i + 1),
      name: s.name,
      level: s.level,
      category: s.category,
    }));
  }

  return data;
}

export async function getWorkExperiences(): Promise<WorkExperience[]> {
  if (!isSupabaseConfigured()) {
    return mockExperience.map((e) => ({
      id: String(e.id),
      role: e.role,
      company: e.company,
      period: e.period,
      location: e.location ?? null,
      description: e.description,
      technologies: e.technologies,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work_experiences")
    .select("id, role, company, period, location, description, technologies")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return mockExperience.map((e) => ({
      id: String(e.id),
      role: e.role,
      company: e.company,
      period: e.period,
      location: e.location ?? null,
      description: e.description,
      technologies: e.technologies,
    }));
  }

  return data;
}

export async function getEducation(): Promise<EducationEntry[]> {
  if (!isSupabaseConfigured()) {
    return mockEducation.map((e, i) => ({
      id: String(i + 1),
      institution: e.institution,
      degree: e.degree,
      field: e.field,
      period: e.period,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("education_entries")
    .select("id, institution, degree, field, period")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return mockEducation.map((e, i) => ({
      id: String(i + 1),
      institution: e.institution,
      degree: e.degree,
      field: e.field,
      period: e.period,
    }));
  }

  return data;
}

export async function getCertifications(): Promise<Certification[]> {
  if (!isSupabaseConfigured()) {
    return mockCertifications.map((c, i) => ({
      id: String(i + 1),
      name: c.name,
      issuer: c.issuer,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("id, name, issuer")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return mockCertifications.map((c, i) => ({
      id: String(i + 1),
      name: c.name,
      issuer: c.issuer,
    }));
  }

  return data;
}

export async function getProjects(): Promise<PortfolioProject[]> {
  if (!isSupabaseConfigured()) {
    return mockProjects.map((p) => ({
      id: String(p.id),
      title: p.title,
      description: p.description,
      image: p.image,
      technologies: p.technologies,
      github: p.github,
      live: p.live,
      featured: p.featured,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(
      "id, title, description, image_path, technologies, github_url, live_url, featured"
    )
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return mockProjects.map((p) => ({
      id: String(p.id),
      title: p.title,
      description: p.description,
      image: p.image,
      technologies: p.technologies,
      github: p.github,
      live: p.live,
      featured: p.featured,
    }));
  }

  return data.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image_path,
    technologies: p.technologies,
    github: p.github_url,
    live: p.live_url,
    featured: p.featured,
  }));
}

export async function getBooks(): Promise<Book[]> {
  if (!isSupabaseConfigured()) {
    return mockBooks.map((b) => ({
      id: String(b.id),
      title: b.title,
      author: b.author,
      cover: b.cover,
      rating: b.rating,
      status: b.status,
      review: b.review,
      category: b.category,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("id, title, author, cover_path, rating, status, review, category")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return mockBooks.map((b) => ({
      id: String(b.id),
      title: b.title,
      author: b.author,
      cover: b.cover,
      rating: b.rating,
      status: b.status,
      review: b.review,
      category: b.category,
    }));
  }

  return data.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    cover: b.cover_path,
    rating: b.rating,
    status: b.status,
    review: b.review,
    category: b.category,
  }));
}

export async function getGames(): Promise<Game[]> {
  if (!isSupabaseConfigured()) {
    return mockGames.map((g) => ({
      id: String(g.id),
      title: g.title,
      platform: g.platform,
      genre: g.genre,
      rating: g.rating,
      status: g.status,
      image: g.image,
      review: g.review,
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("games")
    .select("id, title, platform, genre, rating, status, image_path, review")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return mockGames.map((g) => ({
      id: String(g.id),
      title: g.title,
      platform: g.platform,
      genre: g.genre,
      rating: g.rating,
      status: g.status,
      image: g.image,
      review: g.review,
    }));
  }

  return data.map((g) => ({
    id: g.id,
    title: g.title,
    platform: g.platform,
    genre: g.genre,
    rating: Number(g.rating),
    status: g.status,
    image: g.image_path,
    review: g.review,
  }));
}

export async function insertContactMessage(
  input: ContactMessageInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
  });

  if (error) {
    return { ok: false, error: "Failed to send message. Please try again." };
  }

  return { ok: true };
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, message, created_at, read_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    createdAt: m.created_at,
    readAt: m.read_at,
  }));
}

export async function markContactMessageRead(
  id: string
): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured()) return { ok: false };

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id);

  return { ok: !error };
}

export async function getUnreadMessageCount(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .is("read_at", null);

  if (error) return 0;
  return count ?? 0;
}
