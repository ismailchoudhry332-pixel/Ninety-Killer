import prisma from './prisma';
import { AuditAction } from '@prisma/client';

export async function logAudit({
  action,
  entityType,
  entityId,
  before,
  after,
  userId,
  meetingId,
}: {
  action: AuditAction;
  entityType: string;
  entityId: string;
  before?: any;
  after?: any;
  userId: string;
  meetingId?: string;
}) {
  return prisma.auditLog.create({
    data: {
      action,
      entityType,
      entityId,
      before: before ?? undefined,
      after: after ?? undefined,
      userId,
      meetingId: meetingId ?? undefined,
    },
  });
}
