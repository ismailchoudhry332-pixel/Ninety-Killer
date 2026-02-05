import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: NextRequest, { params }: { params: { issueId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const before = await prisma.issue.findUnique({
    where: { id: params.issueId },
    include: { meeting: true },
  });
  if (!before) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  if (before.meeting.status === 'ARCHIVED') {
    return NextResponse.json({ error: 'Cannot modify issues in archived meetings' }, { status: 400 });
  }

  const body = await req.json();
  const issue = await prisma.issue.update({
    where: { id: params.issueId },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.priority !== undefined && { priority: body.priority }),
      ...(body.ownerId !== undefined && { ownerId: body.ownerId }),
    },
    include: { creator: true, owner: true },
  });

  await logAudit({
    action: 'UPDATE',
    entityType: 'Issue',
    entityId: issue.id,
    before,
    after: issue,
    userId: user!.id,
    meetingId: before.meetingId,
  });

  return NextResponse.json(issue);
}

export async function DELETE(req: NextRequest, { params }: { params: { issueId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const before = await prisma.issue.findUnique({
    where: { id: params.issueId },
    include: { meeting: true },
  });
  if (!before) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  if (before.meeting.status === 'ARCHIVED') {
    return NextResponse.json({ error: 'Cannot delete issues from archived meetings' }, { status: 400 });
  }

  await prisma.issue.delete({ where: { id: params.issueId } });

  await logAudit({
    action: 'DELETE',
    entityType: 'Issue',
    entityId: params.issueId,
    before,
    userId: user!.id,
    meetingId: before.meetingId,
  });

  return NextResponse.json({ success: true });
}
