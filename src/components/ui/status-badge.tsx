const statusColors: Record<string, string> = {
  // Todo
  NOT_STARTED: 'badge-gray',
  IN_PROGRESS: 'badge-blue',
  DONE: 'badge-green',
  CARRY_FORWARD: 'badge-yellow',
  // Issue
  OPEN: 'badge-red',
  SOLVED: 'badge-green',
  // Rock
  ON_TRACK: 'badge-green',
  OFF_TRACK: 'badge-red',
  DROPPED: 'badge-gray',
  // Scorecard
  MISSED: 'badge-red',
  // Meeting
  ACTIVE: 'badge-green',
  ARCHIVED: 'badge-gray',
  // AI
  PENDING: 'badge-yellow',
  APPLIED: 'badge-green',
  REJECTED: 'badge-red',
  // Priority
  LOW: 'badge-gray',
  MEDIUM: 'badge-blue',
  HIGH: 'badge-yellow',
  CRITICAL: 'badge-red',
};

const statusLabels: Record<string, string> = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  CARRY_FORWARD: 'Carry Forward',
  OPEN: 'Open',
  SOLVED: 'Solved',
  ON_TRACK: 'On Track',
  OFF_TRACK: 'Off Track',
  DROPPED: 'Dropped',
  MISSED: 'Missed',
  ACTIVE: 'Active',
  ARCHIVED: 'Archived',
  PENDING: 'Pending',
  APPLIED: 'Applied',
  REJECTED: 'Rejected',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={statusColors[status] || 'badge-gray'}>
      {statusLabels[status] || status}
    </span>
  );
}
