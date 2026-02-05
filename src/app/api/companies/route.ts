import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function GET() {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'BOARD');
  if (authError) return authError;

  const companies = await prisma.company.findMany({
    include: { teams: true, _count: { select: { users: true } } },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(companies);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const body = await req.json();
  const company = await prisma.company.create({
    data: { name: body.name },
  });

  await logAudit({
    action: 'CREATE',
    entityType: 'Company',
    entityId: company.id,
    after: company,
    userId: user!.id,
  });

  return NextResponse.json(company, { status: 201 });
}
