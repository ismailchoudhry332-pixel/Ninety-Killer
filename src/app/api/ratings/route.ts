import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get('meetingId');

  const ratings = await prisma.rating.findMany({
    where: meetingId ? { meetingId } : undefined,
    include: { user: true },
  });
  return NextResponse.json(ratings);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();

  if (body.score < 1 || body.score > 10) {
    return NextResponse.json({ error: 'Rating must be between 1 and 10' }, { status: 400 });
  }

  const meeting = await prisma.meeting.findUnique({ where: { id: body.meetingId } });
  if (!meeting || meeting.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Can only rate active meetings' }, { status: 400 });
  }

  const rating = await prisma.rating.upsert({
    where: { userId_meetingId: { userId: user!.id, meetingId: body.meetingId } },
    create: {
      score: body.score,
      userId: user!.id,
      meetingId: body.meetingId,
    },
    update: { score: body.score },
    include: { user: true },
  });

  await logAudit({
    action: 'UPDATE',
    entityType: 'Rating',
    entityId: rating.id,
    after: rating,
    userId: user!.id,
    meetingId: body.meetingId,
  });

  return NextResponse.json(rating);
}
