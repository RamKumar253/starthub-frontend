import React, { useState, useMemo } from 'react';
import { Briefcase, SlidersHorizontal, X, ArrowUpDown, Grid3X3, List } from 'lucide-react';
import { services, categories } from '../../data/services';
import ServiceCard from '../../components/common/ServiceCard';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import { Select } from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const PRICE_RANGES = [
  { label: 'Any Price',  min: 0,     max: Infinity },
  { label: 'Under ₹2K', min: 0,     max: 2000 },
  { label: '₹2K–₹5K',  min: 2000,  max: 5000 },
  { label: '₹5K–₹10K', min: 5000,  max: 10000 },
  { label: 'Above ₹10K', min: 10000, max: Infinity },
];

const DELIVERY_OPTIONS = [
  { label: 'Any Time', value: 0 },
  { label: 'Up to 3 days', value: 3 },
  { label: 'Up to 7 days', value: 7 },
  { label: 'Up to 14 days', value: 14 },
];

const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Fastest Delivery', value: 'delivery' },
];

export default function BrowseServices() {
  const navigate = useNavigate();
  const [search,       setSearch]       = useState('');
  const [category,     setCategory]     = useState('All');
  const [priceRange,   setPriceRange]   = useState(0);   // index
  const [maxDelivery,  setMaxDelivery]  = useState(0);   // index
  const [sort,         setSort]         = useState('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const pr = PRICE_RANGES[priceRange];
  const dd = DELIVERY_OPTIONS[maxDelivery];

  const filtered = useMemo(() => {
    let list = services.filter(s => {
      const q = search.toLowerCase();
      const matchSearch   = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.freelancerName.toLowerCase().includes(q) || s.skills.some(sk => sk.toLowerCase().includes(q));
      const matchCategory = category === 'All' || s.category === category;
      const matchPrice    = s.price >= pr.min && s.price <= pr.max;
      const matchDelivery = dd.value === 0 || s.deliveryTime <= dd.value;
      return matchSearch && matchCategory && matchPrice && matchDelivery;
    });

    if (sort === 'price_asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'delivery')   list = [...list].sort((a, b) => a.deliveryTime - b.deliveryTime);

    return list;
  }, [search, category, priceRange, maxDelivery, sort]);

  const hasFilters = category !== 'All' || priceRange !== 0 || maxDelivery !== 0 || search;

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setPriceRange(0); setMaxDelivery(0);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3">Category</h4>
        <div className="space-y-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 font-medium ${
                category === c
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3">Budget</h4>
        <div className="space-y-1">
          {PRICE_RANGES.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setPriceRange(i)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 font-medium ${
                priceRange === i
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Time */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3">Delivery Time</h4>
        <div className="space-y-1">
          {DELIVERY_OPTIONS.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setMaxDelivery(i)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 font-medium ${
                maxDelivery === i
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {d.label}
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
          <h1 className="text-2xl font-extrabold text-slate-900">Browse Services</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filtered.length} service{filtered.length !== 1 ? 's' : ''} available{hasFilters ? ' (filtered)' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile filter button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden"
          >
            <SlidersHorizontal size={15} /> Filters
            {hasFilters && <span className="w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">{[category !== 'All', priceRange !== 0, maxDelivery !== 0].filter(Boolean).length}</span>}
          </Button>
        </div>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          placeholder="Search services, skills, or freelancers..."
          className="flex-1"
          id="browse-services-search"
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

      {/* Active Filters Row */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Active:</span>
          {category !== 'All' && (
            <button onClick={() => setCategory('All')} className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full hover:bg-violet-100 font-medium transition-colors">
              {category} <X size={10} />
            </button>
          )}
          {priceRange !== 0 && (
            <button onClick={() => setPriceRange(0)} className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full hover:bg-violet-100 font-medium transition-colors">
              {PRICE_RANGES[priceRange].label} <X size={10} />
            </button>
          )}
          {maxDelivery !== 0 && (
            <button onClick={() => setMaxDelivery(0)} className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full hover:bg-violet-100 font-medium transition-colors">
              {DELIVERY_OPTIONS[maxDelivery].label} <X size={10} />
            </button>
          )}
          {search && (
            <button onClick={() => setSearch('')} className="flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full hover:bg-violet-100 font-medium transition-colors">
              "{search}" <X size={10} />
            </button>
          )}
          <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-medium underline underline-offset-2">
            Clear all
          </button>
        </div>
      )}

      {/* Desktop Layout: sidebar + results */}
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

        {/* Results */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No services found"
              description="Try adjusting your search query or filters to find more services."
              action={<Button onClick={clearFilters}>Clear Filters</Button>}
            />
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(s => <ServiceCard key={s.id} service={s} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 text-lg">Filter Services</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X size={16} />
              </button>
            </div>
            <FilterPanel />
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Button fullWidth onClick={() => setMobileFiltersOpen(false)}>
                Show {filtered.length} Service{filtered.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
