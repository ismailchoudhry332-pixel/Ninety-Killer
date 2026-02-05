'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/status-badge';

export default function TodosPage() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/todos').then(r => r.json()).then(setTodos).catch(() => {});
  }, []);

  const handleUpdateStatus = async (todoId: string, status: string) => {
    await fetch(`/api/todos/${todoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetch('/api/todos').then(r => r.json()).then(setTodos);
  };

  const grouped = {
    active: todos.filter(t => t.status !== 'DONE'),
    done: todos.filter(t => t.status === 'DONE'),
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Todos</h1>
        <p className="mt-1 text-sm text-gray-500">Track execution across all meetings</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Active ({grouped.active.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Owner</th>
                <th>Meeting</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grouped.active.map((todo) => (
                <tr key={todo.id} className="hover:bg-gray-50">
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{todo.title}</span>
                      {todo.carriedFrom && <span className="badge-yellow text-xs">Carried</span>}
                    </div>
                    {todo.description && <p className="text-xs text-gray-500 mt-0.5">{todo.description}</p>}
                  </td>
                  <td className="text-gray-500">{todo.owner?.name}</td>
                  <td>
                    <Link href={`/meetings/${todo.meetingId}`} className="text-primary-600 hover:underline text-xs">
                      {todo.meeting?.title}
                    </Link>
                  </td>
                  <td className={`text-gray-500 ${todo.dueDate && new Date(todo.dueDate) < new Date() ? 'text-red-600 font-medium' : ''}`}>
                    {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    {todo.meeting?.status === 'ACTIVE' ? (
                      <select
                        className="select text-xs w-32"
                        value={todo.status}
                        onChange={e => handleUpdateStatus(todo.id, e.target.value)}
                      >
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                        <option value="CARRY_FORWARD">Carry Forward</option>
                      </select>
                    ) : (
                      <StatusBadge status={todo.status} />
                    )}
                  </td>
                </tr>
              ))}
              {grouped.active.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-500 py-8">No active todos</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <details className="group">
        <summary className="cursor-pointer text-lg font-semibold text-gray-900 mb-3">
          Completed ({grouped.done.length})
        </summary>
        <div className="table-container mt-3">
          <table>
            <thead>
              <tr><th>Title</th><th>Owner</th><th>Meeting</th><th>Status</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grouped.done.map((todo) => (
                <tr key={todo.id} className="opacity-60">
                  <td className="text-gray-900">{todo.title}</td>
                  <td className="text-gray-500">{todo.owner?.name}</td>
                  <td className="text-gray-500">{todo.meeting?.title}</td>
                  <td><StatusBadge status={todo.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
