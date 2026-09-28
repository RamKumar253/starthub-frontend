import React from 'react';

const variants = {
  pending:     'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed:   'bg-blue-50 text-blue-700 border border-blue-200',
  in_progress: 'bg-violet-50 text-violet-700 border border-violet-200',
  completed:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled:   'bg-red-50 text-red-700 border border-red-200',
  active:      'bg-emerald-50 text-emerald-700 border border-emerald-200',
  inactive:    'bg-slate-100 text-slate-500 border border-slate-200',
  default:     'bg-slate-100 text-slate-600 border border-slate-200',
};

const dots = {
  pending:     'bg-amber-400',
  confirmed:   'bg-blue-500',
  in_progress: 'bg-violet-600',
  completed:   'bg-emerald-500',
  cancelled:   'bg-red-500',
  active:      'bg-emerald-500',
  inactive:    'bg-slate-400',
  default:     'bg-slate-400',
};

const labels = {
  pending:     'Pending',
  confirmed:   'Confirmed',
  in_progress: 'In Progress',
  completed:   'Completed',
  cancelled:   'Cancelled',
  active:      'Active',
  inactive:    'Inactive',
};

export default function Badge({ status, children, className = '', showDot = false }) {
  const style = variants[status] || variants.default;
  const dot   = dots[status]    || dots.default;
  const text  = children        || labels[status] || status;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${style} ${className}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />}
      {text}
    </span>
  );
}
