import React from 'react';
import { TrendingUp, Users, Briefcase, Activity, IndianRupee } from 'lucide-react';
import { adminStats } from '../../data/admin';
import { StatCard } from '../../components/common/Card';

export default function AdminReports() {
  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} iconBg="bg-violet-50 text-violet-600" value={adminStats.totalUsers.toLocaleString()} label="Total Users" change={adminStats.monthlyGrowth.users} />
        <StatCard icon={Briefcase} iconBg="bg-blue-50 text-blue-600" value={adminStats.totalServices} label="Total Services" change={adminStats.monthlyGrowth.services} />
        <StatCard icon={Activity} iconBg="bg-green-50 text-green-600" value={adminStats.totalBookings.toLocaleString()} label="Total Bookings" change={adminStats.monthlyGrowth.bookings} />
        <StatCard icon={IndianRupee} iconBg="bg-amber-50 text-amber-600" value={`₹${(adminStats.revenue / 100000).toFixed(1)}L`} label="Revenue" change={adminStats.monthlyGrowth.revenue} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Monthly Growth</h3>
          <div className="space-y-3">
            {Object.entries(adminStats.monthlyGrowth).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize text-slate-600">{key}</span>
                  <span className="font-medium text-green-600">+{val}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.min(val * 4, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">User Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Clients', count: adminStats.totalClients, color: 'bg-violet-500', pct: Math.round((adminStats.totalClients / adminStats.totalUsers) * 100) },
              { label: 'Freelancers', count: adminStats.totalFreelancers, color: 'bg-indigo-400', pct: Math.round((adminStats.totalFreelancers / adminStats.totalUsers) * 100) },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-medium">{item.count} ({item.pct}%)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
