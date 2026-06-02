-- Portfolio schema: enums, tables, indexes, RLS, is_admin()

create type public.book_status as enum ('Read', 'Reading', 'To Read');
create type public.game_status as enum ('Completed', 'Playing', 'Backlog');

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  short_title text not null,
  description text not null,
  bio text not null,
  email text not null,
  linkedin text not null,
  github text not null,
  location text not null,
  github_profile_url text not null,
  updated_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level smallint not null check (level >= 0 and level <= 100),
  category text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  location text,
  description text not null,
  technologies text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.education_entries (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  field text not null,
  period text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_path text not null,
  technologies text[] not null default '{}',
  github_url text not null,
  live_url text not null default '',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  cover_path text not null,
  rating smallint not null check (rating >= 0 and rating <= 5),
  status public.book_status not null,
  review text not null default '',
  category text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  platform text not null,
  genre text not null,
  rating numeric(3, 1) not null check (rating >= 0 and rating <= 10),
  status public.game_status not null,
  image_path text not null,
  review text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  subject text not null check (char_length(subject) between 1 and 300),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- Indexes
create index portfolio_projects_featured_idx on public.portfolio_projects (featured)
  where featured = true;
create index portfolio_projects_sort_order_idx on public.portfolio_projects (sort_order);
create index books_status_idx on public.books (status);
create index books_category_idx on public.books (category);
create index games_status_idx on public.games (status);
create index games_genre_idx on public.games (genre);
create index skills_category_sort_idx on public.skills (category, sort_order);
create index work_experiences_sort_order_idx on public.work_experiences (sort_order);
create index contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index contact_messages_unread_idx on public.contact_messages (read_at)
  where read_at is null;

-- Admin helper (reads app_metadata.role from JWT)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- RLS
alter table public.site_settings enable row level security;
alter table public.skills enable row level security;
alter table public.work_experiences enable row level security;
alter table public.education_entries enable row level security;
alter table public.certifications enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.books enable row level security;
alter table public.games enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admin_profiles enable row level security;

-- Public read on portfolio content
create policy "Public read site_settings" on public.site_settings
  for select to anon, authenticated using (true);
create policy "Public read skills" on public.skills
  for select to anon, authenticated using (true);
create policy "Public read work_experiences" on public.work_experiences
  for select to anon, authenticated using (true);
create policy "Public read education_entries" on public.education_entries
  for select to anon, authenticated using (true);
create policy "Public read certifications" on public.certifications
  for select to anon, authenticated using (true);
create policy "Public read portfolio_projects" on public.portfolio_projects
  for select to anon, authenticated using (true);
create policy "Public read books" on public.books
  for select to anon, authenticated using (true);
create policy "Public read games" on public.games
  for select to anon, authenticated using (true);

-- Admin write on portfolio content
create policy "Admin insert site_settings" on public.site_settings
  for insert to authenticated with check (public.is_admin());
create policy "Admin update site_settings" on public.site_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin delete site_settings" on public.site_settings
  for delete to authenticated using (public.is_admin());

create policy "Admin all skills" on public.skills
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin all work_experiences" on public.work_experiences
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin all education_entries" on public.education_entries
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin all certifications" on public.certifications
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin all portfolio_projects" on public.portfolio_projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin all books" on public.books
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin all games" on public.games
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Contact messages: anon insert only; admin read/update/delete
create policy "Anon insert contact_messages" on public.contact_messages
  for insert to anon, authenticated with check (true);
create policy "Admin select contact_messages" on public.contact_messages
  for select to authenticated using (public.is_admin());
create policy "Admin update contact_messages" on public.contact_messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin delete contact_messages" on public.contact_messages
  for delete to authenticated using (public.is_admin());

-- Admin profiles: admin only
create policy "Admin read own admin_profiles" on public.admin_profiles
  for select to authenticated using (public.is_admin() and user_id = auth.uid());
create policy "Admin insert admin_profiles" on public.admin_profiles
  for insert to authenticated with check (public.is_admin() and user_id = auth.uid());
create policy "Admin update admin_profiles" on public.admin_profiles
  for update to authenticated using (public.is_admin() and user_id = auth.uid())
  with check (public.is_admin() and user_id = auth.uid());
