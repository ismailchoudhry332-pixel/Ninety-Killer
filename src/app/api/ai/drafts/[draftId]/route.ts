import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';

export async function PATCH(req: NextRequest, { params }: { params: { draftId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();

  const draft = await prisma.aiDraft.findUnique({ where: { id: params.draftId } });
  if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
  if (draft.status !== 'PENDING') {
    return NextResponse.json({ error: 'Draft already processed' }, { status: 400 });
  }

  const status = body.action === 'apply' ? 'APPLIED' : 'REJECTED';

  const updated = await prisma.aiDraft.update({
    where: { id: params.draftId },
    data: { status },
  });

  await logAudit({
    action: 'AI_APPLY',
    entityType: 'AiDraft',
    entityId: draft.id,
    before: { status: 'PENDING' },
    after: { status },
    userId: user!.id,
    meetingId: draft.meetingId,
  });

  return NextResponse.json(updated);
}
