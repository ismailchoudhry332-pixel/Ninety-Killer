'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';

export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/issues').then(r => r.json()).then(setIssues).catch(() => {});
  }, []);

  const handleUpdateStatus = async (issueId: string, status: string) => {
    await fetch(`/api/issues/${issueId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetch('/api/issues').then(r => r.json()).then(setIssues);
  };

  const grouped = {
    open: issues.filter(i => i.status !== 'SOLVED'),
    solved: issues.filter(i => i.status === 'SOLVED'),
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">IDS Issues</h1>
        <p className="mt-1 text-sm text-gray-500">Identify, Discuss, Solve</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Open Issues ({grouped.open.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Title</th>
                <th>Owner</th>
                <th>Meeting</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grouped.open.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td><StatusBadge status={issue.priority} /></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{issue.title}</span>
                      {issue.carriedFrom && <span className="badge-yellow text-xs">Carried</span>}
                    </div>
                    {issue.description && <p className="text-xs text-gray-500 mt-0.5">{issue.description}</p>}
                  </td>
                  <td className="text-gray-500">{issue.owner?.name || issue.creator?.name}</td>
                  <td>
                    <Link href={`/meetings/${issue.meetingId}`} className="text-primary-600 hover:underline text-xs">
                      {issue.meeting?.title}
                    </Link>
                  </td>
                  <td>
                    {issue.meeting?.status === 'ACTIVE' ? (
                      <select
                        className="select text-xs w-32"
                        value={issue.status}
                        onChange={e => handleUpdateStatus(issue.id, e.target.value)}
                      >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="SOLVED">Solved</option>
                        <option value="CARRY_FORWARD">Carry Forward</option>
                      </select>
                    ) : (
                      <StatusBadge status={issue.status} />
                    )}
                  </td>
                </tr>
              ))}
              {grouped.open.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-500 py-8">No open issues</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <details className="group">
        <summary className="cursor-pointer text-lg font-semibold text-gray-900 mb-3">
          Solved ({grouped.solved.length})
        </summary>
        <div className="table-container mt-3">
          <table>
            <thead>
              <tr><th>Priority</th><th>Title</th><th>Owner</th><th>Meeting</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grouped.solved.map((issue) => (
                <tr key={issue.id} className="opacity-60">
                  <td><StatusBadge status={issue.priority} /></td>
                  <td>{issue.title}</td>
                  <td className="text-gray-500">{issue.owner?.name}</td>
                  <td className="text-gray-500">{issue.meeting?.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
