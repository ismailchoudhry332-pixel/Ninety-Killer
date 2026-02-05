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

  const rocks = await prisma.rock.findMany({
    where: teamId ? { teamId } : undefined,
    include: { owner: true, team: true, milestones: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(rocks);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();
  const rock = await prisma.rock.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status || 'ON_TRACK',
      ownerId: body.ownerId,
      teamId: body.teamId,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    },
    include: { owner: true, milestones: true },
  });

  await logAudit({
    action: 'CREATE',
    entityType: 'Rock',
    entityId: rock.id,
    after: rock,
    userId: user!.id,
  });

  return NextResponse.json(rock, { status: 201 });
}
