import React from 'react';
import { useState } from 'react';
import { adminUsers } from '../../data/admin';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { Users, UserCheck, UserX, MoreVertical } from 'lucide-react';

export default function AdminUsers() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const base = adminUsers;
  const filtered = base.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || u.role === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all:        base.length,
    freelancer: base.filter(u => u.role === 'freelancer').length,
    client:     base.filter(u => u.role === 'client').length,
    active:     base.filter(u => u.status === 'active').length,
    inactive:   base.filter(u => u.status === 'inactive').length,
  };

  const handleAction = (label) => toast.info(`${label} — feature coming soon`);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} user{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <Button size="sm" onClick={() => handleAction('Invite User')} id="invite-user-btn">
          <Users size={15} /> Invite User
        </Button>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total',       k: 'all',        color: 'bg-slate-50 border-slate-200 text-slate-700' },
          { label: 'Freelancers', k: 'freelancer',  color: 'bg-violet-50 border-violet-200 text-violet-700' },
          { label: 'Clients',     k: 'client',      color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { label: 'Active',      k: 'active',      color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
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
        placeholder="Search by name or email..."
        id="admin-users-search"
      />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['User', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge status={u.role === 'freelancer' ? 'active' : 'confirmed'}>
                      {u.role === 'freelancer' ? 'Freelancer' : 'Client'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge status={u.status} showDot>{u.status === 'active' ? 'Active' : 'Inactive'}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">{u.joinedAt}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleAction(`Toggle status for ${u.name}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all"
                        title="Toggle status"
                      >
                        {u.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                      <button
                        onClick={() => handleAction(`More options for ${u.name}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        title="More options"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">
            No users match your search.
          </div>
        )}
      </div>
    </div>
  );
}
