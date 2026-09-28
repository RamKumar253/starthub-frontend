import React, { useState } from 'react';
import { Calendar, Search, Clock, IndianRupee, CheckCircle } from 'lucide-react';
import { freelancerBookings } from '../../data/bookings';
import BookingCard from '../../components/common/BookingCard';
import EmptyState from '../../components/common/EmptyState';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const TABS = ['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
const TAB_LABELS = {
  all: 'All', pending: 'Pending', confirmed: 'Confirmed',
  in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled',
};

export default function FreelancerBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search,    setSearch]    = useState('');
  const [bookings,  setBookings]  = useState(freelancerBookings);

  const filtered = bookings.filter(b => {
    const matchTab    = activeTab === 'all' || b.status === activeTab;
    const matchSearch = !search ||
      b.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      b.clientName.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleAction = (action, bookingId) => {
    setBookings(prev => prev.map(b =>
      b.id !== bookingId ? b : { ...b, status: action === 'accept' ? 'confirmed' : 'cancelled' }
    ));
  };

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === 'all' ? bookings.length : bookings.filter(b => b.status === t).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Bookings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage incoming booking requests from clients</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total',     count: bookings.length,                                              color: 'bg-slate-50 border-slate-200 text-slate-700' },
          { label: 'Pending',   count: bookings.filter(b => b.status === 'pending').length,          color: 'bg-amber-50 border-amber-200 text-amber-700' },
          { label: 'Active',    count: bookings.filter(b => ['confirmed','in_progress'].includes(b.status)).length, color: 'bg-violet-50 border-violet-200 text-violet-700' },
          { label: 'Completed', count: bookings.filter(b => b.status === 'completed').length,        color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
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
        placeholder="Search by service or client name..."
        id="freelancer-bookings-search"
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => (
          <button
            key={tab}
            id={`freelancer-tab-${tab}`}
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

      {/* Pending alert */}
      {counts.pending > 0 && activeTab !== 'pending' && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <Clock size={16} className="text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800 font-medium flex-1">
            You have <strong>{counts.pending}</strong> pending booking request{counts.pending > 1 ? 's' : ''} waiting for your response.
          </p>
          <Button size="sm" variant="ghost" onClick={() => setActiveTab('pending')} className="text-amber-700 hover:bg-amber-100">
            View
          </Button>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={`No ${TAB_LABELS[activeTab].toLowerCase()} bookings`}
          description={search
            ? `No bookings matching "${search}". Try a different search.`
            : 'When clients book your services, they will appear here.'
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              role="freelancer"
              onAction={handleAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}
