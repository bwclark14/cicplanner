import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import plannersRouter from './routes/planners';
import curriculumRouter from './routes/curriculum';
import authRouter from './routes/auth';
import shareRouter from './routes/share';

dotenv.config();
const app = express();
const port = process.env.API_PORT ?? 4000;
const prisma = new PrismaClient();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/planners', plannersRouter(prisma));
app.use('/api/curriculum', curriculumRouter(prisma));
app.use('/api/auth', authRouter());
app.use('/api/share', shareRouter(prisma));

app.get('/', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

export default app;