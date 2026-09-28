import React, { useState, useMemo } from 'react';
import { Users, SlidersHorizontal, X, Star, ArrowUpDown } from 'lucide-react';
import { freelancers } from '../../data/freelancers';
import FreelancerCard from '../../components/common/FreelancerCard';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ALL_CATEGORIES = ['All', 'Web Development', 'UI/UX Design', 'Mobile Development', 'Data Science', 'Graphic Design', 'Content Writing'];
const ALL_SKILLS     = ['All', 'React', 'Node.js', 'Figma', 'Python', 'Flutter', 'Photoshop', 'SEO Writing', 'Machine Learning'];

const SORT_OPTIONS = [
  { label: 'Best Rated',        value: 'rating' },
  { label: 'Most Projects',     value: 'projects' },
  { label: 'Most Reviews',      value: 'reviews' },
  { label: 'Available First',   value: 'available' },
];

export default function BrowseFreelancers() {
  const navigate = useNavigate();
  const [search,      setSearch]      = useState('');
  const [category,    setCategory]    = useState('All');
  const [skill,       setSkill]       = useState('All');
  const [sort,        setSort]        = useState('rating');
  const [available,   setAvailable]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  const filtered = useMemo(() => {
    let list = freelancers.filter(f => {
      const q = search.toLowerCase();
      const matchSearch   = !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q) || f.skills.some(s => s.toLowerCase().includes(q)) || (f.bio && f.bio.toLowerCase().includes(q));
      const matchCategory = category === 'All' || f.category === category;
      const matchSkill    = skill === 'All'    || f.skills.includes(skill);
      const matchAvail    = !available          || f.isAvailable;
      return matchSearch && matchCategory && matchSkill && matchAvail;
    });

    if (sort === 'rating')    list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'projects')  list = [...list].sort((a, b) => b.completedProjects - a.completedProjects);
    if (sort === 'reviews')   list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === 'available') list = [...list].sort((a, b) => (b.isAvailable ? 1 : 0) - (a.isAvailable ? 1 : 0));

    return list;
  }, [search, category, skill, sort, available]);

  const hasFilters = category !== 'All' || skill !== 'All' || search || available;

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setSkill('All'); setAvailable(false);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Availability toggle */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3">Availability</h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setAvailable(prev => !prev)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${available ? 'bg-emerald-500' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${available ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm text-slate-700 font-medium">Available Now Only</span>
        </label>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3">Category</h4>
        <div className="space-y-1">
          {ALL_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 font-medium ${
                category === c
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {ALL_SKILLS.map(s => (
            <button
              key={s}
              onClick={() => setSkill(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                skill === s
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" fullWidth onClick={clearFilters} className="text-red-500 hover:bg-red-50">
          <X size={14} /> Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Browse Freelancers</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filtered.length} freelancer{filtered.length !== 1 ? 's' : ''} found{hasFilters ? ' (filtered)' : ''}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden"
        >
          <SlidersHorizontal size={15} /> Filters
          {hasFilters && (
            <span className="w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
              {[category !== 'All', skill !== 'All', available].filter(Boolean).length}
            </span>
          )}
        </Button>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          placeholder="Search by name, skill, category, or bio..."
          className="flex-1"
          id="browse-freelancers-search"
        />
        <div className="relative sm:w-52">
          <ArrowUpDown size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field pl-9 cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Active:</span>
          {category !== 'All' && (
            <button onClick={() => setCategory('All')} className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full hover:bg-violet-100 font-medium">
              {category} <X size={10} />
            </button>
          )}
          {skill !== 'All' && (
            <button onClick={() => setSkill('All')} className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full hover:bg-violet-100 font-medium">
              {skill} <X size={10} />
            </button>
          )}
          {available && (
            <button onClick={() => setAvailable(false)} className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full hover:bg-emerald-100 font-medium">
              Available Now <X size={10} />
            </button>
          )}
          {search && (
            <button onClick={() => setSearch('')} className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full hover:bg-violet-100 font-medium">
              "{search}" <X size={10} />
            </button>
          )}
          <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-medium underline underline-offset-2">
            Clear all
          </button>
        </div>
      )}

      {/* Layout */}
      <div className="flex gap-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 sticky top-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-violet-600" /> Filters
              </h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-medium">
                  Reset
                </button>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No freelancers found"
              description="Try adjusting your search or filters to find more freelancers."
              action={<Button onClick={clearFilters}>Clear Filters</Button>}
            />
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((f, i) => <FreelancerCard key={f.id} freelancer={f} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 text-lg">Filter Freelancers</h3>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <X size={16} />
              </button>
            </div>
            <FilterPanel />
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Button fullWidth onClick={() => setMobileOpen(false)}>
                Show {filtered.length} Freelancer{filtered.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
