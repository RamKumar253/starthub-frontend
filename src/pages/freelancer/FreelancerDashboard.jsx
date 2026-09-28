import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, Calendar, CheckCircle, Clock, ArrowRight,
  Plus, Star, IndianRupee, TrendingUp, Users, Zap,
} from 'lucide-react';
import { StatCard } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { freelancerBookings } from '../../data/bookings';
import { services } from '../../data/services';

export default function FreelancerDashboard() {
  const navigate = useNavigate();

  const myServices   = services.filter(s => s.freelancerId === 'f1');
  const pending      = freelancerBookings.filter(b => b.status === 'pending').length;
  const active       = freelancerBookings.filter(b => ['in_progress', 'confirmed'].includes(b.status)).length;
  const completed    = freelancerBookings.filter(b => b.status === 'completed').length;
  const totalEarnings= freelancerBookings.filter(b => b.status === 'completed').reduce((s, b) => s + b.price, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 -left-6 w-40 h-40 bg-white/5 rounded-full" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-base">🚀</div>
              <span className="text-violet-200 text-sm font-semibold">Freelancer Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Welcome back, Arjun!</h1>
            <p className="text-violet-200 text-sm max-w-md">
              {pending > 0
                ? `You have ${pending} new booking request${pending > 1 ? 's' : ''} waiting for your response.`
                : `You have ${active} active project${active !== 1 ? 's' : ''} in progress.`}
            </p>
          </div>
          <Button
            className="bg-white/20 text-white border border-white/30 hover:bg-white/30 flex-shrink-0"
            onClick={() => navigate('/freelancer/services/create')}
          >
            <Plus size={15} /> Add New Service
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase}   iconBg="bg-violet-50 text-violet-600"   value={myServices.length}  label="Active Services" />
        <StatCard icon={Clock}       iconBg="bg-amber-50 text-amber-600"     value={pending}             label="Pending Requests" />
        <StatCard icon={Calendar}    iconBg="bg-blue-50 text-blue-600"       value={active}              label="Active Bookings" />
        <StatCard icon={CheckCircle} iconBg="bg-emerald-50 text-emerald-600" value={completed}           label="Completed" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Recent Bookings ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Bookings</h2>
            <Button size="sm" variant="ghost" onClick={() => navigate('/freelancer/bookings')}>
              View All <ArrowRight size={14} />
            </Button>
          </div>
          <div className="divide-y divide-slate-50">
            {freelancerBookings.slice(0, 4).map(booking => (
              <div key={booking.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                  <Users size={15} className="text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{booking.serviceName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Client: {booking.clientName}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900">₹{booking.price.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{booking.deliveryTime}d delivery</p>
                  </div>
                  <Badge status={booking.status} showDot />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-4">
          {/* Earnings */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee size={16} className="text-emerald-200" />
              <span className="text-sm font-semibold text-emerald-100">Total Earnings</span>
            </div>
            <div className="text-3xl font-extrabold mb-1">₹{totalEarnings.toLocaleString()}</div>
            <p className="text-sm text-emerald-100">From {completed} completed project{completed !== 1 ? 's' : ''}</p>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-slate-900">Your Rating</span>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900">4.8</span>
              <span className="text-slate-400 text-sm pb-1">/ 5.0</span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} className={s <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-200 text-amber-200'} />
              ))}
            </div>
            <p className="text-xs text-slate-400">Based on 24 reviews</p>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
            <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Create New Service', icon: Plus,      path: '/freelancer/services/create', accent: 'violet' },
                { label: 'Edit Profile',       icon: Zap,       path: '/freelancer/profile',         accent: 'slate' },
                { label: 'View Bookings',      icon: Calendar,  path: '/freelancer/bookings',        accent: 'slate' },
              ].map(({ label, icon: Icon, path, accent }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors group text-sm font-semibold ${
                    accent === 'violet'
                      ? 'bg-violet-50 border-violet-100 text-violet-700 hover:bg-violet-100'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={15} />
                  <span className="flex-1 text-left">{label}</span>
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── My Services Preview ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card">
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">My Services</h2>
          <Button size="sm" variant="ghost" onClick={() => navigate('/freelancer/services')}>
            Manage <ArrowRight size={14} />
          </Button>
        </div>
        <div className="divide-y divide-slate-50">
          {myServices.slice(0, 3).map(service => (
            <div key={service.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl flex-shrink-0">
                ⚡
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{service.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-400">{service.category}</span>
                  <span className="text-xs font-semibold text-slate-700">₹{service.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-700">{service.rating}</span>
                </div>
                <Badge status={service.status} showDot />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
