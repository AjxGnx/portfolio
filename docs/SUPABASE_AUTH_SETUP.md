# Supabase Auth setup (admin)

Complete these steps in the [Supabase Dashboard](https://supabase.com/dashboard/project/scanphpjyuctnqigzyii) for project **portfolio**.

## 1. Email provider

1. Go to **Authentication → Providers → Email**.
2. Enable **Email** provider.
3. Enable **Confirm email** in production (optional in dev).
4. Keep **Email + password** enabled.

## 2. Disable public sign-up

1. Go to **Authentication → Settings** (or **Sign In / Providers**).
2. Turn off **Allow new users to sign up** so only invited users can register.

## 3. Create admin user

1. Go to **Authentication → Users → Add user**.
2. Email: your admin email (e.g. `alirio1925@gmail.com`).
3. Password: choose a strong password.
4. Check **Auto Confirm User** if email confirmation is enabled.

## 4. Assign admin role

In **Authentication → Users**, open the user → **Edit user** → **App Metadata** (raw JSON):

```json
{
  "role": "admin"
}
```

Or run once with the SQL editor (service role):

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where email = 'your-admin@email.com';
```

## 5. Optional: admin profile row

After first login, insert (as admin via SQL or future admin UI):

```sql
insert into public.admin_profiles (user_id, display_name)
values ('<auth-user-uuid>', 'Alirio Gutierrez');
```

## 6. Environment variables

Copy `.env.example` to `.env.local` and fill values from **Project Settings → API**.

## 7. Redirect URLs (local dev)

**Authentication → URL Configuration**:

- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/**`

Add production URLs when deploying.
