import React, { useState } from 'react';
import { Star, MapPin, CheckCircle, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import Badge from './Badge';
import Button from './Button';
import { useToast } from './Toast';

const categoryColors = {
  'Web Development':    'text-violet-600 bg-violet-50 border-violet-100',
  'UI/UX Design':       'text-pink-600 bg-pink-50 border-pink-100',
  'Mobile Development': 'text-blue-600 bg-blue-50 border-blue-100',
  'Data Science':       'text-teal-600 bg-teal-50 border-teal-100',
  'Graphic Design':     'text-orange-600 bg-orange-50 border-orange-100',
  'Content Writing':    'text-green-600 bg-green-50 border-green-100',
  default:              'text-slate-600 bg-slate-50 border-slate-100',
};

const coverGradients = [
  'from-violet-400 via-purple-500 to-indigo-600',
  'from-pink-400 via-rose-500 to-red-500',
  'from-blue-400 via-cyan-500 to-teal-500',
  'from-teal-400 via-emerald-500 to-green-500',
  'from-orange-400 via-amber-500 to-yellow-500',
  'from-indigo-400 via-blue-500 to-cyan-500',
];

export default function FreelancerCard({ freelancer, index = 0 }) {
  const navigate  = useNavigate();
  const toast     = useToast();

  const catClass = categoryColors[freelancer.category] || categoryColors.default;
  const gradient = coverGradients[index % coverGradients.length];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-lg hover:-translate-y-1.5 hover:border-violet-100 transition-all duration-300 overflow-hidden group">
      {/* Cover strip */}
      <div className={`h-16 bg-gradient-to-r ${gradient} relative`}>
        {/* Availability badge top-right */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
            freelancer.isAvailable
              ? 'bg-emerald-500 text-white border-emerald-400'
              : 'bg-slate-500 text-white border-slate-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${freelancer.isAvailable ? 'bg-white' : 'bg-slate-300'}`} />
            {freelancer.isAvailable ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>

      <div className="px-5 pt-0 pb-5">
        {/* Avatar - overlapping the cover */}
        <div className="flex items-end justify-between -mt-7 mb-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-3 ring-white shadow-lg">
              {freelancer.avatar ? (
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
              ) : null}
              <div
                style={{ display: 'none' }}
                className="w-full h-full bg-gradient-to-br from-violet-500 to-indigo-600 items-center justify-center text-white text-xl font-bold"
              >
                {freelancer.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Rating pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-1">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-amber-700">{freelancer.rating}</span>
          </div>
        </div>

        {/* Name & business */}
        <h3 className="font-bold text-slate-900 truncate leading-tight">{freelancer.name}</h3>
        <p className="text-xs font-medium text-slate-500 truncate mb-2">{freelancer.businessName}</p>

        {/* Category pill */}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide mb-3 ${catClass}`}>
          {freelancer.category}
        </span>

        {/* Bio */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {freelancer.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {freelancer.skills.slice(0, 3).map(skill => (
            <span key={skill} className="skill-pill-neutral text-[10px] px-2 py-0.5">
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 3 && (
            <span className="skill-pill-neutral text-[10px] px-2 py-0.5">
              +{freelancer.skills.length - 3}
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          {freelancer.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-slate-400" />
              <span className="truncate">{freelancer.location.split(',')[0]}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <CheckCircle size={11} className="text-emerald-500" />
            {freelancer.completedProjects} projects
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={11} className="text-violet-400" />
            {freelancer.reviews} reviews
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <Button
            size="xs"
            variant="outline"
            onClick={() => navigate(`/client/freelancers/${freelancer.id}`)}
            fullWidth
            id={`view-freelancer-${freelancer.id}`}
          >
            View Profile <ExternalLink size={11} />
          </Button>
          <Button
            size="xs"
            onClick={() => navigate('/client/services')}
            fullWidth
            id={`browse-services-${freelancer.id}`}
          >
            Services
          </Button>
        </div>
      </div>
    </div>
  );
}
