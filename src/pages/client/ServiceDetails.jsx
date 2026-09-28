import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, CheckCircle, IndianRupee,
  MapPin, Github, Globe, Linkedin, Shield, Zap,
  Award, Share2, Bookmark, BookmarkCheck, ChevronRight,
} from 'lucide-react';
import { services } from '../../data/services';
import { freelancers } from '../../data/freelancers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import { useToast } from '../../components/common/Toast';

const TABS = ['Overview', 'About Freelancer', 'What\'s Included'];

const FEATURES = [
  'Requirements discussion',
  'Source code included',
  'Free revisions (2)',
  'Post-delivery support',
  'On-time guarantee',
];

export default function ServiceDetails() {
  const navigate    = useNavigate();
  const { id }      = useParams();
  const toast       = useToast();
  const service     = services.find(s => s.id === id) || services[0];
  const freelancer  = freelancers.find(f => f.id === service.freelancerId);

  const [tab,   setTab]   = useState('Overview');
  const [saved, setSaved] = useState(false);

  if (!service) return <div className="p-8 text-center text-slate-500">Service not found</div>;

  const handleSave = () => {
    setSaved(prev => {
      const next = !prev;
      toast[next ? 'success' : 'info'](next ? '✓ Service saved to bookmarks' : 'Removed from bookmarks');
      return next;
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    toast.info('🔗 Link copied to clipboard!');
  };

  const handleBook = () => navigate(`/client/book/${service.id}`);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button
          onClick={() => navigate('/client/services')}
          className="flex items-center gap-1.5 hover:text-violet-600 transition-colors font-medium"
        >
          <ArrowLeft size={15} /> Services
        </button>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-slate-400 truncate">{service.category}</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-violet-600 font-semibold truncate">{service.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left col (service info) ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Visual header card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            {/* Service visual */}
            <div className="h-56 bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-700 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl select-none opacity-30">
                  {['⚡', '🎨', '📱', '📊', '✏️', '✍️'][services.findIndex(s => s.id === service.id) % 6]}
                </span>
              </div>
              <div className="absolute inset-0 flex items-end justify-between p-5">
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-full border border-white/20">
                  {service.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-all"
                    aria-label="Share service"
                  >
                    <Share2 size={15} />
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-all"
                    aria-label={saved ? 'Unsave' : 'Save'}
                  >
                    {saved ? <BookmarkCheck size={15} className="fill-white" /> : <Bookmark size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Title + meta */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-xl font-extrabold text-slate-900 leading-tight flex-1">{service.title}</h1>
                <Badge status={service.status} showDot />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700">{service.rating}</span>
                  <span>({service.reviews} reviews)</span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-slate-400" />
                  <span>{service.deliveryTime} day delivery</span>
                </div>
                {freelancer && (
                  <>
                    <span className="text-slate-300">·</span>
                    <div className="flex items-center gap-1.5">
                      <Avatar src={freelancer.avatar} name={freelancer.name} size="xs" />
                      <span className="font-medium text-slate-700">{freelancer.name}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            <div className="flex border-b border-slate-100">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                    tab === t
                      ? 'text-violet-700 border-b-2 border-violet-600 bg-violet-50/50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === 'Overview' && (
                <div className="space-y-4 animate-fade-in-fast">
                  <h2 className="font-bold text-slate-900">About This Service</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Technologies & Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.skills.map(s => (
                        <span key={s} className="skill-pill">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'About Freelancer' && freelancer && (
                <div className="animate-fade-in-fast">
                  <div className="flex items-start gap-4 mb-5">
                    <Avatar src={freelancer.avatar} name={freelancer.name} size="lg" ring />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-lg">{freelancer.name}</h3>
                      <p className="text-violet-600 text-sm font-semibold mb-2">{freelancer.businessName}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Star size={13} className="fill-amber-400 text-amber-400" /> {freelancer.rating}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle size={13} className="text-emerald-500" /> {freelancer.completedProjects} projects
                        </span>
                        {freelancer.location && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1"><MapPin size={13} />{freelancer.location}</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-3">{freelancer.bio}</p>
                      <div className="flex items-center gap-3 mt-3">
                        {freelancer.github   && <a href={freelancer.github}   target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors"><Github size={17} /></a>}
                        {freelancer.linkedin && <a href={freelancer.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors"><Linkedin size={17} /></a>}
                        {freelancer.portfolio && <a href={freelancer.portfolio} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors"><Globe size={17} /></a>}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="text-center">
                      <p className="font-extrabold text-slate-900 text-lg">{freelancer.rating}</p>
                      <p className="text-xs text-slate-500">Rating</p>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <p className="font-extrabold text-slate-900 text-lg">{freelancer.completedProjects}</p>
                      <p className="text-xs text-slate-500">Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="font-extrabold text-slate-900 text-lg">{freelancer.reviews}</p>
                      <p className="text-xs text-slate-500">Reviews</p>
                    </div>
                  </div>
                </div>
              )}

              {tab === "What's Included" && (
                <div className="animate-fade-in-fast space-y-3">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                      <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-emerald-800">{f}</span>
                    </div>
                  ))}
                  <div className="p-4 bg-violet-50 border border-violet-100 rounded-xl mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={15} className="text-violet-600" />
                      <span className="text-sm font-bold text-violet-700">StartHub Guarantee</span>
                    </div>
                    <p className="text-xs text-violet-600 leading-relaxed">
                      Your booking is protected. If the freelancer doesn't deliver as promised, we'll refund your payment. No questions asked.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right col (sticky booking card) ── */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card-lg p-6 sticky top-6">
            {/* Price */}
            <div className="text-center pb-5 border-b border-slate-100 mb-5">
              <div className="text-4xl font-extrabold text-slate-900 mb-1">
                ₹{service.price.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500">
                <Clock size={13} className="text-slate-400" />
                <span>{service.deliveryTime} day delivery</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2.5 mb-6">
              {[
                `${service.deliveryTime}-day delivery`,
                'Requirements discussion included',
                'Source code provided',
                '2 free revisions',
                'StartHub money-back guarantee',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* Book CTA */}
            <Button
              fullWidth
              size="lg"
              onClick={handleBook}
              id={`book-now-${service.id}`}
              className="rounded-xl mb-3"
            >
              Book Now — ₹{service.price.toLocaleString()}
            </Button>
            <Button
              fullWidth
              variant="secondary"
              onClick={() => navigate('/client/freelancers')}
              id={`contact-freelancer-${service.id}`}
            >
              Contact Freelancer
            </Button>

            {/* Trust badges */}
            <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-center gap-4">
              {[
                { icon: Shield, label: 'Secure' },
                { icon: Zap,    label: 'Fast' },
                { icon: Award,  label: 'Quality' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Icon size={14} className="text-violet-600" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
