import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Clock, IndianRupee, CheckCircle, Calendar,
  ChevronRight, FileText, CalendarCheck, Eye, Send, Sparkles,
} from 'lucide-react';
import { services } from '../../data/services';
import { freelancers } from '../../data/freelancers';
import Button from '../../components/common/Button';
import Input, { Textarea } from '../../components/common/Input';
import Avatar from '../../components/common/Avatar';
import { useToast } from '../../components/common/Toast';

const STEPS = [
  { id: 1, label: 'Service',      icon: FileText },
  { id: 2, label: 'Requirements', icon: FileText },
  { id: 3, label: 'Schedule',     icon: CalendarCheck },
  { id: 4, label: 'Review',       icon: Eye },
  { id: 5, label: 'Confirm',      icon: Send },
];

function StepIndicator({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
      {STEPS.map((s, i) => {
        const done   = step > s.id;
        const active = step === s.id;
        const Icon   = s.icon;
        return (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                done   ? 'bg-emerald-500 text-white shadow-sm' :
                active ? 'bg-violet-600 text-white shadow-violet' :
                         'bg-slate-100 text-slate-400'
              }`}>
                {done
                  ? <CheckCircle size={16} />
                  : <Icon size={15} />
                }
              </div>
              <span className={`text-[10px] font-semibold whitespace-nowrap ${
                active ? 'text-violet-700' : done ? 'text-emerald-600' : 'text-slate-400'
              }`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 rounded-full min-w-4 transition-all duration-500 ${
                done ? 'bg-emerald-300' : 'bg-slate-200'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function OrderSummary({ service, freelancer, form }) {
  const platformFee = Math.round(service.price * 0.05);
  const total       = service.price + platformFee;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card-lg p-6 sticky top-6">
      <h3 className="font-bold text-slate-900 mb-5">Order Summary</h3>

      {/* Service */}
      <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mb-4">
        <p className="text-[10px] text-violet-600 font-bold uppercase tracking-wide mb-1">{service.category}</p>
        <p className="text-sm font-bold text-slate-900 leading-snug">{service.title}</p>
      </div>

      {/* Freelancer */}
      {freelancer && (
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <Avatar src={freelancer.avatar} name={freelancer.name} size="sm" ring />
          <div>
            <p className="text-sm font-semibold text-slate-900">{freelancer.name}</p>
            <p className="text-xs text-slate-400">{freelancer.businessName}</p>
          </div>
        </div>
      )}

      {/* Line items */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 flex items-center gap-1.5"><Clock size={13} /> Delivery</span>
          <span className="font-semibold text-slate-800">{service.deliveryTime} days</span>
        </div>
        {form.requiredDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 flex items-center gap-1.5"><Calendar size={13} /> Required By</span>
            <span className="font-semibold text-slate-800">{new Date(form.requiredDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Service Price</span>
          <span className="font-semibold text-slate-800">₹{service.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Platform Fee (5%)</span>
          <span className="font-semibold text-slate-800">₹{platformFee.toLocaleString()}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-slate-200 pt-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 text-base">Total</span>
          <div className="text-2xl font-extrabold text-violet-700">
            ₹{total.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Guarantee */}
      <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
        <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
        <p className="text-[11px] text-emerald-700 leading-relaxed font-medium">
          Money-back guarantee if the freelancer doesn't deliver.
        </p>
      </div>
    </div>
  );
}

export default function Booking() {
  const navigate     = useNavigate();
  const { serviceId} = useParams();
  const toast        = useToast();

  const service    = services.find(s => s.id === serviceId) || services[0];
  const freelancer = freelancers.find(f => f.id === service.freelancerId);

  const [step,    setStep]    = useState(2);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    projectDescription:    '',
    requiredDate:          '',
    additionalRequirements: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.projectDescription.trim()) errs.projectDescription = 'Project description is required';
    if (!form.requiredDate)              errs.requiredDate        = 'Required date is required';
    return errs;
  };

  const handleNext = () => {
    if (step === 2) {
      const errs = validate();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
    }
    if (step < 4) setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step > 2) setStep(s => s - 1);
    else navigate(-1);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
      toast.success('🎉 Booking confirmed! Redirecting to My Bookings...');
      setTimeout(() => navigate('/client/bookings'), 2500);
    }, 1500);
  };

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-20 animate-scale-in">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
            <CheckCircle size={48} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl animate-bounce-subtle">
            🎉
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Booking Confirmed!</h2>
        <p className="text-slate-500 mb-2 max-w-sm">
          Your booking for <strong>{service.title}</strong> has been submitted.
        </p>
        <p className="text-slate-500 mb-8 max-w-sm">
          {freelancer?.name} will review and confirm your booking shortly.
        </p>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="w-4 h-4 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
          Redirecting to My Bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Back */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={15} /> {step === 2 ? 'Back to Service' : 'Back'}
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Book Service</h1>
        <p className="text-sm text-slate-500 mt-1">Complete your booking in a few simple steps</p>
      </div>

      {/* Step indicator */}
      <StepIndicator step={step} total={STEPS.length} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Form side ── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            {/* Step header */}
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm">
                  {step}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">
                    {step === 2 && 'Project Requirements'}
                    {step === 3 && 'Schedule & Timeline'}
                    {step === 4 && 'Review Your Order'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {step === 2 && 'Tell the freelancer exactly what you need'}
                    {step === 3 && 'Set your preferred dates and deadlines'}
                    {step === 4 && 'Review everything before confirming'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {step === 2 && (
                <>
                  <Textarea
                    label="Project Description"
                    placeholder="Describe in detail what you need. Include features, pages, technologies, and any specific requirements..."
                    value={form.projectDescription}
                    onChange={handleChange('projectDescription')}
                    rows={5}
                    required
                    error={errors.projectDescription}
                    hint="The more detail you provide, the better the outcome."
                  />
                  <Textarea
                    label="Additional Requirements (Optional)"
                    placeholder="Any specific tools, references, design files, or other instructions..."
                    value={form.additionalRequirements}
                    onChange={handleChange('additionalRequirements')}
                    rows={3}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <Input
                    label="Required By Date"
                    type="date"
                    icon={Calendar}
                    value={form.requiredDate}
                    onChange={handleChange('requiredDate')}
                    required
                    error={errors.requiredDate}
                    min={new Date().toISOString().split('T')[0]}
                    hint={`Standard delivery is ${service.deliveryTime} days from today`}
                  />
                  <div className="p-4 bg-violet-50 border border-violet-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-violet-600" />
                      <span className="text-sm font-bold text-violet-700">Delivery Timeline</span>
                    </div>
                    <p className="text-xs text-violet-600">
                      This service has a standard delivery of <strong>{service.deliveryTime} days</strong>.
                      The freelancer will confirm the exact delivery date after reviewing your requirements.
                    </p>
                  </div>
                </>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Project Description</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {form.projectDescription || <span className="text-slate-400 italic">Not provided</span>}
                    </p>
                  </div>
                  {form.additionalRequirements && (
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Additional Requirements</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{form.additionalRequirements}</p>
                    </div>
                  )}
                  {form.requiredDate && (
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Required By</p>
                      <p className="text-sm font-semibold text-slate-700">
                        {new Date(form.requiredDate).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="text-xs font-bold text-emerald-700 mb-1.5">✓ Everything looks good!</p>
                    <p className="text-xs text-emerald-600">Click Confirm Booking to submit your order.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-400">Step {step} of {STEPS.length - 1}</div>
              <div className="flex gap-2">
                {step < 4 ? (
                  <Button onClick={handleNext} id={`booking-next-step-${step}`}>
                    Continue <ChevronRight size={15} />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} loading={loading} id="confirm-booking-btn">
                    <Send size={15} /> Confirm Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary side */}
        <OrderSummary service={service} freelancer={freelancer} form={form} />
      </div>
    </div>
  );
}
