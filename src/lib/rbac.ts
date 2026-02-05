import { getServerSession } from 'next-auth';
import { authOptions, SessionUser } from './auth';
import { NextResponse } from 'next/server';

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session.user as SessionUser;
}

export function requireRole(user: SessionUser | null, ...roles: string[]) {
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (roles.length > 0 && !roles.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return null;
}

export function canEdit(role: string): boolean {
  return ['ADMIN', 'EDITOR'].includes(role);
}

export function canArchive(role: string): boolean {
  return ['ADMIN', 'ARCHIVER'].includes(role);
}

export function isAdmin(role: string): boolean {
  return role === 'ADMIN';
}
