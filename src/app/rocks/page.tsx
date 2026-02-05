'use client';

import { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import { Modal } from '@/components/ui/modal';

export default function RocksPage() {
  const [rocks, setRocks] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', teamId: '', ownerId: '', dueDate: '' });

  const loadRocks = () => fetch('/api/rocks').then(r => r.json()).then(setRocks).catch(() => {});
  useEffect(() => { loadRocks(); fetch('/api/teams').then(r => r.json()).then(setTeams).catch(() => {}); }, []);

  const handleCreate = async () => {
    if (!form.title || !form.teamId || !form.ownerId) return;
    await fetch('/api/rocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', description: '', teamId: '', ownerId: '', dueDate: '' });
    setShowCreate(false);
    loadRocks();
  };

  const handleUpdateStatus = async (rockId: string, status: string) => {
    await fetch(`/api/rocks/${rockId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadRocks();
  };

  const onTrack = rocks.filter(r => r.status === 'ON_TRACK');
  const offTrack = rocks.filter(r => r.status === 'OFF_TRACK');
  const done = rocks.filter(r => r.status === 'DONE');

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rocks</h1>
          <p className="mt-1 text-sm text-gray-500">Quarterly strategic priorities</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">Add Rock</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card bg-emerald-50 border-emerald-200">
          <p className="text-2xl font-bold text-emerald-700">{onTrack.length}</p>
          <p className="text-sm text-emerald-600">On Track</p>
        </div>
        <div className="card bg-red-50 border-red-200">
          <p className="text-2xl font-bold text-red-700">{offTrack.length}</p>
          <p className="text-sm text-red-600">Off Track</p>
        </div>
        <div className="card bg-gray-50 border-gray-200">
          <p className="text-2xl font-bold text-gray-700">{done.length}</p>
          <p className="text-sm text-gray-600">Done</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Rock</th><th>Owner</th><th>Team</th><th>Due</th><th>Milestones</th><th>Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rocks.map((rock) => (
              <tr key={rock.id} className="hover:bg-gray-50">
                <td>
                  <p className="font-medium text-gray-900">{rock.title}</p>
                  {rock.description && <p className="text-xs text-gray-500 mt-0.5">{rock.description}</p>}
                </td>
                <td className="text-gray-500">{rock.owner?.name}</td>
                <td className="text-gray-500">{rock.team?.name}</td>
                <td className="text-gray-500">{rock.dueDate ? new Date(rock.dueDate).toLocaleDateString() : '-'}</td>
                <td className="text-gray-500">
                  {rock.milestones?.length > 0
                    ? `${rock.milestones.filter((m: any) => m.done).length}/${rock.milestones.length}`
                    : '-'}
                </td>
                <td>
                  <select className="select text-xs w-28" value={rock.status} onChange={e => handleUpdateStatus(rock.id, e.target.value)}>
                    <option value="ON_TRACK">On Track</option>
                    <option value="OFF_TRACK">Off Track</option>
                    <option value="DONE">Done</option>
                    <option value="DROPPED">Dropped</option>
                  </select>
                </td>
              </tr>
            ))}
            {rocks.length === 0 && <tr><td colSpan={6} className="text-center text-gray-500 py-8">No rocks</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add Rock">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="input" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
            <select className="select" value={form.teamId} onChange={e => setForm(f => ({ ...f, teamId: e.target.value }))}>
              <option value="">Select team</option>
              {teams.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" className="input" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleCreate} className="btn-primary">Add Rock</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
