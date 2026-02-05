import prisma from './prisma';
import { logAudit } from './audit';
import { addDays } from 'date-fns';

/**
 * Archives a meeting with full transactional integrity:
 * 1. Validates all ratings are submitted
 * 2. Locks the meeting (status → ARCHIVED)
 * 3. Creates the next meeting
 * 4. Carries forward unresolved todos and issues
 */
export async function archiveMeeting(meetingId: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    // 1. Load the meeting with all related data
    const meeting = await tx.meeting.findUnique({
      where: { id: meetingId },
      include: {
        team: { include: { members: true } },
        todos: true,
        issues: true,
        ratings: true,
      },
    });

    if (!meeting) throw new Error('Meeting not found');
    if (meeting.status === 'ARCHIVED') throw new Error('Meeting is already archived');

    // 2. Validate ratings: every team member must have rated
    const memberIds = meeting.team.members.map(m => m.userId);
    const ratedUserIds = meeting.ratings.map(r => r.userId);
    const missingRatings = memberIds.filter(id => !ratedUserIds.includes(id));
    if (missingRatings.length > 0) {
      throw new Error(`Missing ratings from ${missingRatings.length} team member(s). All members must rate before archiving.`);
    }

    // 3. Archive the meeting
    const archivedMeeting = await tx.meeting.update({
      where: { id: meetingId },
      data: {
        status: 'ARCHIVED',
        archivedAt: new Date(),
      },
    });

    // 4. Create next meeting
    const nextMeetingDate = addDays(meeting.meetingDate, 7);
    const nextMeeting = await tx.meeting.create({
      data: {
        title: `${meeting.team.name} - Weekly ${nextMeetingDate.toISOString().split('T')[0]}`,
        teamId: meeting.teamId,
        status: 'ACTIVE',
        meetingDate: nextMeetingDate,
        previousMeetingId: meeting.id,
      },
    });

    // 5. Carry forward unfinished todos
    const todosToCarry = meeting.todos.filter(
      t => t.status === 'CARRY_FORWARD' || (t.status !== 'DONE' && t.dueDate && new Date(t.dueDate) < new Date())
    );
    for (const todo of todosToCarry) {
      await tx.todo.create({
        data: {
          title: todo.title,
          description: todo.description,
          status: 'NOT_STARTED',
          dueDate: todo.dueDate ? addDays(new Date(todo.dueDate), 7) : null,
          ownerId: todo.ownerId,
          meetingId: nextMeeting.id,
          carriedFromId: todo.id,
        },
      });
    }

    // 6. Carry forward unresolved issues
    const issuesToCarry = meeting.issues.filter(
      i => i.status === 'CARRY_FORWARD' || (i.status !== 'SOLVED')
    );
    for (const issue of issuesToCarry) {
      await tx.issue.create({
        data: {
          title: issue.title,
          description: issue.description,
          status: 'OPEN',
          priority: issue.priority,
          creatorId: issue.creatorId,
          ownerId: issue.ownerId,
          meetingId: nextMeeting.id,
          carriedFromId: issue.id,
        },
      });
    }

    // 7. Audit log
    await tx.auditLog.create({
      data: {
        action: 'ARCHIVE',
        entityType: 'Meeting',
        entityId: meetingId,
        before: { status: 'ACTIVE' },
        after: {
          status: 'ARCHIVED',
          nextMeetingId: nextMeeting.id,
          carriedTodos: todosToCarry.length,
          carriedIssues: issuesToCarry.length,
        },
        userId,
        meetingId,
      },
    });

    return {
      archivedMeeting,
      nextMeeting,
      carriedTodos: todosToCarry.length,
      carriedIssues: issuesToCarry.length,
    };
  });
}
