import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Card({ children, className = '', hover = false, padding = true, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-slate-100 shadow-card
        ${hover ? 'hover:shadow-card-lg hover:-translate-y-1 hover:border-violet-100 transition-all duration-300 cursor-pointer' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-6 pt-5 pb-4 border-b border-slate-50 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ icon: Icon, iconBg, value, label, change, className = '', onClick }) {
  const isPositive = change >= 0;
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 shadow-card p-5 transition-all duration-200 hover:shadow-card-md hover:border-slate-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={21} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}>
            {isPositive
              ? <TrendingUp size={11} />
              : <TrendingDown size={11} />
            }
            {isPositive ? '+' : ''}{change}%
          </div>
        )}
      </div>
      <div className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">{value}</div>
      <div className="text-sm text-slate-500 font-medium">{label}</div>
    </div>
  );
}
