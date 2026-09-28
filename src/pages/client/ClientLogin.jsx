import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function ClientLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/client/dashboard'); }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/50 to-emerald-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-80 h-80 bg-violet-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Start<span className="text-violet-600">Hub</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back!</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to your client account</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="you@university.edu"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-violet-600 hover:text-violet-700">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-9 pr-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-3.5 text-xs text-teal-800 flex items-start gap-3">
              <div className="mt-0.5"><Zap size={14} className="text-teal-500 fill-teal-500" /></div>
              <div>
                <p className="font-bold mb-0.5">Demo Mode Active</p>
                <p className="opacity-80">Use any credentials to login and explore the client dashboard.</p>
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading} size="lg" className="mt-2 text-base">
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100/60 text-center space-y-4">
            <p className="text-sm text-slate-500">
              New to StartHub?{' '}
              <Link to="/client/register" className="text-violet-600 font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
