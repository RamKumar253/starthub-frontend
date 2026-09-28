import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, Shield, Zap, Users, CheckCircle,
  Briefcase, Code2, Palette, TrendingUp, Award, Clock,
  Search, ChevronRight, Sparkles, Globe, Heart,
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import { freelancers } from '../../data/freelancers';
import { services } from '../../data/services';

/* ─── DATA ─────────────────────────────────── */
const features = [
  { icon: Shield,   title: 'Verified Talent',    description: 'All freelancers are verified students from top colleges with proven skills and portfolios.',    color: 'text-violet-600 bg-violet-50 border-violet-100' },
  { icon: Zap,      title: 'Fast Delivery',       description: 'Get your projects done on time. Our freelancers are committed to meeting deadlines.',             color: 'text-amber-600 bg-amber-50 border-amber-100' },
  { icon: Award,    title: 'Quality Assured',     description: 'Every service is backed by a satisfaction guarantee. Pay only when you are happy.',               color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { icon: Users,    title: 'Growing Community',   description: 'Join thousands of students and clients building amazing projects together.',                       color: 'text-blue-600 bg-blue-50 border-blue-100' },
  { icon: TrendingUp, title: 'Affordable Pricing', description: 'Student freelancers offer competitive rates without compromising on quality.',                   color: 'text-rose-600 bg-rose-50 border-rose-100' },
  { icon: Clock,    title: 'Real-Time Updates',   description: 'Track your project progress with live status updates and direct messaging.',                      color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
];

const steps = [
  { num: '01', title: 'Create Your Account',     description: 'Sign up as a freelancer or client in minutes. Verify your student status and set up your profile.', icon: Users },
  { num: '02', title: 'Browse or List Services', description: 'Clients browse 800+ services; freelancers create detailed service listings with pricing and delivery.', icon: Briefcase },
  { num: '03', title: 'Book and Collaborate',    description: 'Confirm bookings, share project requirements, communicate directly, and get paid on completion.',    icon: CheckCircle },
];

const categories = [
  { icon: Code2,      label: 'Web Dev',     count: '120+', color: 'text-violet-600 bg-violet-50 border-violet-200 hover:bg-violet-100' },
  { icon: Palette,    label: 'Design',      count: '85+',  color: 'text-pink-600 bg-pink-50 border-pink-200 hover:bg-pink-100' },
  { icon: TrendingUp, label: 'Data Science', count: '60+', color: 'text-teal-600 bg-teal-50 border-teal-200 hover:bg-teal-100' },
  { icon: Briefcase,  label: 'Marketing',   count: '45+',  color: 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100' },
  { icon: Globe,      label: 'Content',     count: '70+',  color: 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100' },
  { icon: Heart,      label: 'UI/UX',       count: '55+',  color: 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100' },
];

const STATS = [
  { end: 1200, suffix: '+', label: 'Students' },
  { end: 850,  suffix: '+', label: 'Services' },
  { end: 3400, suffix: '+', label: 'Projects Done' },
  { end: 4.8,  suffix: '★', label: 'Avg Rating', isFloat: true },
];

/* ─── ANIMATED COUNTER ──────────────────────── */
function AnimatedCounter({ end, suffix, isFloat = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start    = performance.now();
          const animate  = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            const value    = isFloat ? +(end * eased).toFixed(1) : Math.floor(end * eased);
            setCount(value);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, isFloat]);

  return (
    <span ref={ref} className="tabular-nums">
      {isFloat ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── HERO SEARCH BAR ───────────────────────── */
function HeroSearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/client/services${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  const suggestions = ['React website', 'Logo design', 'Data analysis', 'Mobile app', 'Blog articles'];

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-white rounded-2xl shadow-2xl shadow-violet-900/20 border border-white/10 overflow-hidden p-1.5 gap-2">
        <div className="flex items-center gap-3 flex-1 pl-3">
          <Search size={18} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search services, skills, or freelancers..."
            className="flex-1 py-2 text-slate-800 placeholder-slate-400 bg-transparent outline-none text-sm font-medium"
          />
        </div>
        <Button type="submit" size="md" className="flex-shrink-0 rounded-xl">
          Search <ArrowRight size={15} />
        </Button>
      </div>
      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        <span className="text-slate-400 text-xs font-medium">Popular:</span>
        {suggestions.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => { setQuery(s); navigate('/client/services'); }}
            className="text-xs text-violet-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1 rounded-full transition-all duration-200"
          >
            {s}
          </button>
        ))}
      </div>
    </form>
  );
}

/* ─── MAIN COMPONENT ────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 pt-20 pb-28">
        {/* Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/25 text-violet-300 text-sm font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles size={14} className="text-violet-400" />
            The #1 platform for student freelancers in India
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.08] tracking-tight animate-slide-up">
            Connect with Top{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
              Student Talent
            </span>
            <br />Instantly
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            StartHub connects brilliant college students offering freelance services
            with clients who need quality work — fast, affordable, and reliable.
          </p>

          {/* Hero Search */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <HeroSearch />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              size="lg"
              onClick={() => navigate('/select-role')}
              className="bg-violet-600 hover:bg-violet-500 shadow-violet-lg text-base px-8 py-4 rounded-2xl"
            >
              Get Started Free <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/client/services')}
              className="text-base px-8 py-4 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Browse Services
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl font-extrabold text-white mb-1">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} isFloat={stat.isFloat} />
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Ribbon ── */}
      <section className="bg-white border-b border-slate-100 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-400 font-medium hidden sm:block">Browse by:</span>
            {categories.map(({ icon: Icon, label, count, color }) => (
              <button
                key={label}
                onClick={() => navigate('/client/services')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${color}`}
              >
                <Icon size={14} />
                {label}
                <span className="text-[10px] font-normal opacity-60">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Services ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-violet-100">
              <TrendingUp size={12} /> Popular Now
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Popular Services</h2>
            <p className="text-slate-500 mt-2">Handpicked services loved by our clients</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/client/services')} className="hidden sm:flex">
            View All <ChevronRight size={16} />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.slice(0, 4).map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-lg hover:-translate-y-1 hover:border-violet-100 transition-all duration-300 overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/client/services/${service.id}`)}
            >
              <div className={`h-28 bg-gradient-to-br from-violet-500 to-indigo-600 relative flex items-center justify-center`}>
                <span className="text-3xl opacity-40 group-hover:opacity-60 transition-all duration-300 group-hover:scale-110 select-none">
                  {['⚡', '🎨', '📱', '📊', '✏️', '✍️'][services.findIndex(s => s.id === service.id) % 6]}
                </span>
                <span className="absolute bottom-2 left-3 bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {service.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2 group-hover:text-violet-700 transition-colors">{service.title}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-700">{service.rating}</span>
                  <span className="text-xs text-slate-400">({service.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">₹{service.price.toLocaleString()}</span>
                  <Button size="xs" onClick={e => { e.stopPropagation(); navigate(`/client/book/${service.id}`); }}>
                    Book
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Button variant="secondary" onClick={() => navigate('/client/services')}>
            View All Services <ChevronRight size={16} />
          </Button>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white text-violet-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-violet-100 shadow-sm">
              <Sparkles size={12} /> Why StartHub
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Why Choose StartHub?
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Built specifically for the student ecosystem — affordable, fast, and community-driven.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card hover:shadow-card-lg hover:-translate-y-1 hover:border-violet-100 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${f.color}`}>
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Freelancers ── */}
      <section id="freelancers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-indigo-100">
              <Users size={12} /> Featured Talent
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Meet Our Freelancers</h2>
            <p className="text-slate-500 mt-2">Talented students ready to help with your next project</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/client/freelancers')} className="hidden sm:flex">
            View All <ChevronRight size={16} />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {freelancers.slice(0, 3).map((f, i) => {
            const gradients = ['from-violet-400 to-indigo-600', 'from-pink-400 to-rose-600', 'from-blue-400 to-cyan-600'];
            return (
              <div key={f.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-lg hover:-translate-y-1.5 hover:border-violet-100 transition-all duration-300 overflow-hidden group">
                <div className={`h-16 bg-gradient-to-r ${gradients[i]}`} />
                <div className="px-5 pb-5">
                  <div className="flex items-end gap-3 -mt-6 mb-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg flex-shrink-0">
                      <img src={f.avatar} alt={f.name} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                    </div>
                    <div className="pb-1 min-w-0">
                      <h3 className="font-bold text-slate-900 truncate">{f.name}</h3>
                      <p className="text-xs text-violet-600 font-semibold">{f.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{f.bio}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-slate-700">{f.rating}</span>
                      <span className="text-xs text-slate-400">({f.reviews})</span>
                    </div>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => navigate('/client/freelancers')}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" variant="secondary" onClick={() => navigate('/client/freelancers')}>
            View All Freelancers <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white/10 text-violet-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-white/10">
              <Zap size={12} className="fill-violet-400 text-violet-400" /> Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-400">Three simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 left-[60%] right-0 items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
                    <ChevronRight size={14} className="text-violet-500/40 -ml-1" />
                  </div>
                )}
                <div className="relative inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-violet-900/50 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                  <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dual CTA Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Join StartHub Today</h2>
            <p className="text-lg text-slate-500">Whether you're a creator or a client — we have a spot for you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* For Freelancers */}
            <div className="relative bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 rounded-3xl p-8 text-white overflow-hidden group">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-12 -left-8 w-48 h-48 bg-white/5 rounded-full" />
              <div className="relative">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={26} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3">For Freelancers</h3>
                <p className="text-violet-100 mb-6 leading-relaxed">
                  Showcase your skills, build your portfolio, and earn while studying.
                  Join StartHub and turn your knowledge into income.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {['Create a professional profile', 'List unlimited services', 'Get paid on project completion', 'Build real-world experience'].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-violet-100">
                      <CheckCircle size={15} className="text-emerald-300 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="white"
                  onClick={() => navigate('/freelancer/register')}
                  className="rounded-xl"
                >
                  Start Freelancing <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            {/* For Clients */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white overflow-hidden group">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-12 -left-8 w-48 h-48 bg-white/5 rounded-full" />
              <div className="relative">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users size={26} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3">For Clients / Students</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Find talented students for your projects at affordable rates.
                  Get quality work from verified, passionate learners.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {['Browse 800+ services', 'Verified student freelancers', 'Affordable student pricing', 'Satisfaction guaranteed'].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="white"
                  onClick={() => navigate('/client/register')}
                  className="rounded-xl"
                >
                  Find Talent <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
