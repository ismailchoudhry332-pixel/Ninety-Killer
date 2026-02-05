import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get('companyId');

  const teams = await prisma.team.findMany({
    where: companyId ? { companyId } : undefined,
    include: {
      company: true,
      _count: { select: { members: true, meetings: true } },
    },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(teams);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const body = await req.json();
  const team = await prisma.team.create({
    data: {
      name: body.name,
      companyId: body.companyId,
    },
  });

  await logAudit({
    action: 'CREATE',
    entityType: 'Team',
    entityId: team.id,
    after: team,
    userId: user!.id,
  });

  return NextResponse.json(team, { status: 201 });
}
