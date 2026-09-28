import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Mail, Lock, ArrowRight, Activity } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dark mode background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-violet-900/20 rounded-full blur-[100px] opacity-50 mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-900/20 rounded-full blur-[100px] opacity-50 mix-blend-screen animate-blob animation-delay-2000" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 text-center border-b border-slate-800">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner border border-slate-600/50 relative group">
              <ShieldCheck size={30} className="text-violet-400 group-hover:scale-110 transition-transform" />
              <div className="absolute top-[-4px] right-[-4px] w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-800 animate-pulse" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">System Access</h1>
            <p className="text-slate-400 text-sm mt-1 font-medium flex items-center justify-center gap-1.5">
              <Activity size={13} className="text-emerald-500" />
              StartHub Control Panel
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-1.5 block">Admin Email</label>
                <div className="relative group">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                  <input
                    type="email"
                    className="w-full pl-9 pr-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm"
                    placeholder="admin@starthub.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300 mb-1.5 block">Security Key</label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-9 pr-10 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Demo hint */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3.5 text-xs text-slate-400">
                <p className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-violet-400" />
                  Demo Mode
                </p>
                <p>Use any credentials to authenticate and access the admin dashboard.</p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-900/50 mt-6 disabled:opacity-70"
              >
                {loading ? 'Authenticating...' : 'Authorize Access'} <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <button 
                onClick={() => navigate('/')} 
                className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
              >
                ← Return to Public Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
