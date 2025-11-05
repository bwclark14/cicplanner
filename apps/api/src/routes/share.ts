import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import ShortUniqueId from 'short-uuid';

export default (prisma: PrismaClient) => {
  const router = Router();
  const uid = ShortUniqueId();

  router.post('/create', async (req, res) => {
    const { plannerId, expiresInHours = 24 } = req.body;
    // Create simple share token mapping (for demo)
    const token = uid();
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
    await prisma.planners.update({
      where: { id: plannerId },
      data: { metadata: { ...( (await prisma.planners.findUnique({ where: { id: plannerId } }))?.metadata as any || {}), shareToken: token, shareExpiresAt: expiresAt } }
    });
    res.json({ shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/share/${token}`, token, expiresAt });
  });

  router.get('/:token', async (req, res) => {
    const token = req.params.token;
    const p = await prisma.planners.findFirst({ where: { metadata: { path: ['shareToken'], equals: token } }, include: { hexagons: true, connections: true } });
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  });

  return router;
};