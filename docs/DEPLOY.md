```markdown
# Deployment Guide (Vercel + Supabase)

This guide walks through deploying the frontend to Vercel and the backend/DB to Supabase.

1. Create a Supabase project
   - Go to https://app.supabase.com and create a new project.
   - Note the PROJECT URL and ANON KEY and SERVICE ROLE KEY.
   - In Settings → Database → Connection string, copy the connection string (pg) and set as DATABASE_URL.

2. Set environment variables in GitHub / Vercel
   Required variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (server only)
   - DATABASE_URL (server only)
   - NEXT_PUBLIC_APP_URL (e.g., https://your-vercel-domain.vercel.app)

3. Run migrations & seed
   - From a workstation with access to the DATABASE_URL:
     pnpm install
     pnpm migrate
     pnpm seed-db

4. Deploy frontend to Vercel
   - Connect repository to Vercel.
   - Set environment variables in Vercel dashboard (NEXT_PUBLIC_*).
   - Deploy. You can configure build command: `pnpm --filter @cps/web build` and output directory default.

5. Deploy backend
   - For serverless APIs you can rely on functions hosted on Vercel or use Supabase Edge Functions.
   - Alternatively host apps/api on a small Node host (Render, Fly.io) and set env vars.

Optional: One-click deploy
- You can create a Vercel template or Supabase project template. For now follow steps above.

```