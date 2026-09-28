import React, { useState } from 'react';
import {
  Github, Linkedin, Globe, MapPin, Mail, Phone,
  Edit3, Save, X, Star, Briefcase, Award,
  CheckCircle, User,
} from 'lucide-react';
import Input, { Textarea } from '../../components/common/Input';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { services } from '../../data/services';

const TABS = ['About', 'Services', 'Skills'];

const defaultProfile = {
  name:        'Arjun Sharma',
  email:       'arjun@starthub.com',
  businessName: "Arjun's Dev Studio",
  category:    'Web Development',
  skills:      ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
  experience:  '3 years',
  bio:         'Full-stack developer specializing in MERN stack. I build fast, scalable web applications with clean code and modern design. Passionate about open-source and always learning.',
  location:    'Mumbai, India',
  phone:       '+91 9876543210',
  github:      'https://github.com/arjun',
  linkedin:    'https://linkedin.com/in/arjun',
  portfolio:   'https://arjun.dev',
  avatar:      'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
  rating:      4.9,
  reviews:     24,
  completedProjects: 31,
};

export default function FreelancerProfile() {
  const toast = useToast();
  const [profile, setProfile] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [form,    setForm]    = useState(defaultProfile);
  const [tab,     setTab]     = useState('About');

  const myServices = services.filter(s => s.freelancerId === 'f1');

  const handleChange = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
    toast.success('✓ Profile updated successfully!');
  };

  const handleCancel = () => { setForm(profile); setEditing(false); };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">

      {/* ── Profile Header Card ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-r from-violet-600 via-violet-700 to-indigo-700 relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-5">
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={e => e.target.style.display = 'none'}
                  />
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-3 border-white rounded-full ring-2 ring-white" />
              </div>
              <div className="mb-2">
                <h1 className="text-xl font-extrabold text-slate-900">{profile.name}</h1>
                <p className="text-sm text-violet-600 font-semibold">{profile.businessName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="text-xs text-slate-500">{profile.location}</span>
                </div>
              </div>
            </div>

            {!editing ? (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                <Edit3 size={14} /> Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}><Save size={14} /> Save</Button>
                <Button size="sm" variant="secondary" onClick={handleCancel}><X size={14} /> Cancel</Button>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl mb-5">
            <div className="text-center">
              <p className="text-xl font-extrabold text-slate-900">{profile.rating}</p>
              <div className="flex gap-0.5 justify-center mb-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={10} className={s <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-200 text-amber-200'} />
                ))}
              </div>
              <p className="text-xs text-slate-500">Rating</p>
            </div>
            <div className="text-center border-x border-slate-200">
              <p className="text-xl font-extrabold text-slate-900">{profile.reviews}</p>
              <p className="text-xs text-slate-500 mt-0.5">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-slate-900">{profile.completedProjects}</p>
              <p className="text-xs text-slate-500 mt-0.5">Completed</p>
            </div>
          </div>

          {/* Contact info */}
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { icon: Mail,    value: profile.email },
              { icon: Phone,   value: profile.phone },
              { icon: Briefcase, value: `${profile.experience} experience` },
            ].map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-2 text-slate-600">
                <Icon size={14} className="text-slate-400 flex-shrink-0" />
                <span className="truncate">{value}</span>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-4">
            {profile.github   && <a href={profile.github}   target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"><Github size={13} /> GitHub</a>}
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors"><Linkedin size={13} /> LinkedIn</a>}
            {profile.portfolio && <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-violet-700 bg-slate-100 hover:bg-violet-50 px-3 py-1.5 rounded-full transition-colors"><Globe size={13} /> Portfolio</a>}
          </div>
        </div>
      </div>

      {/* ── Edit Form ── */}
      {editing && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5 animate-slide-up">
          <h2 className="font-bold text-slate-900">Edit Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name"      value={form.name}         onChange={handleChange('name')} />
            <Input label="Business Name"  value={form.businessName} onChange={handleChange('businessName')} />
            <Input label="Phone"          value={form.phone}        onChange={handleChange('phone')} />
            <Input label="Location"       value={form.location}     onChange={handleChange('location')} />
            <Input label="Experience"     value={form.experience}   onChange={handleChange('experience')} />
            <Input
              label="Skills (comma separated)"
              value={form.skills.join(', ')}
              onChange={e => setForm(p => ({ ...p, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
            />
            <Input label="Portfolio URL"  type="url" value={form.portfolio}  onChange={handleChange('portfolio')} />
            <Input label="GitHub URL"     type="url" value={form.github}     onChange={handleChange('github')} />
          </div>
          <Input label="LinkedIn URL" type="url" value={form.linkedin} onChange={handleChange('linkedin')} />
          <Textarea label="Bio" value={form.bio} onChange={handleChange('bio')} rows={4} />
        </div>
      )}

      {/* ── Tabs ── */}
      {!editing && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="flex border-b border-slate-100">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'text-violet-700 border-b-2 border-violet-600 bg-violet-50/50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === 'About' && (
              <div className="space-y-4 animate-fade-in-fast">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Bio</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{profile.bio}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { label: 'Category',   value: profile.category },
                    { label: 'Experience', value: profile.experience },
                    { label: 'Location',   value: profile.location },
                    { label: 'Member Since', value: 'September 2024' },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">{label}</p>
                      <p className="text-sm font-semibold text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'Services' && (
              <div className="space-y-3 animate-fade-in-fast">
                {myServices.length === 0 ? (
                  <p className="text-center text-slate-400 py-8 text-sm">No services listed yet.</p>
                ) : myServices.map(s => (
                  <div key={s.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-violet-100 hover:bg-violet-50/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg flex-shrink-0">⚡</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors">{s.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{s.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-bold text-slate-900">₹{s.price.toLocaleString()}</span>
                        <span className="text-xs text-slate-400">{s.deliveryTime} days</span>
                        <Badge status={s.status} showDot />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'Skills' && (
              <div className="space-y-4 animate-fade-in-fast">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(s => (
                      <span key={s} className="skill-pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-3">Achievements</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Star,         label: 'Top Rated',       desc: '4.9 avg rating' },
                      { icon: CheckCircle,  label: '31 Projects',     desc: 'Successfully delivered' },
                      { icon: Award,        label: 'Pro Verified',    desc: 'Identity confirmed' },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="flex items-center gap-3 p-3 bg-violet-50 border border-violet-100 rounded-xl">
                        <Icon size={18} className="text-violet-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-violet-800">{label}</p>
                          <p className="text-[10px] text-violet-600">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
