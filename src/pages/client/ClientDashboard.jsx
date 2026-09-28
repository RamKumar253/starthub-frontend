import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, CheckCircle, ArrowRight, Users, Briefcase,
  IndianRupee, TrendingUp, Search, Star, Zap,
} from 'lucide-react';
import { StatCard } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { bookings } from '../../data/bookings';
import { services } from '../../data/services';

export default function ClientDashboard() {
  const navigate    = useNavigate();
  const myBookings  = bookings.filter(b => b.clientId === 'c1');
  const pending     = myBookings.filter(b => b.status === 'pending').length;
  const active      = myBookings.filter(b => b.status === 'in_progress' || b.status === 'confirmed').length;
  const completed   = myBookings.filter(b => b.status === 'completed').length;
  const totalSpent  = myBookings.filter(b => b.status === 'completed').reduce((s, b) => s + b.price, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 -left-6 w-48 h-48 bg-white/5 rounded-full" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-base">👋</div>
              <span className="text-violet-200 text-sm font-semibold">Welcome back</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Hello, Rohit!</h1>
            <p className="text-violet-200 text-sm max-w-md">
              You have {active > 0 ? `${active} active project${active > 1 ? 's' : ''} in progress` : 'no active projects'}
              {pending > 0 ? ` and ${pending} pending booking${pending > 1 ? 's' : ''}` : ''}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <Button
              variant="white"
              size="sm"
              onClick={() => navigate('/client/freelancers')}
            >
              <Users size={15} /> Find Freelancers
            </Button>
            <Button
              className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
              size="sm"
              onClick={() => navigate('/client/services')}
            >
              <Briefcase size={15} /> Browse Services
            </Button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar}     iconBg="bg-violet-50 text-violet-600"  value={myBookings.length} label="Total Bookings" />
        <StatCard icon={Clock}        iconBg="bg-amber-50 text-amber-600"    value={pending}           label="Pending" />
        <StatCard icon={TrendingUp}   iconBg="bg-blue-50 text-blue-600"      value={active}            label="Active" />
        <StatCard icon={CheckCircle}  iconBg="bg-emerald-50 text-emerald-600" value={completed}        label="Completed" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Bookings</h2>
            <Button size="sm" variant="ghost" onClick={() => navigate('/client/bookings')}>
              View All <ArrowRight size={14} />
            </Button>
          </div>
          <div className="divide-y divide-slate-50">
            {myBookings.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No bookings yet.{' '}
                <button onClick={() => navigate('/client/services')} className="text-violet-600 font-semibold hover:underline">
                  Browse services
                </button>
              </div>
            ) : myBookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                {/* Booking ID */}
                <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-violet-600">{booking.id.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{booking.serviceName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">by {booking.freelancerName}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900">₹{booking.price.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Due: {new Date(booking.requiredDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
                  </div>
                  <Badge status={booking.status} showDot />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Total Spent card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee size={16} className="text-slate-400" />
              <span className="text-sm font-semibold text-slate-300">Total Spent</span>
            </div>
            <div className="text-3xl font-extrabold mb-1">₹{totalSpent.toLocaleString()}</div>
            <p className="text-sm text-slate-400">Across {completed} completed project{completed !== 1 ? 's' : ''}</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
            <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => navigate('/client/services')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-50 border border-violet-100 text-violet-700 hover:bg-violet-100 transition-colors group"
              >
                <Search size={16} />
                <span className="text-sm font-semibold flex-1 text-left">Search Services</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => navigate('/client/freelancers')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors group"
              >
                <Users size={16} />
                <span className="text-sm font-semibold flex-1 text-left">Browse Freelancers</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => navigate('/client/bookings')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors group"
              >
                <Calendar size={16} />
                <span className="text-sm font-semibold flex-1 text-left">Track Bookings</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Recommended service */}
          {services[0] && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Trending Service</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl flex-shrink-0">
                  ⚡
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 line-clamp-2 mb-1">{services[0].title}</p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-700">{services[0].rating}</span>
                  </div>
                  <Button
                    size="xs"
                    fullWidth
                    onClick={() => navigate(`/client/services/${services[0].id}`)}
                  >
                    View Service
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
