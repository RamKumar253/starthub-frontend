import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Eye, EyeOff, Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function FreelancerRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/freelancer/dashboard'); }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/50 to-indigo-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-violet-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute top-[30%] left-[20%] w-72 h-72 bg-fuchsia-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up my-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Start<span className="text-violet-600">Hub</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Join as Freelancer</h1>
          <p className="text-slate-500 mt-2 text-sm">Offer your skills and earn on StartHub</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="Arjun Sharma"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              required
            />
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
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Primary Skill / Category</label>
              <div className="relative group">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors pointer-events-none" />
                <select
                  className="input-field pl-9 appearance-none"
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Content Writing">Content Writing</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-9 pr-10"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  minLength={6}
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

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                <span className="text-xs text-slate-500 leading-relaxed">
                  I agree to StartHub's{' '}
                  <a href="#" className="text-violet-600 font-semibold hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-violet-600 font-semibold hover:underline">Privacy Policy</a>.
                </span>
              </label>
            </div>

            <Button type="submit" fullWidth disabled={loading} size="lg" className="mt-4 text-base">
              {loading ? 'Creating Account...' : 'Sign Up Free'} <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100/60 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/freelancer/login" className="text-violet-600 font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
