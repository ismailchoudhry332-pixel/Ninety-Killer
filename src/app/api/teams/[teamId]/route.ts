import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest, { params }: { params: { teamId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user);
  if (authError) return authError;

  const team = await prisma.team.findUnique({
    where: { id: params.teamId },
    include: {
      company: true,
      members: { include: { user: true } },
      meetings: { orderBy: { meetingDate: 'desc' }, take: 10 },
      scorecardMetrics: true,
      rocks: { include: { owner: true } },
    },
  });

  if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 });
  return NextResponse.json(team);
}

export async function PATCH(req: NextRequest, { params }: { params: { teamId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const before = await prisma.team.findUnique({ where: { id: params.teamId } });
  const body = await req.json();

  const team = await prisma.team.update({
    where: { id: params.teamId },
    data: { name: body.name },
  });

  await logAudit({
    action: 'UPDATE',
    entityType: 'Team',
    entityId: team.id,
    before,
    after: team,
    userId: user!.id,
  });

  return NextResponse.json(team);
}

export async function DELETE(req: NextRequest, { params }: { params: { teamId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const before = await prisma.team.findUnique({ where: { id: params.teamId } });
  await prisma.team.delete({ where: { id: params.teamId } });

  await logAudit({
    action: 'DELETE',
    entityType: 'Team',
    entityId: params.teamId,
    before,
    userId: user!.id,
  });

  return NextResponse.json({ success: true });
}
