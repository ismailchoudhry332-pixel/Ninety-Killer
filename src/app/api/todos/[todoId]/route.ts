import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';
import { UpdateTodoSchema } from '@/lib/validations/todo';

export async function PATCH(req: NextRequest, { params }: { params: { todoId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const before = await prisma.todo.findUnique({
    where: { id: params.todoId },
    include: { meeting: true },
  });
  if (!before) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  if (before.meeting.status === 'ARCHIVED') {
    return NextResponse.json({ error: 'Cannot modify todos in archived meetings' }, { status: 400 });
  }

  let json;
  try {
    json = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const validation = UpdateTodoSchema.safeParse(json);

  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid request body', details: validation.error.format() },
      { status: 400 }
    );
  }

  const body = validation.data;

  const todo = await prisma.todo.update({
    where: { id: params.todoId },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      dueDate: body.dueDate ? new Date(body.dueDate) : (body.dueDate === null ? null : undefined),
      ownerId: body.ownerId,
    },
    include: { owner: true },
  });

  await logAudit({
    action: 'UPDATE',
    entityType: 'Todo',
    entityId: todo.id,
    before,
    after: todo,
    userId: user!.id,
    meetingId: before.meetingId,
  });

  return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest, { params }: { params: { todoId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const before = await prisma.todo.findUnique({
    where: { id: params.todoId },
    include: { meeting: true },
  });
  if (!before) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  if (before.meeting.status === 'ARCHIVED') {
    return NextResponse.json({ error: 'Cannot delete todos from archived meetings' }, { status: 400 });
  }

  await prisma.todo.delete({ where: { id: params.todoId } });

  await logAudit({
    action: 'DELETE',
    entityType: 'Todo',
    entityId: params.todoId,
    before,
    userId: user!.id,
    meetingId: before.meetingId,
  });

  return NextResponse.json({ success: true });
}
