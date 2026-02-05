import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();

  const meeting = await prisma.meeting.findUnique({ where: { id: body.meetingId } });
  if (!meeting || meeting.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Can only add entries to active meetings' }, { status: 400 });
  }

  const metric = await prisma.scorecardMetric.findUnique({ where: { id: body.metricId } });
  if (!metric) return NextResponse.json({ error: 'Metric not found' }, { status: 404 });

  // Server-side status calculation
  const status = body.actual >= metric.target ? 'ON_TRACK' : body.actual >= metric.target * 0.8 ? 'OFF_TRACK' : 'MISSED';

  const entry = await prisma.scorecardEntry.upsert({
    where: { metricId_meetingId: { metricId: body.metricId, meetingId: body.meetingId } },
    create: {
      actual: body.actual,
      status,
      metricId: body.metricId,
      meetingId: body.meetingId,
    },
    update: {
      actual: body.actual,
      status,
    },
    include: { metric: true },
  });

  await logAudit({
    action: 'UPDATE',
    entityType: 'ScorecardEntry',
    entityId: entry.id,
    after: entry,
    userId: user!.id,
    meetingId: body.meetingId,
  });

  return NextResponse.json(entry);
}
