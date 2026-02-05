'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  teams: number;
  activeMeetings: number;
  openTodos: number;
  openIssues: number;
  rocks: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMeetings, setRecentMeetings] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/teams').then(r => r.json()),
      fetch('/api/meetings?status=ACTIVE').then(r => r.json()),
      fetch('/api/todos').then(r => r.json()),
      fetch('/api/issues').then(r => r.json()),
      fetch('/api/rocks').then(r => r.json()),
    ]).then(([teams, meetings, todos, issues, rocks]) => {
      setStats({
        teams: teams.length,
        activeMeetings: meetings.length,
        openTodos: todos.filter((t: any) => t.status !== 'DONE').length,
        openIssues: issues.filter((i: any) => i.status !== 'SOLVED').length,
        rocks: rocks.length,
      });
      setRecentMeetings(meetings.slice(0, 5));
    }).catch(() => {
      setStats({ teams: 0, activeMeetings: 0, openTodos: 0, openIssues: 0, rocks: 0 });
    });
  }, []);

  const statCards = [
    { label: 'Teams', value: stats?.teams ?? '-', href: '/teams', color: 'bg-blue-500' },
    { label: 'Active Meetings', value: stats?.activeMeetings ?? '-', href: '/meetings', color: 'bg-emerald-500' },
    { label: 'Open Todos', value: stats?.openTodos ?? '-', href: '/todos', color: 'bg-amber-500' },
    { label: 'Open Issues', value: stats?.openIssues ?? '-', href: '/issues', color: 'bg-red-500' },
    { label: 'Rocks', value: stats?.rocks ?? '-', href: '/rocks', color: 'bg-purple-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your operating system</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <span className="text-lg font-bold text-white">{stat.value}</span>
              </div>
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Meetings</h2>
          {recentMeetings.length === 0 ? (
            <p className="text-sm text-gray-500">No active meetings</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentMeetings.map((meeting: any) => (
                <li key={meeting.id} className="py-3">
                  <Link href={`/meetings/${meeting.id}`} className="flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                      <p className="text-xs text-gray-500">{meeting.team?.name} &middot; {new Date(meeting.meetingDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{meeting._count?.todos ?? 0} todos</span>
                      <span>{meeting._count?.issues ?? 0} issues</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/meetings" className="btn-primary text-center">New Meeting</Link>
            <Link href="/todos" className="btn-secondary text-center">View Todos</Link>
            <Link href="/issues" className="btn-secondary text-center">View Issues</Link>
            <Link href="/board" className="btn-secondary text-center">Board View</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
