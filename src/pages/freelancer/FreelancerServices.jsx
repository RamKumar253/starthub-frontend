import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Edit, Trash2, ToggleLeft, ToggleRight,
  Clock, IndianRupee, Star, Search,
} from 'lucide-react';
import { services } from '../../data/services';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import SearchBar from '../../components/common/SearchBar';
import { useToast } from '../../components/common/Toast';

export default function FreelancerServices() {
  const navigate = useNavigate();
  const toast    = useToast();

  const myServices   = services.filter(s => s.freelancerId === 'f1');
  const [serviceList, setServiceList] = useState(myServices);
  const [deleteId,    setDeleteId]    = useState(null);
  const [search,      setSearch]      = useState('');

  const filtered = serviceList.filter(s =>
    !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setServiceList(prev => prev.map(s => {
      if (s.id !== id) return s;
      const next = s.status === 'active' ? 'inactive' : 'active';
      toast.info(`Service marked as ${next}`);
      return { ...s, status: next };
    }));
  };

  const confirmDelete = () => {
    setServiceList(prev => prev.filter(s => s.id !== deleteId));
    setDeleteId(null);
    toast.success('Service deleted successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Services</h1>
          <p className="text-sm text-slate-500 mt-1">
            {serviceList.length} service{serviceList.length !== 1 ? 's' : ''} listed
          </p>
        </div>
        <Button onClick={() => navigate('/freelancer/services/create')} id="add-new-service-btn">
          <Plus size={16} /> Add New Service
        </Button>
      </div>

      {/* Stats mini cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total',    value: serviceList.length,                                              bg: 'bg-slate-50 border-slate-200 text-slate-700' },
          { label: 'Active',   value: serviceList.filter(s => s.status === 'active').length,           bg: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'Inactive', value: serviceList.filter(s => s.status !== 'active').length,           bg: 'bg-slate-50 border-slate-200 text-slate-500' },
        ].map(({ label, value, bg }) => (
          <div key={label} className={`rounded-2xl border p-3 text-center ${bg}`}>
            <p className="text-xl font-extrabold">{value}</p>
            <p className="text-xs font-semibold opacity-70 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={e => setSearch(e.target.value)}
        onClear={() => setSearch('')}
        placeholder="Search your services..."
        id="my-services-search"
      />

      {/* Services list */}
      {filtered.length === 0 ? (
        <EmptyState
          title={search ? 'No matching services' : 'No services yet'}
          description={search ? `No services matching "${search}".` : 'Create your first service listing to start receiving bookings.'}
          action={!search && <Button onClick={() => navigate('/freelancer/services/create')}><Plus size={16} /> Create Service</Button>}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-md hover:border-violet-100 transition-all duration-200 p-5"
            >
              <div className="flex items-start gap-4">
                {/* Service icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl flex-shrink-0">
                  ⚡
                </div>

                {/* Service info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-slate-900 text-sm">{service.title}</h3>
                    <Badge status={service.status} showDot />
                  </div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{service.description}</p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <IndianRupee size={12} /> ₹{service.price.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock size={12} /> {service.deliveryTime} days
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {service.rating} ({service.reviews})
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{service.category}</span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {service.skills.map(s => (
                      <span key={s} className="skill-pill-neutral text-[10px] px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {/* Toggle status */}
                  <button
                    onClick={() => toggleStatus(service.id)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all font-medium ${
                      service.status === 'active'
                        ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-emerald-50/50'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                    title="Toggle Status"
                    id={`toggle-service-${service.id}`}
                  >
                    {service.status === 'active'
                      ? <ToggleRight size={14} className="text-emerald-500" />
                      : <ToggleLeft size={14} className="text-slate-400" />
                    }
                    {service.status === 'active' ? 'Active' : 'Inactive'}
                  </button>

                  <button
                    onClick={() => navigate('/freelancer/services/create')}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-slate-600 font-medium"
                    id={`edit-service-${service.id}`}
                  >
                    <Edit size={12} /> Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(service.id)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-red-100 hover:bg-red-50 text-red-500 transition-all font-medium"
                    id={`delete-service-${service.id}`}
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Service" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 size={22} className="text-red-500" />
          </div>
          <p className="text-slate-700 font-semibold mb-2">Are you sure?</p>
          <p className="text-slate-500 text-sm mb-6">This service will be permanently deleted. This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" fullWidth onClick={confirmDelete} id="confirm-delete-service-btn">
              <Trash2 size={14} /> Delete Service
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
