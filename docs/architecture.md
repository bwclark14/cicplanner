Application architecture diagram (text):

[Frontend - Next.js PWA] <--> [Backend API - Express + Prisma] <---> [Postgres (Supabase)]
Auth is handled by Supabase Auth. Frontend uses supabase-js for sign-in and session handling.