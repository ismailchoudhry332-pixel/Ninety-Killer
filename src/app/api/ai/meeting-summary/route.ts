import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, requireRole } from '@/lib/rbac';
import { generateMeetingSummary } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const authError = requireRole(user, 'ADMIN', 'EDITOR');
  if (authError) return authError;

  const body = await req.json();

  const meeting = await prisma.meeting.findUnique({
    where: { id: body.meetingId },
    include: {
      todos: { include: { owner: true } },
      issues: { include: { creator: true, owner: true } },
      ratings: true,
      scorecardEntries: { include: { metric: true } },
      team: { include: { rocks: { include: { owner: true } } } },
    },
  });

  if (!meeting) return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });

  const aiOutput = await generateMeetingSummary({
    title: meeting.title,
    todos: meeting.todos,
    issues: meeting.issues,
    rocks: meeting.team.rocks,
    scorecardEntries: meeting.scorecardEntries,
    ratings: meeting.ratings,
  });

  // Store as draft
  const draft = await prisma.aiDraft.create({
    data: {
      meetingId: meeting.id,
      summaryText: aiOutput.summaryText,
      proposals: aiOutput.proposals as any,
      warnings: aiOutput.warnings,
      confidence: aiOutput.confidence,
      status: 'PENDING',
    },
  });

  return NextResponse.json({ draft, aiOutput });
}
