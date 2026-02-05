'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';

export default function TeamDetailPage() {
  const params = useParams();
  const [team, setTeam] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/teams/${params.teamId}`).then(r => r.json()).then(setTeam).catch(() => {});
  }, [params.teamId]);

  if (!team) return <div className="animate-pulse text-gray-500">Loading team...</div>;

  return (
    <div>
      <div className="mb-6">
        <Link href="/teams" className="text-sm text-primary-600 hover:underline mb-2 inline-block">&larr; Back to Teams</Link>
        <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{team.company?.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Members ({team.members?.length ?? 0})</h2>
          <ul className="divide-y divide-gray-100">
            {team.members?.map((member: any) => (
              <li key={member.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    {member.user?.name?.[0] || '?'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.user?.name || member.user?.email}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Meetings</h2>
            {team.meetings?.length === 0 ? (
              <p className="text-sm text-gray-500">No meetings yet</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {team.meetings?.map((meeting: any) => (
                      <tr key={meeting.id} className="hover:bg-gray-50">
                        <td>
                          <Link href={`/meetings/${meeting.id}`} className="text-primary-600 hover:underline">
                            {meeting.title}
                          </Link>
                        </td>
                        <td className="text-gray-500">{new Date(meeting.meetingDate).toLocaleDateString()}</td>
                        <td><StatusBadge status={meeting.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rocks</h2>
            {team.rocks?.length === 0 ? (
              <p className="text-sm text-gray-500">No rocks assigned</p>
            ) : (
              <ul className="space-y-3">
                {team.rocks?.map((rock: any) => (
                  <li key={rock.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{rock.title}</p>
                      <p className="text-xs text-gray-500">{rock.owner?.name}</p>
                    </div>
                    <StatusBadge status={rock.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
