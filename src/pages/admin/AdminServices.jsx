import React, { useState } from 'react';
import { services } from '../../data/services';
import SearchBar from '../../components/common/SearchBar';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

export default function AdminServices() {
  const [search, setSearch] = useState('');
  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Services</h1>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..." className="w-72" />
      </div>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {['Service', 'Freelancer', 'Category', 'Price', 'Delivery', 'Status'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900 max-w-xs truncate">{s.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.reviews} reviews</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar src={s.freelancerAvatar} name={s.freelancerName} size="xs" />
                    <span className="text-sm text-slate-600">{s.freelancerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{s.category}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">₹{s.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{s.deliveryTime}d</td>
                <td className="px-6 py-4"><Badge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
