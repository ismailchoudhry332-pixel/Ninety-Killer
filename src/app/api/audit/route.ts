import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN');
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get('meetingId');
  const entityType = searchParams.get('entityType');
  const entityId = searchParams.get('entityId');
  const limit = parseInt(searchParams.get('limit') || '50');

  const logs = await prisma.auditLog.findMany({
    where: {
      ...(meetingId ? { meetingId } : {}),
      ...(entityType ? { entityType } : {}),
      ...(entityId ? { entityId } : {}),
    },
    include: { user: true, meeting: true },
    orderBy: { createdAt: 'desc' },
    take: Math.min(limit, 200),
  });
  return NextResponse.json(logs);
}
