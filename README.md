```markdown
# Curriculum Planner Scotland

An online tool for teachers to browse and plan Scottish curriculum "know and do" statements with an interactive hexagonal planner.

This monorepo contains:
- apps/web — Next.js + TypeScript + Tailwind PWA frontend
- apps/api — Node + TypeScript API server + Prisma (connects to Supabase/Postgres)
- prisma — schema & migrations (inside apps/api)
- scripts — seeding and utilities
- docs — architecture, data-models, API docs, accessibility, seed data

Highlights:
- Touch-friendly hexagonal planner (drag, connect, explode to show know/do)
- Supabase/Postgres authentication and DB (works with Prisma)
- Save/open planners per user
- Export planner to PDF (client-side html2pdf)
- Responsive PWA optimized for iPad + Desktop

Quick links:
- Local dev: pnpm install && pnpm dev
- Seed DB: pnpm seed-db
- Tests: pnpm test
- Deploy: See Deploy section below

Screenshots / GIFs:
- docs/screenshots/placeholder-dashboard.png (placeholder)
- docs/screenshots/placeholder-planner.gif (placeholder)

---

## Architecture Overview

- Frontend (apps/web): Next.js app (TypeScript), Tailwind CSS, PWA manifest & service worker, uses Supabase client for auth and API.
- Backend (apps/api): Express/fastify-like serverless API using TypeScript and Prisma ORM connecting to Postgres (Supabase recommended). Handles planners CRUD, PDF share links, and orchestrates secure access.
- Database: Postgres (hosted via Supabase). Prisma migrations & seed script included.

---

## Requirements

- Node.js 18+ and pnpm
- A Supabase project (or any Postgres with required env vars)
- Environment variables (see .env.example)

---

## Local Development

1. Clone
   git clone https://github.com/YOUR-ORG/Curriculum-Planner-Scotland.git
   cd Curriculum-Planner-Scotland

2. Install
   pnpm install

3. Copy env
   cp .env.example .env

4. Configure .env (see .env.example). For local dev you can use:
   - Use Supabase free project
   - Set DATABASE_URL to Supabase Postgres URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY from Supabase

5. Migrate & seed
   pnpm migrate
   pnpm seed-db

6. Start dev environment
   pnpm dev
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000 (see apps/api)

7. Sign up with email and start creating planners.

---

## Production Deploy (Vercel + Supabase recommended)

Detailed steps are in docs/DEPLOY.md. Summary:
1. Create Supabase project and copy:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - DATABASE_URL (Postgres connection string)
2. In Github repository, add secrets / environment variables for Actions & Vercel.
3. Deploy apps/web to Vercel (connect repo). Set environment variables as NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (if used in serverless).
4. Run migrations on Supabase (pnpm migrate) then seed (pnpm seed-db).
5. Optionally set up a custom domain and configure TLS.

There's a detailed checklist at the end of this README and in docs/DEPLOY.md.

---

## Project Scripts

Root-level scripts:
- pnpm dev — runs both frontend & backend in dev concurrently
- pnpm build — builds frontend & backend
- pnpm start — starts both (prod)
- pnpm migrate — runs Prisma migrations against DATABASE_URL
- pnpm seed-db — seeds the database with mock data
- pnpm test — runs tests

Per-app scripts are in apps/web/package.json and apps/api/package.json.

---

## Data Model

See docs/data-model.md for diagrams and schema. Prisma schema is at apps/api/prisma/schema.prisma.

Key tables:
- curriculum_areas, subjects, big_ideas, concepts, know_do_statements
- users, planners, hexagons, hexagon_connections

---

## Tests & CI

- Tests use Jest and React Testing Library for frontend, and Jest + supertest for API.
- GitHub Actions workflow at .github/workflows/ci.yml runs lint, tests, and build.

---

## Accessibility

Accessibility statement and keyboard/touch gestures in docs/ACCESSIBILITY.md. App designed with large touch targets and ARIA roles.

---

## Contributing

See CONTRIBUTING.md (TODO).

---

## License

MIT — see LICENSE file.

---

Deployment Checklist

See docs/DEPLOY.md (end of README includes a short checklist).

```