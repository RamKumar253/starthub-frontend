import React, { useState } from 'react';
import { Clock, Star, IndianRupee, Bookmark, BookmarkCheck, Eye, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import Button from './Button';
import { useToast } from './Toast';

const categoryGradients = {
  'Web Development':    'from-violet-500 to-indigo-600',
  'UI/UX Design':       'from-pink-500 to-rose-600',
  'Mobile Development': 'from-blue-500 to-cyan-600',
  'Data Science':       'from-teal-500 to-emerald-600',
  'Graphic Design':     'from-orange-500 to-amber-600',
  'Content Writing':    'from-green-500 to-teal-600',
  default:              'from-slate-500 to-slate-700',
};

const categoryIcons = {
  'Web Development':    '⚡',
  'UI/UX Design':       '🎨',
  'Mobile Development': '📱',
  'Data Science':       '📊',
  'Graphic Design':     '✏️',
  'Content Writing':    '✍️',
  default:              '💼',
};

export default function ServiceCard({ service }) {
  const navigate  = useNavigate();
  const toast     = useToast();
  const [saved, setSaved]       = useState(false);
  const [hovered, setHovered]   = useState(false);

  const gradient = categoryGradients[service.category] || categoryGradients.default;
  const emoji    = categoryIcons[service.category]    || categoryIcons.default;

  const handleSave = (e) => {
    e.stopPropagation();
    setSaved(prev => {
      const next = !prev;
      toast[next ? 'success' : 'info'](
        next ? '✓ Service saved to bookmarks' : 'Removed from bookmarks'
      );
      return next;
    });
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/client/services/${service.id}`);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/client/book/${service.id}`);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-lg hover:-translate-y-1.5 hover:border-violet-100 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Service visual header */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient} overflow-hidden flex-shrink-0`}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Category emoji */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl select-none opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:scale-110">
          {emoji}
        </div>

        {/* Top bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
            {service.category}
          </span>
          <button
            id={`save-service-${service.id}`}
            onClick={handleSave}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200"
            aria-label={saved ? 'Remove from saved' : 'Save service'}
          >
            {saved
              ? <BookmarkCheck size={14} className="fill-white" />
              : <Bookmark size={14} />
            }
          </button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/20">
            <Star size={11} className="fill-amber-300 text-amber-300" />
            <span className="text-xs font-bold text-white">{service.rating}</span>
            <span className="text-xs text-white/70">({service.reviews})</span>
          </div>
        </div>

        {/* Hover Quick-View overlay */}
        <div className={`absolute inset-0 bg-slate-900/50 flex items-center justify-center transition-all duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 text-slate-800 text-xs font-semibold shadow-lg">
            <Eye size={13} /> Quick View
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-slate-900 text-sm mb-1.5 line-clamp-2 leading-snug group-hover:text-violet-700 transition-colors duration-200">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {service.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {service.skills.slice(0, 3).map(skill => (
            <span key={skill} className="skill-pill-neutral text-[10px] px-2 py-0.5">
              {skill}
            </span>
          ))}
          {service.skills.length > 3 && (
            <span className="skill-pill-neutral text-[10px] px-2 py-0.5">
              +{service.skills.length - 3}
            </span>
          )}
        </div>

        {/* Freelancer */}
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <Avatar src={service.freelancerAvatar} name={service.freelancerName} size="xs" />
          <span className="text-xs text-slate-600 font-medium truncate">{service.freelancerName}</span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <div className="flex items-center gap-0.5 text-slate-900 font-extrabold text-base">
              <span className="text-sm font-semibold">₹</span>
              <span>{service.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
              <Clock size={9} /> {service.deliveryTime} day delivery
            </div>
          </div>
          <div className="flex gap-1.5">
            <Button
              size="xs"
              variant="ghost"
              onClick={handleViewDetails}
              className="text-slate-500 hover:text-violet-600"
              id={`view-service-${service.id}`}
            >
              View
            </Button>
            <Button
              size="xs"
              onClick={handleBookNow}
              id={`book-service-${service.id}`}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
