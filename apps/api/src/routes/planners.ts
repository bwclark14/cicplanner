import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

export default (prisma: PrismaClient) => {
  const router = Router();

  const PlannerPayload = z.object({
    user_id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    metadata: z.any().optional(),
    hexagons: z.array(z.any()).optional(),
    connections: z.array(z.any()).optional()
  });

  // Create a new planner
  router.post('/', async (req, res) => {
    try {
      const payload = PlannerPayload.parse(req.body);
      if (!payload.user_id) return res.status(400).json({ error: 'user_id required' });
      const planner = await prisma.planners.create({
        data: {
          user_id: payload.user_id,
          title: payload.title ?? 'Untitled Planner',
          description: payload.description,
          metadata: payload.metadata
        }
      });
      // create hexagons/connections if provided
      if (payload.hexagons && payload.hexagons.length) {
        await prisma.hexagons.createMany({
          data: payload.hexagons.map((h: any) => ({
            planner_id: planner.id,
            x: Number(h.x ?? 0),
            y: Number(h.y ?? 0),
            size: Number(h.size ?? 1),
            label: h.label ?? null,
            concept_id: h.concept_id ?? null,
            free_text: h.free_text ?? null,
            settings: h.settings ?? {}
          }))
        });
      }
      if (payload.connections && payload.connections.length) {
        await prisma.hexagon_connections.createMany({
          data: payload.connections.map((c: any) => ({
            planner_id: planner.id,
            from_hexagon_id: c.from_hexagon_id,
            to_hexagon_id: c.to_hexagon_id,
            label: c.label ?? null
          }))
        });
      }

      const created = await prisma.planners.findUnique({ where: { id: planner.id }, include: { hexagons: true, connections: true } });
      res.json(created);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  // Get planner by id
  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const planner = await prisma.planners.findUnique({
      where: { id },
      include: { hexagons: true, connections: true }
    });
    if (!planner) return res.status(404).json({ error: 'Not found' });
    res.json(planner);
  });

  // Update planner and replace hexagons/connections atomically
  router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = PlannerPayload.parse(req.body);

      // update metadata/title/desc
      const updated = await prisma.planners.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          metadata: data.metadata
        }
      });

      // Replace hexagons and connections
      if (data.hexagons) {
        await prisma.hexagon_connections.deleteMany({ where: { planner_id: id } });
        await prisma.hexagons.deleteMany({ where: { planner_id: id } });

        // create with provided ids if present
        for (const h of data.hexagons) {
          await prisma.hexagons.create({
            data: {
              id: h.id,
              planner_id: id,
              x: Number(h.x ?? 0),
              y: Number(h.y ?? 0),
              size: Number(h.size ?? 1),
              label: h.label ?? null,
              concept_id: h.concept_id ?? null,
              free_text: h.free_text ?? null,
              settings: h.settings ?? {}
            }
          });
        }
      }

      if (data.connections) {
        for (const c of data.connections) {
          await prisma.hexagon_connections.create({
            data: {
              id: c.id,
              planner_id: id,
              from_hexagon_id: c.from_hexagon_id,
              to_hexagon_id: c.to_hexagon_id,
              label: c.label ?? null
            }
          });
        }
      }

      const planner = await prisma.planners.findUnique({ where: { id }, include: { hexagons: true, connections: true } });
      res.json(planner);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  // Delete planner
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await prisma.hexagon_connections.deleteMany({ where: { planner_id: id } });
    await prisma.hexagons.deleteMany({ where: { planner_id: id } });
    await prisma.planners.delete({ where: { id } });
    res.json({ ok: true });
  });

  // Return planners for current user (demo-friendly). In prod check session.
  router.get('/my', async (req, res) => {
    try {
      const user_id = String(req.query.user_id || '');
      if (user_id) {
        const planners = await prisma.planners.findMany({ where: { user_id }, include: { hexagons: true, connections: true } });
        return res.json(planners);
      }
      // Fallback: return first user planners (seed demo)
      const user = await prisma.users.findFirst();
      if (!user) return res.json([]);
      const planners = await prisma.planners.findMany({ where: { user_id: user.id }, include: { hexagons: true, connections: true } });
      res.json(planners);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  return router;
};