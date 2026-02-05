import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get('teamId');

  const metrics = await prisma.scorecardMetric.findMany({
    where: teamId ? { teamId } : undefined,
    include: { team: true, entries: { orderBy: { createdAt: 'desc' }, take: 13 } },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(metrics);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();
  const metric = await prisma.scorecardMetric.create({
    data: {
      name: body.name,
      description: body.description,
      target: body.target,
      unit: body.unit,
      teamId: body.teamId,
    },
  });

  await logAudit({
    action: 'CREATE',
    entityType: 'ScorecardMetric',
    entityId: metric.id,
    after: metric,
    userId: user!.id,
  });

  return NextResponse.json(metric, { status: 201 });
}
