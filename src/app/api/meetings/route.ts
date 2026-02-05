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
  const status = searchParams.get('status');

  const meetings = await prisma.meeting.findMany({
    where: {
      ...(teamId ? { teamId } : {}),
      ...(status ? { status: status as any } : {}),
    },
    include: {
      team: true,
      _count: {
        select: { todos: true, issues: true, ratings: true },
      },
    },
    orderBy: { meetingDate: 'desc' },
  });
  return NextResponse.json(meetings);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();

  // Enforce: only one active meeting per team
  const activeMeeting = await prisma.meeting.findFirst({
    where: { teamId: body.teamId, status: 'ACTIVE' },
  });
  if (activeMeeting) {
    return NextResponse.json(
      { error: 'Team already has an active meeting. Archive the current one first.' },
      { status: 409 }
    );
  }

  const meeting = await prisma.meeting.create({
    data: {
      title: body.title,
      teamId: body.teamId,
      meetingDate: new Date(body.meetingDate),
      status: 'ACTIVE',
    },
  });

  await logAudit({
    action: 'CREATE',
    entityType: 'Meeting',
    entityId: meeting.id,
    after: meeting,
    userId: user!.id,
    meetingId: meeting.id,
  });

  return NextResponse.json(meeting, { status: 201 });
}
