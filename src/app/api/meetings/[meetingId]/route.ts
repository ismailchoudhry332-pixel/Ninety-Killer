import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';

export async function GET(req: NextRequest, { params }: { params: { meetingId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user);
  if (authError) return authError;

  const meeting = await prisma.meeting.findUnique({
    where: { id: params.meetingId },
    include: {
      team: { include: { members: { include: { user: true } } } },
      todos: { include: { owner: true, carriedFrom: true } },
      issues: { include: { creator: true, owner: true, carriedFrom: true } },
      ratings: { include: { user: true } },
      scorecardEntries: { include: { metric: true } },
      aiDrafts: { orderBy: { createdAt: 'desc' } },
      previousMeeting: true,
      nextMeeting: true,
    },
  });

  if (!meeting) return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  return NextResponse.json(meeting);
}
