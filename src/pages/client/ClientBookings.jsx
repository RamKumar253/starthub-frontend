import React, { useState } from 'react';
import { Calendar, Search, Briefcase, ArrowRight } from 'lucide-react';
import { bookings } from '../../data/bookings';
import BookingCard from '../../components/common/BookingCard';
import EmptyState from '../../components/common/EmptyState';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const TABS = ['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
const TAB_LABELS = {
  all:         'All',
  pending:     'Pending',
  confirmed:   'Confirmed',
  in_progress: 'In Progress',
  completed:   'Completed',
  cancelled:   'Cancelled',
};
const TAB_COLORS = {
  all:         '',
  pending:     'text-amber-700',
  confirmed:   'text-blue-700',
  in_progress: 'text-violet-700',
  completed:   'text-emerald-700',
  cancelled:   'text-red-600',
};

export default function ClientBookings() {
  const navigate   = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search,    setSearch]    = useState('');
  const myBookings  = bookings.filter(b => b.clientId === 'c1');

  const filtered = myBookings.filter(b => {
    const matchTab    = activeTab === 'all' || b.status === activeTab;
    const matchSearch = !search || b.serviceName.toLowerCase().includes(search.toLowerCase()) || b.freelancerName.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === 'all' ? myBookings.length : myBookings.filter(b => b.status === t).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Bookings</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage all your service bookings</p>
        </div>
        <Button onClick={() => navigate('/client/services')}>
          <Briefcase size={15} /> Browse Services
        </Button>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total',      count: myBookings.length,                                        color: 'bg-slate-50 border-slate-200 text-slate-700' },
          { label: 'Pending',    count: myBookings.filter(b => b.status === 'pending').length,    color: 'bg-amber-50 border-amber-200 text-amber-700' },
          { label: 'Active',     count: myBookings.filter(b => ['confirmed','in_progress'].includes(b.status)).length, color: 'bg-violet-50 border-violet-200 text-violet-700' },
          { label: 'Completed',  count: myBookings.filter(b => b.status === 'completed').length,  color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
        ].map(({ label, count, color }) => (
          <div key={label} className={`rounded-2xl border p-4 text-center ${color}`}>
            <p className="text-2xl font-extrabold">{count}</p>
            <p className="text-xs font-semibold mt-1 opacity-70">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={e => setSearch(e.target.value)}
        onClear={() => setSearch('')}
        placeholder="Search by service or freelancer name..."
        id="bookings-search"
      />

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => (
          <button
            key={tab}
            id={`tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
              ${activeTab === tab
                ? 'bg-violet-600 text-white shadow-violet'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }
            `}
          >
            {TAB_LABELS[tab]}
            {counts[tab] > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {counts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={`No ${TAB_LABELS[activeTab].toLowerCase()} bookings`}
          description={search
            ? `No bookings matching "${search}". Try a different search.`
            : "You haven't made any bookings yet. Browse services to find something you need."
          }
          action={
            <Button onClick={() => navigate('/client/services')}>
              <Briefcase size={15} /> Browse Services
            </Button>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(booking => (
            <BookingCard key={booking.id} booking={booking} role="client" />
          ))}
        </div>
      )}
    </div>
  );
}
