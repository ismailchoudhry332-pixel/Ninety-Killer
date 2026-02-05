'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';
import { Modal } from '@/components/ui/modal';

export default function MeetingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [meeting, setMeeting] = useState<any>(null);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [todoForm, setTodoForm] = useState({ title: '', description: '', ownerId: '', dueDate: '' });
  const [issueForm, setIssueForm] = useState({ title: '', description: '', priority: 'MEDIUM', ownerId: '' });
  const [ratingScore, setRatingScore] = useState(7);
  const [aiLoading, setAiLoading] = useState(false);

  const loadMeeting = () => {
    fetch(`/api/meetings/${params.meetingId}`).then(r => r.json()).then(setMeeting).catch(() => {});
  };

  useEffect(() => { loadMeeting(); }, [params.meetingId]);

  if (!meeting) return <div className="animate-pulse text-gray-500">Loading meeting...</div>;

  const isActive = meeting.status === 'ACTIVE';
  const members = meeting.team?.members || [];
  const avgRating = meeting.ratings?.length > 0
    ? (meeting.ratings.reduce((s: number, r: any) => s + r.score, 0) / meeting.ratings.length).toFixed(1)
    : null;

  const handleAddTodo = async () => {
    if (!todoForm.title || !todoForm.ownerId) return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todoForm, meetingId: meeting.id }),
    });
    setTodoForm({ title: '', description: '', ownerId: '', dueDate: '' });
    setShowAddTodo(false);
    loadMeeting();
  };

  const handleUpdateTodoStatus = async (todoId: string, status: string) => {
    await fetch(`/api/todos/${todoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadMeeting();
  };

  const handleAddIssue = async () => {
    if (!issueForm.title) return;
    await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...issueForm, meetingId: meeting.id }),
    });
    setIssueForm({ title: '', description: '', priority: 'MEDIUM', ownerId: '' });
    setShowAddIssue(false);
    loadMeeting();
  };

  const handleUpdateIssueStatus = async (issueId: string, status: string) => {
    await fetch(`/api/issues/${issueId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadMeeting();
  };

  const handleRate = async () => {
    await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: ratingScore, meetingId: meeting.id }),
    });
    setShowRate(false);
    loadMeeting();
  };

  const handleArchive = async () => {
    if (!confirm('Archive this meeting? This will lock it and create the next meeting.')) return;
    const res = await fetch(`/api/meetings/${meeting.id}/archive`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error);
      return;
    }
    const result = await res.json();
    alert(`Archived! Carried ${result.carriedTodos} todos, ${result.carriedIssues} issues. Next meeting created.`);
    router.push(`/meetings/${result.nextMeeting.id}`);
  };

  const handleGenerateAiSummary = async () => {
    setAiLoading(true);
    await fetch('/api/ai/meeting-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingId: meeting.id }),
    });
    setAiLoading(false);
    loadMeeting();
  };

  const handleApplyDraft = async (draftId: string, action: 'apply' | 'reject') => {
    await fetch(`/api/ai/drafts/${draftId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    loadMeeting();
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/meetings" className="text-sm text-primary-600 hover:underline mb-2 inline-block">&larr; Back to Meetings</Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{meeting.title}</h1>
              <StatusBadge status={meeting.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {meeting.team?.name} &middot; {new Date(meeting.meetingDate).toLocaleDateString()}
              {meeting.previousMeeting && (
                <> &middot; <Link href={`/meetings/${meeting.previousMeeting.id}`} className="text-primary-600 hover:underline">Previous Meeting</Link></>
              )}
              {meeting.nextMeeting && (
                <> &middot; <Link href={`/meetings/${meeting.nextMeeting.id}`} className="text-primary-600 hover:underline">Next Meeting</Link></>
              )}
            </p>
          </div>
          {isActive && (
            <div className="flex gap-2">
              <button onClick={() => setShowRate(true)} className="btn-secondary">Rate Meeting</button>
              <button onClick={handleGenerateAiSummary} disabled={aiLoading} className="btn-secondary">
                {aiLoading ? 'Generating...' : 'AI Summary'}
              </button>
              <button onClick={handleArchive} className="btn-danger">Archive & Next</button>
            </div>
          )}
        </div>
      </div>

      {avgRating && (
        <div className="mb-6 card bg-primary-50 border-primary-200">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-primary-700">{avgRating}</div>
            <div>
              <p className="text-sm font-medium text-primary-900">Average Rating</p>
              <p className="text-xs text-primary-600">{meeting.ratings.length} of {members.length} rated</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Todos Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Todos ({meeting.todos?.length ?? 0})</h2>
            {isActive && <button onClick={() => setShowAddTodo(true)} className="btn-primary text-xs py-1 px-3">Add Todo</button>}
          </div>
          <ul className="space-y-2">
            {meeting.todos?.map((todo: any) => (
              <li key={todo.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{todo.title}</p>
                    {todo.carriedFrom && <span className="badge-yellow text-xs">Carried</span>}
                  </div>
                  <p className="text-xs text-gray-500">
                    {todo.owner?.name}{todo.dueDate ? ` | Due: ${new Date(todo.dueDate).toLocaleDateString()}` : ''}
                  </p>
                </div>
                {isActive ? (
                  <select
                    className="select text-xs w-32"
                    value={todo.status}
                    onChange={e => handleUpdateTodoStatus(todo.id, e.target.value)}
                  >
                    <option value="NOT_STARTED">Not Started</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                    <option value="CARRY_FORWARD">Carry Forward</option>
                  </select>
                ) : (
                  <StatusBadge status={todo.status} />
                )}
              </li>
            ))}
            {(meeting.todos?.length ?? 0) === 0 && <li className="text-sm text-gray-500 text-center py-4">No todos</li>}
          </ul>
        </div>

        {/* Issues Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">IDS Issues ({meeting.issues?.length ?? 0})</h2>
            {isActive && <button onClick={() => setShowAddIssue(true)} className="btn-primary text-xs py-1 px-3">Add Issue</button>}
          </div>
          <ul className="space-y-2">
            {meeting.issues?.map((issue: any) => (
              <li key={issue.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={issue.priority} />
                    <p className="text-sm font-medium text-gray-900 truncate">{issue.title}</p>
                    {issue.carriedFrom && <span className="badge-yellow text-xs">Carried</span>}
                  </div>
                  <p className="text-xs text-gray-500">{issue.owner?.name || issue.creator?.name}</p>
                </div>
                {isActive ? (
                  <select
                    className="select text-xs w-32"
                    value={issue.status}
                    onChange={e => handleUpdateIssueStatus(issue.id, e.target.value)}
                  >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="SOLVED">Solved</option>
                    <option value="CARRY_FORWARD">Carry Forward</option>
                  </select>
                ) : (
                  <StatusBadge status={issue.status} />
                )}
              </li>
            ))}
            {(meeting.issues?.length ?? 0) === 0 && <li className="text-sm text-gray-500 text-center py-4">No issues</li>}
          </ul>
        </div>
      </div>

      {/* Scorecard Entries */}
      {meeting.scorecardEntries?.length > 0 && (
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scorecard</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Metric</th><th>Target</th><th>Actual</th><th>Status</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {meeting.scorecardEntries.map((entry: any) => (
                  <tr key={entry.id}>
                    <td className="font-medium">{entry.metric?.name}</td>
                    <td className="text-gray-500">{entry.metric?.target} {entry.metric?.unit}</td>
                    <td>{entry.actual} {entry.metric?.unit}</td>
                    <td><StatusBadge status={entry.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Drafts */}
      {meeting.aiDrafts?.length > 0 && (
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Drafts</h2>
          {meeting.aiDrafts.map((draft: any) => (
            <div key={draft.id} className="mb-4 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={draft.status} />
                  {draft.confidence != null && (
                    <span className="text-xs text-gray-500">Confidence: {(draft.confidence * 100).toFixed(0)}%</span>
                  )}
                </div>
                {draft.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleApplyDraft(draft.id, 'apply')} className="btn-success text-xs py-1 px-3">Apply</button>
                    <button onClick={() => handleApplyDraft(draft.id, 'reject')} className="btn-danger text-xs py-1 px-3">Reject</button>
                  </div>
                )}
              </div>
              {draft.summaryText && (
                <div className="prose prose-sm max-w-none text-gray-700 mb-3">
                  <p>{draft.summaryText}</p>
                </div>
              )}
              {draft.warnings?.length > 0 && (
                <div className="mt-2">
                  {draft.warnings.map((w: string, i: number) => (
                    <p key={i} className="text-xs text-amber-600">Warning: {w}</p>
                  ))}
                </div>
              )}
              {draft.proposals && Array.isArray(draft.proposals) && draft.proposals.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-700 mb-1">Proposals:</p>
                  <ul className="space-y-1">
                    {draft.proposals.map((p: any, i: number) => (
                      <li key={i} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                        <span className="badge-blue mr-2">{p.type}</span>{p.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Ratings Detail */}
      {meeting.ratings?.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Individual Ratings</h2>
          <div className="flex flex-wrap gap-3">
            {meeting.ratings.map((r: any) => (
              <div key={r.id} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2">
                <span className="text-sm text-gray-600">{r.user?.name || 'User'}</span>
                <span className={`text-lg font-bold ${r.score >= 7 ? 'text-emerald-600' : r.score >= 5 ? 'text-amber-600' : 'text-red-600'}`}>
                  {r.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Todo Modal */}
      <Modal open={showAddTodo} onClose={() => setShowAddTodo(false)} title="Add Todo">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input className="input" value={todoForm.title} onChange={e => setTodoForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="input" rows={2} value={todoForm.description} onChange={e => setTodoForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
            <select className="select" value={todoForm.ownerId} onChange={e => setTodoForm(f => ({ ...f, ownerId: e.target.value }))}>
              <option value="">Select owner</option>
              {members.map((m: any) => <option key={m.user?.id} value={m.user?.id}>{m.user?.name || m.user?.email}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" className="input" value={todoForm.dueDate} onChange={e => setTodoForm(f => ({ ...f, dueDate: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowAddTodo(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleAddTodo} className="btn-primary">Add Todo</button>
          </div>
        </div>
      </Modal>

      {/* Add Issue Modal */}
      <Modal open={showAddIssue} onClose={() => setShowAddIssue(false)} title="Add IDS Issue">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input className="input" value={issueForm.title} onChange={e => setIssueForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="input" rows={2} value={issueForm.description} onChange={e => setIssueForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select className="select" value={issueForm.priority} onChange={e => setIssueForm(f => ({ ...f, priority: e.target.value }))}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
            <select className="select" value={issueForm.ownerId} onChange={e => setIssueForm(f => ({ ...f, ownerId: e.target.value }))}>
              <option value="">Unassigned</option>
              {members.map((m: any) => <option key={m.user?.id} value={m.user?.id}>{m.user?.name || m.user?.email}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowAddIssue(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleAddIssue} className="btn-primary">Add Issue</button>
          </div>
        </div>
      </Modal>

      {/* Rate Meeting Modal */}
      <Modal open={showRate} onClose={() => setShowRate(false)} title="Rate This Meeting">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-700 mb-2">{ratingScore}</p>
            <input
              type="range" min="1" max="10" value={ratingScore}
              onChange={e => setRatingScore(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 - Poor</span>
              <span>10 - Excellent</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowRate(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleRate} className="btn-primary">Submit Rating</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
