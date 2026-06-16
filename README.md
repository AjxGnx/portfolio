# Portfolio

Personal site for **Alirio Gutierrez** — senior backend developer and tech lead.

**Live:** [aliriogutierrez.com](https://www.aliriogutierrez.com) · **Repo:** [github.com/AjxGnx/portfolio](https://github.com/AjxGnx/portfolio)

## Pages

- **Home** — hero, highlights, and skill bars
- **Projects** — featured work and tech stack
- **Reading** — books I recommend
- **Gaming** — games I play
- **About** — background and experience
- **Contact** — get in touch

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, and Supabase for content and auth. Without Supabase env vars, the app falls back to static data in `src/data/mock.ts`.

## Local development

**Requirements:** Node.js 20+

```bash
git clone https://github.com/AjxGnx/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # optional — only needed for Supabase-backed content
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # run production server locally
npm run lint    # ESLint
```

---

**AI First** — developed and iterated with AI-assisted workflows as part of how this codebase evolves.
