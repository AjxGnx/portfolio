"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { updateSiteSettings } from "./actions";

type Settings = {
  id: string;
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
};

export function SiteSettingsClient({ settings }: { settings: Settings }) {
  const [form, setForm] = useState({
    name: settings.name,
    title: settings.title,
    short_title: settings.short_title,
    description: settings.description,
    bio: settings.bio,
    email: settings.email,
    linkedin: settings.linkedin,
    github: settings.github,
    location: settings.location,
    github_profile_url: settings.github_profile_url,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateSiteSettings(settings.id, fd);
      if (result.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error);
      }
    });
  };

  const textField = (
    name: keyof typeof form,
    label: string,
    opts?: { placeholder?: string; textarea?: boolean; rows?: number }
  ) => (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {opts?.textarea ? (
        <textarea
          name={name}
          required
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          rows={opts.rows ?? 3}
          placeholder={opts.placeholder}
          className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50 resize-none"
        />
      ) : (
        <input
          name={name}
          required
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          placeholder={opts?.placeholder}
          className="w-full rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-accent/50"
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {textField("name", "Full name", { placeholder: "Your Name" })}
        {textField("location", "Location", { placeholder: "City, Country" })}
      </div>

      {textField("title", "Professional title", {
        placeholder: "Full Stack Developer",
      })}
      {textField("short_title", "Short title", { placeholder: "Developer" })}
      {textField("description", "Description (meta)", {
        textarea: true,
        rows: 2,
        placeholder: "Description for SEO and social media",
      })}
      {textField("bio", "Bio", {
        textarea: true,
        rows: 4,
        placeholder: "Introduction paragraph shown on the portfolio",
      })}
      {textField("email", "Contact email")}

      <div className="border-t border-border/30 pt-4 space-y-4">
        <p className="text-xs font-medium text-muted uppercase tracking-wider">
          Social links
        </p>
        {textField("github", "GitHub username", {
          placeholder: "username",
        })}
        {textField("github_profile_url", "GitHub profile URL", {
          placeholder: "https://github.com/username",
        })}
        {textField("linkedin", "LinkedIn URL", {
          placeholder: "https://linkedin.com/in/username",
        })}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-60 transition-colors"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
