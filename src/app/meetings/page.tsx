'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';
import { Modal } from '@/components/ui/modal';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [filter, setFilter] = useState({ teamId: '', status: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', teamId: '', meetingDate: '' });

  const loadMeetings = () => {
    const params = new URLSearchParams();
    if (filter.teamId) params.set('teamId', filter.teamId);
    if (filter.status) params.set('status', filter.status);
    fetch(`/api/meetings?${params}`).then(r => r.json()).then(setMeetings).catch(() => {});
  };

  useEffect(() => { loadMeetings(); }, [filter]);
  useEffect(() => { fetch('/api/teams').then(r => r.json()).then(setTeams).catch(() => {}); }, []);

  const handleCreate = async () => {
    if (!form.title || !form.teamId || !form.meetingDate) return;
    const res = await fetch('/api/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error);
      return;
    }
    setForm({ title: '', teamId: '', meetingDate: '' });
    setShowCreate(false);
    loadMeetings();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
          <p className="mt-1 text-sm text-gray-500">Weekly EOS rhythm meetings</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">New Meeting</button>
      </div>

      <div className="mb-6 flex gap-4">
        <select className="select w-48" value={filter.teamId} onChange={e => setFilter(f => ({ ...f, teamId: e.target.value }))}>
          <option value="">All Teams</option>
          {teams.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select className="select w-40" value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Team</th>
              <th>Date</th>
              <th>Status</th>
              <th>Todos</th>
              <th>Issues</th>
              <th>Ratings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-gray-50">
                <td>
                  <Link href={`/meetings/${meeting.id}`} className="text-primary-600 hover:underline font-medium">
                    {meeting.title}
                  </Link>
                </td>
                <td className="text-gray-500">{meeting.team?.name}</td>
                <td className="text-gray-500">{new Date(meeting.meetingDate).toLocaleDateString()}</td>
                <td><StatusBadge status={meeting.status} /></td>
                <td className="text-gray-500">{meeting._count?.todos ?? 0}</td>
                <td className="text-gray-500">{meeting._count?.issues ?? 0}</td>
                <td className="text-gray-500">{meeting._count?.ratings ?? 0}</td>
              </tr>
            ))}
            {meetings.length === 0 && (
              <tr><td colSpan={7} className="text-center text-gray-500 py-8">No meetings found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Meeting">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., Weekly L10 Meeting" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
            <select className="select" value={form.teamId} onChange={e => setForm(f => ({ ...f, teamId: e.target.value }))}>
              <option value="">Select team</option>
              {teams.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Date</label>
            <input type="date" className="input" value={form.meetingDate} onChange={e => setForm(f => ({ ...f, meetingDate: e.target.value }))} />
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
