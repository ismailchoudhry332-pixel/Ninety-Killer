'use client';

import { useEffect, useState } from 'react';

export default function BoardPage() {
  const [dashboard, setDashboard] = useState<any[]>([]);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetch('/api/board').then(r => r.json()).then(setDashboard).catch(() => {});
  }, []);

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    const res = await fetch('/api/ai/board-summary', { method: 'POST' });
    const data = await res.json();
    setAiSummary(data.aiOutput);
    setAiLoading(false);
  };

  const ragColor = (value: number | null, thresholds: { green: number; yellow: number }) => {
    if (value === null) return 'text-gray-400';
    if (value >= thresholds.green) return 'text-emerald-600';
    if (value >= thresholds.yellow) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Board Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Executive control tower - group-level health at a glance</p>
        </div>
        <button onClick={handleGenerateSummary} disabled={aiLoading} className="btn-primary">
          {aiLoading ? 'Generating...' : 'AI Board Summary'}
        </button>
      </div>

      {aiSummary && (
        <div className="card mb-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">AI Board Summary</h3>
          <p className="text-sm text-blue-800 mb-3">{aiSummary.summaryText}</p>
          {aiSummary.warnings?.length > 0 && (
            <div className="mt-2">
              {aiSummary.warnings.map((w: string, i: number) => (
                <p key={i} className="text-xs text-amber-700">Warning: {w}</p>
              ))}
            </div>
          )}
          <p className="text-xs text-blue-600 mt-2">Confidence: {((aiSummary.confidence || 0) * 100).toFixed(0)}%</p>
        </div>
      )}

      <div className="space-y-6">
        {dashboard.map((company: any) => (
          <div key={company.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
              <div className="flex gap-6 text-sm">
                <div className="text-center">
                  <p className={`text-xl font-bold ${ragColor(company.avgRating, { green: 7, yellow: 5 })}`}>
                    {company.avgRating ?? '-'}
                  </p>
                  <p className="text-xs text-gray-500">Avg Rating</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold ${ragColor(company.todoCompletionRate, { green: 80, yellow: 60 })}`}>
                    {company.todoCompletionRate != null ? `${company.todoCompletionRate}%` : '-'}
                  </p>
                  <p className="text-xs text-gray-500">Todo Rate</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold ${company.openIssueCount > 10 ? 'text-red-600' : company.openIssueCount > 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {company.openIssueCount}
                  </p>
                  <p className="text-xs text-gray-500">Open Issues</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold ${company.offTrackRocks > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {company.offTrackRocks}/{company.totalRocks}
                  </p>
                  <p className="text-xs text-gray-500">Off-Track Rocks</p>
                </div>
                <div className="text-center">
                  <p className={`text-xl font-bold ${company.carryForwardCount > 5 ? 'text-red-600' : company.carryForwardCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {company.carryForwardCount}
                  </p>
                  <p className="text-xs text-gray-500">Carry-Forwards</p>
                </div>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Members</th>
                    <th>Active Meeting</th>
                    <th>Avg Rating</th>
                    <th>Todo %</th>
                    <th>Open Issues</th>
                    <th>Rocks (Off-Track)</th>
                    <th>Carry-Forwards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {company.teams?.map((team: any) => (
                    <tr key={team.id}>
                      <td className="font-medium text-gray-900">{team.name}</td>
                      <td className="text-gray-500">{team.memberCount}</td>
                      <td>{team.hasActiveMeeting ? <span className="badge-green">Yes</span> : <span className="badge-gray">No</span>}</td>
                      <td className={ragColor(team.avgRating, { green: 7, yellow: 5 })}>{team.avgRating ?? '-'}</td>
                      <td className={ragColor(team.todoCompletionRate, { green: 80, yellow: 60 })}>
                        {team.todoCompletionRate != null ? `${team.todoCompletionRate}%` : '-'}
                      </td>
                      <td className={team.openIssueCount > 5 ? 'text-red-600 font-medium' : 'text-gray-500'}>{team.openIssueCount}</td>
                      <td className={team.offTrackRocks > 0 ? 'text-red-600 font-medium' : 'text-gray-500'}>
                        {team.offTrackRocks}/{team.totalRocks}
                      </td>
                      <td className={team.carryForwardCount > 0 ? 'text-amber-600 font-medium' : 'text-gray-500'}>{team.carryForwardCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {dashboard.length === 0 && (
          <div className="text-center text-gray-500 py-12">No companies configured yet</div>
        )}
      </div>
    </div>
  );
}
