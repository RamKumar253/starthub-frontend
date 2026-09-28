import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, ArrowRight, Search } from 'lucide-react';
import Button from '../common/Button';

const navLinks = [
  { href: '#features',    label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#freelancers', label: 'Freelancers' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navigate                  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-card-md border-b border-slate-100'
        : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-violet group-hover:shadow-violet-lg transition-all duration-200 group-hover:scale-110">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Start<span className="gradient-text">Hub</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-slate-600 hover:text-violet-600 hover:bg-violet-50 font-medium rounded-lg transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/select-role')}>
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/select-role')} className="shadow-violet">
              Get Started <ArrowRight size={14} />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`
        md:hidden overflow-hidden transition-all duration-300
        ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center px-3 py-2.5 text-sm text-slate-700 hover:text-violet-600 hover:bg-violet-50 font-medium rounded-xl transition-all"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 space-y-2 border-t border-slate-100 mt-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => { navigate('/select-role'); closeMenu(); }}
            >
              Log in
            </Button>
            <Button
              fullWidth
              onClick={() => { navigate('/select-role'); closeMenu(); }}
            >
              Get Started <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
