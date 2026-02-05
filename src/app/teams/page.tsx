'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', companyId: '' });
  const [companies, setCompanies] = useState<any[]>([]);

  const loadTeams = () => fetch('/api/teams').then(r => r.json()).then(setTeams).catch(() => {});
  const loadCompanies = () => fetch('/api/companies').then(r => r.json()).then(setCompanies).catch(() => {});

  useEffect(() => { loadTeams(); loadCompanies(); }, []);

  const handleCreate = async () => {
    if (!form.name || !form.companyId) return;
    await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', companyId: '' });
    setShowCreate(false);
    loadTeams();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your teams and their members</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">Create Team</button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Link key={team.id} href={`/teams/${team.id}`} className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{team.company?.name}</p>
            <div className="mt-4 flex gap-4 text-sm text-gray-500">
              <span>{team._count?.members ?? 0} members</span>
              <span>{team._count?.meetings ?? 0} meetings</span>
            </div>
          </Link>
        ))}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Team">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g., Leadership Team" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <select className="select" value={form.companyId} onChange={e => setForm(f => ({ ...f, companyId: e.target.value }))}>
              <option value="">Select company</option>
              {companies.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleCreate} className="btn-primary">Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
