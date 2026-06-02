import type { BookStatus, GameStatus } from "@/lib/supabase/database.types";

export type SiteConfig = {
  name: string;
  title: string;
  shortTitle: string;
  description: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  githubProfileUrl: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
  category: string;
};

export type WorkExperience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string | null;
  description: string;
  technologies: string[];
};

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  featured: boolean;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  status: BookStatus;
  review: string;
  category: string;
};

export type Game = {
  id: string;
  title: string;
  platform: string;
  genre: string;
  rating: number;
  status: GameStatus;
  image: string;
  review: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  readAt: string | null;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
