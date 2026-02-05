import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { generateBoardSummary } from '@/lib/ai';

export async function POST() {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'BOARD');
  if (authError) return authError;

  const companies = await prisma.company.findMany({
    include: {
      teams: {
        include: {
          meetings: {
            where: { status: 'ARCHIVED' },
            orderBy: { archivedAt: 'desc' },
            take: 4,
            include: {
              ratings: true,
              todos: true,
              issues: true,
            },
          },
          rocks: true,
        },
      },
    },
  });

  const companiesData = companies.map(company => {
    const allMeetings = company.teams.flatMap(t => t.meetings);
    const allRatings = allMeetings.flatMap(m => m.ratings);
    const allTodos = allMeetings.flatMap(m => m.todos);
    const allIssues = allMeetings.flatMap(m => m.issues);
    const allRocks = company.teams.flatMap(t => t.rocks);

    return {
      name: company.name,
      avgRating: allRatings.length > 0
        ? allRatings.reduce((sum, r) => sum + r.score, 0) / allRatings.length
        : null,
      todoCompletionRate: allTodos.length > 0
        ? (allTodos.filter(t => t.status === 'DONE').length / allTodos.length) * 100
        : null,
      openIssueCount: allIssues.filter(i => i.status !== 'SOLVED').length,
      offTrackRockCount: allRocks.filter(r => r.status === 'OFF_TRACK').length,
      carryForwardCount: allTodos.filter(t => t.status === 'CARRY_FORWARD').length +
        allIssues.filter(i => i.status === 'CARRY_FORWARD').length,
    };
  });

  const aiOutput = await generateBoardSummary(companiesData);
  return NextResponse.json({ companiesData, aiOutput });
}
