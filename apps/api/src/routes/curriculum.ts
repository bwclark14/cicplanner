import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export default (prisma: PrismaClient) => {
  const router = Router();

  router.get('/areas', async (req, res) => {
    const areas = await prisma.curriculum_areas.findMany({
      include: { subjects: { include: { big_ideas: { include: { concepts: true } } } } }
    });
    res.json(areas);
  });

  router.get('/concepts', async (req, res) => {
    const level = Number(req.query.level) || undefined;
    const where: any = {};
    if (level) where.level = level;
    const concepts = await prisma.concepts.findMany({
      where,
      include: { know_do_statements: true, big_idea: true }
    });
    res.json(concepts);
  });

  router.get('/concept/:id', async (req, res) => {
    const id = req.params.id;
    const c = await prisma.concepts.findUnique({ where: { id }, include: { know_do_statements: true, big_idea: true } });
    if (!c) return res.status(404).json({ error: 'Not found' });
    res.json(c);
  });

  return router;
};