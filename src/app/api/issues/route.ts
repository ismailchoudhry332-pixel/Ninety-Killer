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

  const issues = await prisma.issue.findMany({
    where: meetingId ? { meetingId } : undefined,
    include: { creator: true, owner: true, meeting: true, carriedFrom: true },
    orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
  });
  return NextResponse.json(issues);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();

  const meeting = await prisma.meeting.findUnique({ where: { id: body.meetingId } });
  if (!meeting || meeting.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Can only add issues to active meetings' }, { status: 400 });
  }

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status || 'OPEN',
      priority: body.priority || 'MEDIUM',
      creatorId: user!.id,
      ownerId: body.ownerId || null,
      meetingId: body.meetingId,
    },
    include: { creator: true, owner: true },
  });

  await logAudit({
    action: 'CREATE',
    entityType: 'Issue',
    entityId: issue.id,
    after: issue,
    userId: user!.id,
    meetingId: body.meetingId,
  });

  return NextResponse.json(issue, { status: 201 });
}
