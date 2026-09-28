import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle, Sparkles } from 'lucide-react';
import Input, { Textarea, Select } from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';

const CATEGORIES = [
  'Web Development', 'UI/UX Design', 'Mobile Development',
  'Data Science', 'Graphic Design', 'Content Writing',
  'Digital Marketing', 'Video Editing',
];

const STEPS = ['Details', 'Pricing', 'Review'];

export default function CreateService() {
  const navigate = useNavigate();
  const toast    = useToast();

  const [step,    setStep]    = useState(0);
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', category: '', skills: '',
    price: '', deliveryTime: '', status: 'active',
  });
  const [errors, setErrors] = useState({});

  const set = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.title.trim())       errs.title       = 'Title is required';
      if (!form.description.trim()) errs.description = 'Description is required';
      if (!form.category)           errs.category    = 'Category is required';
      if (!form.skills.trim())      errs.skills      = 'At least one skill is required';
    }
    if (step === 1) {
      if (!form.price)              errs.price        = 'Price is required';
      if (!form.deliveryTime)       errs.deliveryTime = 'Delivery time is required';
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    if (step > 0) setStep(s => s - 1);
    else navigate(-1);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success('🎉 Service published successfully!');
      setTimeout(() => navigate('/freelancer/services'), 2000);
    }, 1400);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[55vh] text-center py-16 animate-scale-in">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 mb-6">
          <CheckCircle size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Service Published!</h2>
        <p className="text-slate-500 mb-6">Your service is now live and visible to clients.</p>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="w-4 h-4 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
          Redirecting to My Services...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Create New Service</h1>
          <p className="text-sm text-slate-500 mt-0.5">List your skills and start earning</p>
        </div>
      </div>

      {/* Step pills */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              i === step     ? 'bg-violet-600 text-white shadow-violet' :
              i < step       ? 'bg-emerald-100 text-emerald-700' :
                               'bg-slate-100 text-slate-400'
            }`}>
              {i < step ? <CheckCircle size={11} /> : <span>{i + 1}</span>}
              {s}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-emerald-300' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        {/* Section header */}
        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm">
            {step + 1}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">
              {step === 0 && 'Service Information'}
              {step === 1 && 'Pricing & Delivery'}
              {step === 2 && 'Review & Publish'}
            </p>
            <p className="text-xs text-slate-400">
              {step === 0 && 'Describe what you offer in detail'}
              {step === 1 && 'Set your rate and expected timeline'}
              {step === 2 && 'Check everything before going live'}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {step === 0 && (
            <>
              <Input
                label="Service Title"
                placeholder="I will build a modern full-stack web application..."
                value={form.title}
                onChange={set('title')}
                required
                error={errors.title}
                hint="A clear, specific title helps you get found"
              />
              <Textarea
                label="Description"
                placeholder="Describe your service in detail. What will you deliver? What is included? What are your requirements from the client?"
                value={form.description}
                onChange={set('description')}
                rows={5}
                required
                error={errors.description}
              />
              <Select label="Category" value={form.category} onChange={set('category')} required error={errors.category}>
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Input
                label="Skills / Technologies"
                placeholder="React, Node.js, MongoDB, TypeScript..."
                value={form.skills}
                onChange={set('skills')}
                required
                error={errors.skills}
                hint="Comma separated — e.g. React, Node.js, Figma"
              />
            </>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Price (₹)"
                  type="number"
                  placeholder="4999"
                  value={form.price}
                  onChange={set('price')}
                  required
                  error={errors.price}
                  suffix="₹"
                />
                <Input
                  label="Delivery Time"
                  type="number"
                  placeholder="7"
                  value={form.deliveryTime}
                  onChange={set('deliveryTime')}
                  required
                  error={errors.deliveryTime}
                  suffix="days"
                />
              </div>
              <Select label="Publish Status" value={form.status} onChange={set('status')}>
                <option value="active">Active — Visible to clients</option>
                <option value="inactive">Draft — Hidden for now</option>
              </Select>
              {form.price && (
                <div className="p-4 bg-violet-50 border border-violet-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-violet-600" />
                    <span className="text-sm font-bold text-violet-700">Earnings Preview</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-violet-500">Listed Price</p>
                      <p className="font-bold text-violet-800">₹{Number(form.price).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-violet-500">Platform Fee (5%)</p>
                      <p className="font-bold text-violet-800">-₹{Math.round(form.price * 0.05).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-violet-500">You Earn</p>
                      <p className="font-bold text-emerald-700">₹{Math.round(form.price * 0.95).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {[
                { label: 'Title',           value: form.title },
                { label: 'Category',        value: form.category },
                { label: 'Skills',          value: form.skills },
                { label: 'Price',           value: `₹${Number(form.price || 0).toLocaleString()}` },
                { label: 'Delivery',        value: `${form.deliveryTime} days` },
                { label: 'Status',          value: form.status === 'active' ? '🟢 Active' : '⚪ Draft' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide w-20 flex-shrink-0 pt-0.5">{label}</span>
                  <span className="text-sm text-slate-800 font-medium">{value}</span>
                </div>
              ))}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1.5">Description</span>
                <p className="text-sm text-slate-700 leading-relaxed">{form.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation footer */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <Button variant="secondary" onClick={handleBack}>
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>
          {step < 2 ? (
            <Button onClick={handleNext} id={`create-service-next-${step}`}>
              Continue →
            </Button>
          ) : (
            <Button onClick={handleSubmit} loading={loading} id="publish-service-btn">
              <Save size={15} /> Publish Service
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
