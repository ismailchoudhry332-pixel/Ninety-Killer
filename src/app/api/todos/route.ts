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

  const todos = await prisma.todo.findMany({
    where: meetingId ? { meetingId } : undefined,
    include: { owner: true, meeting: true, carriedFrom: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();

  // Verify meeting is active
  const meeting = await prisma.meeting.findUnique({ where: { id: body.meetingId } });
  if (!meeting || meeting.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Can only add todos to active meetings' }, { status: 400 });
  }

  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status || 'NOT_STARTED',
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      ownerId: body.ownerId,
      meetingId: body.meetingId,
    },
    include: { owner: true },
  });

  await logAudit({
    action: 'CREATE',
    entityType: 'Todo',
    entityId: todo.id,
    after: todo,
    userId: user!.id,
    meetingId: body.meetingId,
  });

  return NextResponse.json(todo, { status: 201 });
}
