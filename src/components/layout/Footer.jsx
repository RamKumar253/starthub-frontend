import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <span className="text-xl font-bold">Start<span className="text-violet-400">Hub</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting brilliant student talent with clients who need quality work done.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 transition-all">
                <Twitter size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 transition-all">
                <Github size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 transition-all">
                <Linkedin size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 transition-all">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {['Browse Services', 'Browse Freelancers', 'How it Works', 'Pricing'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">For Users</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Become a Freelancer', to: '/freelancer/register' },
                { label: 'Find Services', to: '/client/register' },
                { label: 'Freelancer Login', to: '/freelancer/login' },
                { label: 'Client Login', to: '/client/login' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Blog', 'Careers', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} StartHub. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built with ❤️ for students and freelancers.
          </p>
        </div>
      </div>
    </footer>
  );
}
