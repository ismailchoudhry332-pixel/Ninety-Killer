import { getServerSession } from 'next-auth';
import { authOptions, SessionUser } from './auth';
import { NextResponse } from 'next/server';
import prisma from './prisma';

export async function getSessionUser(): Promise<SessionUser | null> {
  // In development without OAuth configured, fall back to the first admin user
  if (process.env.NODE_ENV === 'development' && !process.env.GOOGLE_CLIENT_ID) {
    const devUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      select: { id: true, email: true, name: true, image: true, role: true, companyId: true },
    });
    if (devUser) {
      return {
        id: devUser.id,
        email: devUser.email,
        name: devUser.name ?? undefined,
        image: devUser.image ?? undefined,
        role: devUser.role,
        companyId: devUser.companyId,
      };
    }
  }

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
