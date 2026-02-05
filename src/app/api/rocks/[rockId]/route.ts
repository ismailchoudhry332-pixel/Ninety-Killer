import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: NextRequest, { params }: { params: { rockId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const before = await prisma.rock.findUnique({ where: { id: params.rockId } });
  if (!before) return NextResponse.json({ error: 'Rock not found' }, { status: 404 });

  const body = await req.json();
  const rock = await prisma.rock.update({
    where: { id: params.rockId },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.dueDate !== undefined && { dueDate: body.dueDate ? new Date(body.dueDate) : null }),
      ...(body.ownerId !== undefined && { ownerId: body.ownerId }),
    },
    include: { owner: true, milestones: true },
  });

  await logAudit({
    action: 'UPDATE',
    entityType: 'Rock',
    entityId: rock.id,
    before,
    after: rock,
    userId: user!.id,
  });

  return NextResponse.json(rock);
}

export async function DELETE(req: NextRequest, { params }: { params: { rockId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const before = await prisma.rock.findUnique({ where: { id: params.rockId } });
  if (!before) return NextResponse.json({ error: 'Rock not found' }, { status: 404 });

  await prisma.rock.delete({ where: { id: params.rockId } });

  await logAudit({
    action: 'DELETE',
    entityType: 'Rock',
    entityId: params.rockId,
    before,
    userId: user!.id,
  });

  return NextResponse.json({ success: true });
}
