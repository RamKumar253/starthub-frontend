import React from 'react';
import {
  Users, Briefcase, Activity, FileText,
  CheckCircle, Clock, UserPlus, TrendingUp,
  ArrowRight, Star,
} from 'lucide-react';
import { StatCard } from '../../components/common/Card';
import { adminStats, adminUsers, recentActivity } from '../../data/admin';
import { freelancers } from '../../data/freelancers';
import { services } from '../../data/services';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

const activityIcon = (type) => ({
  new_user:    { icon: UserPlus,     bg: 'bg-violet-50 text-violet-600' },
  new_booking: { icon: Clock,        bg: 'bg-blue-50 text-blue-600' },
  completed:   { icon: CheckCircle,  bg: 'bg-emerald-50 text-emerald-600' },
  default:     { icon: Activity,     bg: 'bg-amber-50 text-amber-600' },
}[type] || { icon: Activity, bg: 'bg-amber-50 text-amber-600' });

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Platform Overview</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, Super Admin — here's a real-time snapshot of StartHub.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-semibold flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Platform Healthy
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}    iconBg="bg-violet-50 text-violet-600" value={adminStats.totalUsers.toLocaleString()} label="Total Users"      change={adminStats.monthlyGrowth?.users} />
        <StatCard icon={Briefcase} iconBg="bg-blue-50 text-blue-600"   value={adminStats.totalFreelancers}             label="Freelancers"     change={5.2} />
        <StatCard icon={FileText} iconBg="bg-teal-50 text-teal-600"    value={adminStats.totalServices}                label="Services"        change={adminStats.monthlyGrowth?.services} />
        <StatCard icon={Activity} iconBg="bg-amber-50 text-amber-600"  value={adminStats.activeBookings}               label="Active Bookings" change={adminStats.monthlyGrowth?.bookings} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Recent Users table ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Users</h2>
            <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full font-medium">
              {adminUsers.length} shown
            </span>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['User', 'Role', 'Status', 'Joined'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {adminUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={user.role === 'freelancer' ? 'active' : 'confirmed'}>
                        {user.role === 'freelancer' ? 'Freelancer' : 'Client'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={user.status} showDot />
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{user.joinedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Recent Activity ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50">
            <h2 className="font-bold text-slate-900">Recent Activity</h2>
          </div>
          <div className="p-4 space-y-2">
            {recentActivity.map(item => {
              const { icon: Icon, bg } = activityIcon(item.type);
              return (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-snug font-medium">{item.message}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Platform Overview ── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Freelancers */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50">
            <h2 className="font-bold text-slate-900">Top Freelancers</h2>
          </div>
          <div className="p-4 space-y-2">
            {freelancers.slice(0, 4).map((f, i) => (
              <div key={f.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <Avatar src={f.avatar} name={f.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{f.name}</p>
                  <p className="text-xs text-slate-400 truncate">{f.category}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex-shrink-0">
                  <Star size={10} className="fill-amber-500 text-amber-500" />
                  <span className="text-xs font-bold text-amber-700">{f.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50">
            <h2 className="font-bold text-slate-900">Top Services</h2>
          </div>
          <div className="p-4 space-y-2">
            {services.slice(0, 4).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-base flex-shrink-0">
                  ⚡
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{s.title}</p>
                  <p className="text-xs text-slate-400 truncate">{s.freelancerName}</p>
                </div>
                <div className="bg-violet-50 text-violet-700 border border-violet-200 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0">
                  ₹{s.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
