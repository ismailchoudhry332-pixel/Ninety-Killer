'use client';

import { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import { Modal } from '@/components/ui/modal';

export default function ScorecardPage() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', target: '', unit: '', teamId: '' });

  const loadMetrics = () => {
    const params = selectedTeam ? `?teamId=${selectedTeam}` : '';
    fetch(`/api/scorecard/metrics${params}`).then(r => r.json()).then(setMetrics).catch(() => {});
  };

  useEffect(() => { loadMetrics(); }, [selectedTeam]);
  useEffect(() => { fetch('/api/teams').then(r => r.json()).then(setTeams).catch(() => {}); }, []);

  const handleCreate = async () => {
    if (!form.name || !form.target || !form.teamId) return;
    await fetch('/api/scorecard/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, target: parseFloat(form.target) }),
    });
    setForm({ name: '', description: '', target: '', unit: '', teamId: '' });
    setShowCreate(false);
    loadMetrics();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scorecard</h1>
          <p className="mt-1 text-sm text-gray-500">Weekly measurables and KPIs</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">Add Metric</button>
      </div>

      <div className="mb-6">
        <select className="select w-48" value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
          <option value="">All Teams</option>
          {teams.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                <p className="text-sm text-gray-500">Target: {metric.target} {metric.unit} | Team: {metric.team?.name}</p>
              </div>
            </div>
            {metric.entries?.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {metric.entries.map((entry: any) => (
                  <div key={entry.id} className="flex-shrink-0 rounded-lg border border-gray-100 px-4 py-3 text-center min-w-[100px]">
                    <p className={`text-lg font-bold ${entry.status === 'ON_TRACK' ? 'text-emerald-600' : entry.status === 'OFF_TRACK' ? 'text-amber-600' : 'text-red-600'}`}>
                      {entry.actual}
                    </p>
                    <StatusBadge status={entry.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No entries yet</p>
            )}
          </div>
        ))}
        {metrics.length === 0 && (
          <div className="text-center text-gray-500 py-12">No scorecard metrics defined</div>
        )}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add Scorecard Metric">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metric Name</label>
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g., Revenue, NPS, Conversion Rate" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input className="input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
              <input type="number" className="input" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input className="input" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="e.g., %, $, users" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
            <select className="select" value={form.teamId} onChange={e => setForm(f => ({ ...f, teamId: e.target.value }))}>
              <option value="">Select team</option>
              {teams.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleCreate} className="btn-primary">Add Metric</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
