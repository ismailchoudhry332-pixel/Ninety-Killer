import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';

export async function GET() {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'BOARD');
  if (authError) return authError;

  const companies = await prisma.company.findMany({
    include: {
      teams: {
        include: {
          meetings: {
            orderBy: { meetingDate: 'desc' },
            take: 13,
            include: {
              ratings: true,
              todos: true,
              issues: true,
            },
          },
          rocks: true,
          _count: { select: { members: true } },
        },
      },
    },
  });

  const dashboard = companies.map(company => {
    const teams = company.teams.map(team => {
      const recentMeetings = team.meetings;
      const activeMeeting = recentMeetings.find(m => m.status === 'ACTIVE');
      const archivedMeetings = recentMeetings.filter(m => m.status === 'ARCHIVED');

      const allRatings = archivedMeetings.flatMap(m => m.ratings);
      const allTodos = recentMeetings.flatMap(m => m.todos);
      const allIssues = recentMeetings.flatMap(m => m.issues);

      return {
        id: team.id,
        name: team.name,
        memberCount: team._count.members,
        hasActiveMeeting: !!activeMeeting,
        meetingCount: archivedMeetings.length,
        avgRating: allRatings.length > 0
          ? Number((allRatings.reduce((s, r) => s + r.score, 0) / allRatings.length).toFixed(1))
          : null,
        todoCompletionRate: allTodos.length > 0
          ? Number(((allTodos.filter(t => t.status === 'DONE').length / allTodos.length) * 100).toFixed(0))
          : null,
        openIssueCount: allIssues.filter(i => i.status !== 'SOLVED').length,
        offTrackRocks: team.rocks.filter(r => r.status === 'OFF_TRACK').length,
        totalRocks: team.rocks.length,
        carryForwardCount:
          allTodos.filter(t => t.status === 'CARRY_FORWARD').length +
          allIssues.filter(i => i.status === 'CARRY_FORWARD').length,
      };
    });

    const allTeamRatings = teams.filter(t => t.avgRating !== null);
    const companyAvgRating = allTeamRatings.length > 0
      ? Number((allTeamRatings.reduce((s, t) => s + t.avgRating!, 0) / allTeamRatings.length).toFixed(1))
      : null;

    const totalTodoRate = teams.filter(t => t.todoCompletionRate !== null);
    const companyTodoRate = totalTodoRate.length > 0
      ? Number((totalTodoRate.reduce((s, t) => s + t.todoCompletionRate!, 0) / totalTodoRate.length).toFixed(0))
      : null;

    return {
      id: company.id,
      name: company.name,
      avgRating: companyAvgRating,
      todoCompletionRate: companyTodoRate,
      openIssueCount: teams.reduce((s, t) => s + t.openIssueCount, 0),
      offTrackRocks: teams.reduce((s, t) => s + t.offTrackRocks, 0),
      totalRocks: teams.reduce((s, t) => s + t.totalRocks, 0),
      carryForwardCount: teams.reduce((s, t) => s + t.carryForwardCount, 0),
      teams,
    };
  });

  return NextResponse.json(dashboard);
}
