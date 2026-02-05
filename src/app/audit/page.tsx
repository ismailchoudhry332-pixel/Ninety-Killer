'use client';

import { useEffect, useState } from 'react';

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [filter, setFilter] = useState({ entityType: '', limit: '50' });

  const loadLogs = () => {
    const params = new URLSearchParams();
    if (filter.entityType) params.set('entityType', filter.entityType);
    params.set('limit', filter.limit);
    fetch(`/api/audit?${params}`).then(r => r.json()).then(setLogs).catch(() => {});
  };

  useEffect(() => { loadLogs(); }, [filter]);

  const actionColors: Record<string, string> = {
    CREATE: 'badge-green',
    UPDATE: 'badge-blue',
    DELETE: 'badge-red',
    ARCHIVE: 'badge-gray',
    CARRY_FORWARD: 'badge-yellow',
    AI_APPLY: 'badge-blue',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="mt-1 text-sm text-gray-500">Full accountability trail of all system mutations</p>
      </div>

      <div className="mb-6 flex gap-4">
        <select className="select w-48" value={filter.entityType} onChange={e => setFilter(f => ({ ...f, entityType: e.target.value }))}>
          <option value="">All Entity Types</option>
          <option value="Meeting">Meeting</option>
          <option value="Todo">Todo</option>
          <option value="Issue">Issue</option>
          <option value="Rock">Rock</option>
          <option value="Rating">Rating</option>
          <option value="ScorecardEntry">Scorecard Entry</option>
          <option value="AiDraft">AI Draft</option>
          <option value="Team">Team</option>
          <option value="Company">Company</option>
        </select>
        <select className="select w-32" value={filter.limit} onChange={e => setFilter(f => ({ ...f, limit: e.target.value }))}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Entity</th>
              <th>User</th>
              <th>Meeting</th>
              <th>Changes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="text-gray-500 text-xs">{new Date(log.createdAt).toLocaleString()}</td>
                <td><span className={actionColors[log.action] || 'badge-gray'}>{log.action}</span></td>
                <td>
                  <span className="text-sm text-gray-900">{log.entityType}</span>
                  <span className="text-xs text-gray-400 ml-1">#{log.entityId.slice(0, 8)}</span>
                </td>
                <td className="text-gray-500">{log.user?.name || log.user?.email}</td>
                <td className="text-gray-500 text-xs">{log.meeting?.title || '-'}</td>
                <td>
                  <details className="text-xs">
                    <summary className="cursor-pointer text-primary-600">View diff</summary>
                    <div className="mt-2 max-h-40 overflow-auto rounded bg-gray-50 p-2 font-mono text-xs">
                      {log.before && (
                        <div className="mb-1">
                          <span className="text-red-600">- Before:</span>
                          <pre className="whitespace-pre-wrap">{JSON.stringify(log.before, null, 2)}</pre>
                        </div>
                      )}
                      {log.after && (
                        <div>
                          <span className="text-emerald-600">+ After:</span>
                          <pre className="whitespace-pre-wrap">{JSON.stringify(log.after, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  </details>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan={6} className="text-center text-gray-500 py-8">No audit logs</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
