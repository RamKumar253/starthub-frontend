import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Briefcase, GraduationCap,
  ArrowRight, CheckCircle, Sparkles,
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';

const roles = [
  {
    key:         'admin',
    icon:        ShieldCheck,
    title:       'Super Admin',
    subtitle:    'Platform Management',
    description: 'Manage the entire platform, users, freelancers, services, and system settings.',
    features:    ['Full platform control', 'User management', 'Analytics & reports', 'System settings'],
    actions:     [{ label: 'Login as Admin', to: '/admin/login', variant: 'dark' }],
    gradient:    'from-slate-700 to-slate-900',
    iconBg:      'bg-slate-800 text-white',
    borderHover: 'hover:border-slate-400',
    ring:        '',
  },
  {
    key:         'freelancer',
    icon:        Briefcase,
    title:       'Freelancer',
    subtitle:    'Offer Skills & Services',
    description: 'Create your profile, list your services, and connect with clients looking for your skills.',
    features:    ['Create service listings', 'Manage bookings', 'Build your portfolio', 'Earn from projects'],
    actions:     [
      { label: 'Register Free',  to: '/freelancer/register', variant: 'primary' },
      { label: 'Login',          to: '/freelancer/login',    variant: 'outline' },
    ],
    gradient:    'from-violet-600 to-indigo-700',
    iconBg:      'bg-violet-600 text-white',
    borderHover: 'hover:border-violet-400',
    ring:        'ring-2 ring-violet-400 ring-offset-2',
    badge:       'Most Popular',
  },
  {
    key:         'client',
    icon:        GraduationCap,
    title:       'Client / Student',
    subtitle:    'Find Talent & Get Work Done',
    description: 'Browse talented student freelancers, book services, and manage your projects.',
    features:    ['Browse 800+ services', 'Book freelancers', 'Track project progress', 'Manage all bookings'],
    actions:     [
      { label: 'Register Free',  to: '/client/register', variant: 'primary' },
      { label: 'Login',          to: '/client/login',    variant: 'outline' },
    ],
    gradient:    'from-teal-500 to-emerald-600',
    iconBg:      'bg-teal-600 text-white',
    borderHover: 'hover:border-teal-400',
    ring:        '',
  },
];

export default function SelectRole() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/40 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-sm font-semibold px-4 py-2 rounded-full border border-violet-100 mb-6">
            <Sparkles size={14} className="text-violet-500" />
            Choose Your Path
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Who Are You?
          </h1>
          <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
            Select your role to get a tailored experience designed just for you.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {roles.map(role => (
            <div
              key={role.key}
              className={`
                relative bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden
                transition-all duration-300 hover:shadow-card-xl hover:-translate-y-2
                ${role.borderHover}
                ${role.badge ? role.ring : ''}
              `}
              onMouseEnter={() => setHovered(role.key)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Popular badge */}
              {role.badge && (
                <div className="absolute top-4 right-4 bg-violet-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide z-10">
                  {role.badge}
                </div>
              )}

              {/* Gradient header */}
              <div className={`h-24 bg-gradient-to-br ${role.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${role.iconBg} transition-transform duration-300 ${hovered === role.key ? 'scale-110' : ''}`}>
                  <role.icon size={28} />
                </div>
              </div>

              <div className="px-7 pt-12 pb-7">
                <h2 className="text-xl font-extrabold text-slate-900 mb-1 text-center">{role.title}</h2>
                <p className="text-sm font-semibold text-violet-600 mb-3 text-center">{role.subtitle}</p>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 text-center">{role.description}</p>

                {/* Features */}
                <ul className="space-y-2.5 mb-7">
                  {role.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="space-y-2">
                  {role.actions.map(action => (
                    <Button
                      key={action.label}
                      variant={action.variant}
                      fullWidth
                      onClick={() => navigate(action.to)}
                      id={`role-${role.key}-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {action.label} <ArrowRight size={15} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
