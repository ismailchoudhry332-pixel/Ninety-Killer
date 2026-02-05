import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create companies
  const acmeCorp = await prisma.company.create({ data: { name: 'Acme Corporation' } });
  const betaInc = await prisma.company.create({ data: { name: 'Beta Industries' } });

  // Create users
  const admin = await prisma.user.create({
    data: { email: 'admin@example.com', name: 'Admin User', role: 'ADMIN', companyId: acmeCorp.id },
  });
  const editor1 = await prisma.user.create({
    data: { email: 'john@example.com', name: 'John Smith', role: 'EDITOR', companyId: acmeCorp.id },
  });
  const editor2 = await prisma.user.create({
    data: { email: 'sarah@example.com', name: 'Sarah Johnson', role: 'EDITOR', companyId: acmeCorp.id },
  });
  const editor3 = await prisma.user.create({
    data: { email: 'mike@example.com', name: 'Mike Chen', role: 'EDITOR', companyId: betaInc.id },
  });
  const boardUser = await prisma.user.create({
    data: { email: 'board@example.com', name: 'Board Member', role: 'BOARD', companyId: acmeCorp.id },
  });

  // Create teams
  const leadershipTeam = await prisma.team.create({ data: { name: 'Leadership Team', companyId: acmeCorp.id } });
  const salesTeam = await prisma.team.create({ data: { name: 'Sales Team', companyId: acmeCorp.id } });
  const betaOps = await prisma.team.create({ data: { name: 'Operations', companyId: betaInc.id } });

  // Add team members
  await prisma.teamMember.createMany({
    data: [
      { teamId: leadershipTeam.id, userId: admin.id, role: 'ADMIN' },
      { teamId: leadershipTeam.id, userId: editor1.id, role: 'EDITOR' },
      { teamId: leadershipTeam.id, userId: editor2.id, role: 'EDITOR' },
      { teamId: salesTeam.id, userId: editor1.id, role: 'EDITOR' },
      { teamId: salesTeam.id, userId: editor2.id, role: 'EDITOR' },
      { teamId: betaOps.id, userId: editor3.id, role: 'EDITOR' },
    ],
  });

  // Create scorecard metrics
  const revenueMetric = await prisma.scorecardMetric.create({
    data: { name: 'Weekly Revenue', target: 50000, unit: '$', teamId: salesTeam.id },
  });
  const npsMetric = await prisma.scorecardMetric.create({
    data: { name: 'NPS Score', target: 70, unit: 'pts', teamId: leadershipTeam.id },
  });
  const callsMetric = await prisma.scorecardMetric.create({
    data: { name: 'Sales Calls', target: 100, unit: 'calls', teamId: salesTeam.id },
  });

  // Create rocks
  await prisma.rock.createMany({
    data: [
      { title: 'Launch V2 Product', description: 'Ship the next version of the platform', status: 'ON_TRACK', ownerId: admin.id, teamId: leadershipTeam.id, dueDate: new Date('2026-03-31') },
      { title: 'Hit $2M ARR', description: 'Scale revenue to $2M annual run rate', status: 'OFF_TRACK', ownerId: editor1.id, teamId: salesTeam.id, dueDate: new Date('2026-03-31') },
      { title: 'Hire 3 Engineers', status: 'ON_TRACK', ownerId: editor2.id, teamId: leadershipTeam.id, dueDate: new Date('2026-06-30') },
      { title: 'ISO Certification', status: 'ON_TRACK', ownerId: editor3.id, teamId: betaOps.id, dueDate: new Date('2026-06-30') },
    ],
  });

  // Create a meeting for Leadership Team
  const meeting1 = await prisma.meeting.create({
    data: {
      title: 'Leadership Team - Weekly 2026-01-27',
      teamId: leadershipTeam.id,
      status: 'ARCHIVED',
      meetingDate: new Date('2026-01-27'),
      archivedAt: new Date('2026-01-27T17:00:00'),
    },
  });

  // Create todos for archived meeting
  await prisma.todo.createMany({
    data: [
      { title: 'Review Q4 financials', status: 'DONE', ownerId: admin.id, meetingId: meeting1.id, dueDate: new Date('2026-01-31') },
      { title: 'Prepare board deck', status: 'DONE', ownerId: editor2.id, meetingId: meeting1.id, dueDate: new Date('2026-01-31') },
      { title: 'Interview senior engineer candidates', status: 'CARRY_FORWARD', ownerId: editor1.id, meetingId: meeting1.id, dueDate: new Date('2026-01-31') },
    ],
  });

  // Create issues for archived meeting
  await prisma.issue.createMany({
    data: [
      { title: 'Customer churn increase in Q4', status: 'SOLVED', priority: 'HIGH', creatorId: admin.id, ownerId: editor1.id, meetingId: meeting1.id },
      { title: 'Engineering velocity declining', status: 'CARRY_FORWARD', priority: 'CRITICAL', creatorId: editor2.id, ownerId: admin.id, meetingId: meeting1.id },
    ],
  });

  // Ratings for archived meeting
  await prisma.rating.createMany({
    data: [
      { score: 8, userId: admin.id, meetingId: meeting1.id },
      { score: 7, userId: editor1.id, meetingId: meeting1.id },
      { score: 9, userId: editor2.id, meetingId: meeting1.id },
    ],
  });

  // Scorecard entries for archived meeting
  await prisma.scorecardEntry.createMany({
    data: [
      { actual: 72, status: 'ON_TRACK', metricId: npsMetric.id, meetingId: meeting1.id },
    ],
  });

  // Current active meeting for Leadership Team
  const meeting2 = await prisma.meeting.create({
    data: {
      title: 'Leadership Team - Weekly 2026-02-03',
      teamId: leadershipTeam.id,
      status: 'ACTIVE',
      meetingDate: new Date('2026-02-03'),
      previousMeetingId: meeting1.id,
    },
  });

  // Carried forward todo
  const carriedTodo = await prisma.todo.findFirst({ where: { meetingId: meeting1.id, status: 'CARRY_FORWARD', title: 'Interview senior engineer candidates' } });
  await prisma.todo.createMany({
    data: [
      { title: 'Interview senior engineer candidates', status: 'IN_PROGRESS', ownerId: editor1.id, meetingId: meeting2.id, dueDate: new Date('2026-02-07'), carriedFromId: carriedTodo?.id },
      { title: 'Finalize Q1 OKRs', status: 'NOT_STARTED', ownerId: admin.id, meetingId: meeting2.id, dueDate: new Date('2026-02-10') },
      { title: 'Update product roadmap', status: 'NOT_STARTED', ownerId: editor2.id, meetingId: meeting2.id, dueDate: new Date('2026-02-14') },
    ],
  });

  // Carried forward issue
  const carriedIssue = await prisma.issue.findFirst({ where: { meetingId: meeting1.id, status: 'CARRY_FORWARD' } });
  await prisma.issue.createMany({
    data: [
      { title: 'Engineering velocity declining', status: 'OPEN', priority: 'CRITICAL', creatorId: editor2.id, ownerId: admin.id, meetingId: meeting2.id, carriedFromId: carriedIssue?.id },
      { title: 'Need to define remote work policy', status: 'OPEN', priority: 'MEDIUM', creatorId: admin.id, meetingId: meeting2.id },
    ],
  });

  // Active meeting for Sales Team
  await prisma.meeting.create({
    data: {
      title: 'Sales Team - Weekly 2026-02-03',
      teamId: salesTeam.id,
      status: 'ACTIVE',
      meetingDate: new Date('2026-02-03'),
    },
  });

  console.log('Seed data created successfully!');
  console.log(`  Companies: ${acmeCorp.name}, ${betaInc.name}`);
  console.log(`  Users: 5 (1 admin, 3 editors, 1 board)`);
  console.log(`  Teams: 3`);
  console.log(`  Meetings: 3 (1 archived, 2 active)`);
  console.log(`  Scorecard Metrics: 3`);
  console.log(`  Rocks: 4`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
