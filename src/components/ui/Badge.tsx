interface BadgeProps {
  variant?: 'prototype' | 'pilot' | 'deployed' | 'admin' | 'faculty' | 'student' | 'viewer' | 'active' | 'pending' | 'default';
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

const variantClasses: Record<string, string> = {
  prototype: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  pilot:     'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  deployed:  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  admin:     'bg-gcu-purple/10 text-gcu-purple dark:bg-gcu-purple/20 dark:text-purple-300',
  faculty:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  student:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  viewer:    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  active:    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  pending:   'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  default:   'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export function Badge({ variant = 'default', children, size = 'sm' }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${sizeClass} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    prototype: '⚗ Prototype',
    pilot: '🚀 Pilot',
    deployed: '✅ Deployed',
  };
  return (
    <Badge variant={status as 'prototype' | 'pilot' | 'deployed'}>
      {labels[status] ?? status}
    </Badge>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const labels: Record<string, string> = {
    admin: '⚡ Admin',
    faculty: '🎓 Faculty',
    student: '🌱 Student',
    viewer: '👁 Viewer',
  };
  return (
    <Badge variant={role as 'admin' | 'faculty' | 'student' | 'viewer'}>
      {labels[role] ?? role}
    </Badge>
  );
}
