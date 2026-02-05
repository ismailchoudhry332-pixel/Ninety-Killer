import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { archiveMeeting } from '@/lib/meeting-lifecycle';

export async function POST(req: NextRequest, { params }: { params: { meetingId: string } }) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'ARCHIVER');
  if (authError) return authError;

  try {
    const result = await archiveMeeting(params.meetingId, user!.id);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Archive failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
