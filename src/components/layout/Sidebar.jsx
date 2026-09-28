import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Briefcase, Calendar, Settings,
  LogOut, User, FileText, BarChart2, Menu, X, Zap,
  ChevronLeft, ChevronRight, Plus,
} from 'lucide-react';

const adminLinks = [
  { to: '/admin/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users',      icon: Users,            label: 'Users' },
  { to: '/admin/freelancers', icon: Briefcase,        label: 'Freelancers' },
  { to: '/admin/services',   icon: FileText,          label: 'Services' },
  { to: '/admin/reports',    icon: BarChart2,         label: 'Reports' },
  { to: '/admin/settings',   icon: Settings,          label: 'Settings' },
];

const freelancerLinks = [
  { to: '/freelancer/dashboard',       icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/freelancer/profile',         icon: User,            label: 'My Profile' },
  { to: '/freelancer/services',        icon: Briefcase,       label: 'My Services' },
  { to: '/freelancer/bookings',        icon: Calendar,        label: 'My Bookings' },
];

const clientLinks = [
  { to: '/client/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/client/freelancers',  icon: Users,           label: 'Browse Freelancers' },
  { to: '/client/services',     icon: Briefcase,       label: 'Browse Services' },
  { to: '/client/bookings',     icon: Calendar,        label: 'My Bookings' },
];

const linkMap   = { admin: adminLinks, freelancer: freelancerLinks, client: clientLinks };

const roleConfig = {
  admin:      { gradient: 'from-slate-800 to-slate-900',       accentColor: 'text-slate-300', label: 'Admin Portal' },
  freelancer: { gradient: 'from-violet-700 to-indigo-800',     accentColor: 'text-violet-200', label: 'Freelancer' },
  client:     { gradient: 'from-indigo-700 to-violet-800',     accentColor: 'text-indigo-200', label: 'Client' },
};

export default function Sidebar({ role, userName = 'User' }) {
  const [collapsed,   setCollapsed]  = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const links     = linkMap[role] || [];
  const config    = roleConfig[role] || roleConfig.admin;

  const handleLogout = () => navigate('/');
  const initial       = userName.charAt(0).toUpperCase();

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/');

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Header */}
      <div className={`bg-gradient-to-br ${config.gradient} px-4 py-4 flex items-center justify-between flex-shrink-0`}>
        <div className={`flex items-center gap-2.5 min-w-0 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
            <Zap size={15} className="text-white fill-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-none">StartHub</p>
              <p className={`${config.accentColor} text-xs mt-0.5 opacity-80`}>{config.label}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <ChevronLeft size={14} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-white rounded-full border border-slate-200 shadow-sm items-center justify-center text-slate-500 hover:text-violet-600 transition-colors"
          >
            <ChevronRight size={12} />
          </button>
        )}
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate leading-tight">{userName}</p>
              <p className="text-xs text-slate-400 capitalize mt-0.5">{role}</p>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="px-3 py-3 border-b border-slate-100 flex justify-center flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
            {initial}
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {links.map(({ to, icon: Icon, label }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150
                ${collapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-violet-50 text-violet-700 border border-violet-100 shadow-[0_0_0_1px_rgba(124,58,237,0.08)]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-colors ${active ? 'text-violet-600' : 'text-slate-400 group-hover:text-slate-600'}`}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick action for freelancer */}
      {!collapsed && role === 'freelancer' && (
        <div className="px-3 pb-2">
          <button
            onClick={() => navigate('/freelancer/services/create')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 active:scale-[0.98] transition-all shadow-violet"
          >
            <Plus size={14} /> New Service
          </button>
        </div>
      )}

      {/* Logout */}
      <div className="p-3 border-t border-slate-100 flex-shrink-0">
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`
            group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-slate-500 hover:bg-red-50 hover:text-red-600
            transition-all duration-150
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={18} className="flex-shrink-0 group-hover:text-red-500 transition-colors" />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 shadow-card">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Zap size={13} className="text-white fill-white" />
          </div>
          <span className="font-extrabold text-slate-900 text-sm tracking-tight">
            Start<span className="gradient-text">Hub</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`
        lg:hidden fixed top-0 left-0 z-20 h-full w-64 bg-white shadow-card-xl
        transform transition-transform duration-300 ease-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={`
        relative hidden lg:flex flex-col bg-white border-r border-slate-100 h-screen sticky top-0
        transition-all duration-300 ease-out flex-shrink-0
        ${collapsed ? 'w-[68px]' : 'w-60'}
      `}>
        <SidebarContent />
      </div>
    </>
  );
}
