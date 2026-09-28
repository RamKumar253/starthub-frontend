import React from 'react';
import { PackageSearch } from 'lucide-react';

export default function EmptyState({
  icon: Icon = PackageSearch,
  title,
  description,
  action,
  size = 'default',
}) {
  const sizeMap = {
    sm:      { wrapper: 'py-10', icon: 'w-12 h-12', iconSize: 24, title: 'text-base', desc: 'text-xs' },
    default: { wrapper: 'py-16', icon: 'w-16 h-16', iconSize: 32, title: 'text-lg',   desc: 'text-sm' },
    lg:      { wrapper: 'py-24', icon: 'w-20 h-20', iconSize: 40, title: 'text-xl',   desc: 'text-base' },
  };
  const s = sizeMap[size] || sizeMap.default;

  return (
    <div className={`flex flex-col items-center justify-center ${s.wrapper} px-4 text-center animate-fade-in`}>
      {/* Icon with gradient ring */}
      <div className={`${s.icon} rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center mb-5 text-slate-400 shadow-sm`}>
        <Icon size={s.iconSize} strokeWidth={1.5} />
      </div>

      <h3 className={`${s.title} font-bold text-slate-700 mb-2`}>{title}</h3>

      {description && (
        <p className={`${s.desc} text-slate-500 mb-6 max-w-sm leading-relaxed`}>
          {description}
        </p>
      )}

      {action && <div className="flex flex-col sm:flex-row gap-3">{action}</div>}
    </div>
  );
}
