import React, { useState } from 'react';
import { freelancers } from '../../data/freelancers';
import { Star, MapPin, CheckCircle, Briefcase, MoreVertical } from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import { useToast } from '../../components/common/Toast';

export default function AdminFreelancers() {
  const toast = useToast();
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('all');

  const filtered = freelancers.filter(f => {
    const q = search.toLowerCase();
    const matchSearch = !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q) || (f.email && f.email.toLowerCase().includes(q));
    const matchFilter = filter === 'all' || (filter === 'available' && f.isAvailable) || (filter === 'busy' && !f.isAvailable);
    return matchSearch && matchFilter;
  });

  const counts = {
    all:       freelancers.length,
    available: freelancers.filter(f => f.isAvailable).length,
    busy:      freelancers.filter(f => !f.isAvailable).length,
  };

  const handleAction = (label) => toast.info(`${label} — feature coming soon`);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Freelancers</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} freelancer{filtered.length !== 1 ? 's' : ''} shown</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total',     k: 'all',       color: 'bg-slate-50 border-slate-200 text-slate-700' },
          { label: 'Available', k: 'available',  color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'Busy',      k: 'busy',       color: 'bg-amber-50 border-amber-200 text-amber-700' },
        ].map(({ label, k, color }) => (
          <button
            key={k}
            onClick={() => setFilter(filter === k ? 'all' : k)}
            className={`rounded-2xl border p-3 text-center transition-all ${color} ${filter === k ? 'ring-2 ring-violet-400 ring-offset-1' : ''}`}
          >
            <p className="text-xl font-extrabold">{counts[k]}</p>
            <p className="text-xs font-semibold opacity-70 mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={e => setSearch(e.target.value)}
        onClear={() => setSearch('')}
        placeholder="Search freelancers by name, category, or email..."
        id="admin-freelancers-search"
      />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Freelancer', 'Category', 'Skills', 'Rating', 'Projects', 'Status', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar src={f.avatar} name={f.name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">{f.name}</p>
                        <p className="text-xs text-slate-400">{f.email || `${f.name.toLowerCase().replace(' ', '.')}@starthub.com`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-violet-50 text-violet-700 border border-violet-100 px-2 py-0.5 rounded-full font-semibold">
                      {f.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {f.skills.slice(0, 2).map(s => (
                        <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                      {f.skills.length > 2 && (
                        <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">+{f.skills.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-slate-700">{f.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold text-slate-700">{f.completedProjects}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge status={f.isAvailable ? 'active' : 'inactive'} showDot>
                      {f.isAvailable ? 'Available' : 'Busy'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleAction(`More options for ${f.name}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">No freelancers match your search.</div>
        )}
      </div>
    </div>
  );
}
