import React from 'react';
import { Calendar, Clock, IndianRupee, CheckCircle, Circle, Dot, ArrowRight } from 'lucide-react';
import Badge from './Badge';
import Avatar from './Avatar';
import Button from './Button';
import { useToast } from './Toast';

const STATUS_ORDER = ['pending', 'confirmed', 'in_progress', 'completed'];
const STATUS_LABELS = {
  pending:     'Booking Created',
  confirmed:   'Accepted',
  in_progress: 'In Progress',
  completed:   'Completed',
};

function TimelineDot({ done, active, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${
        done
          ? 'bg-emerald-500 ring-2 ring-emerald-100'
          : active
          ? 'bg-violet-600 ring-4 ring-violet-100 scale-110'
          : 'bg-slate-200 ring-2 ring-slate-100'
      }`} />
      <span className={`text-xs font-medium truncate ${
        done ? 'text-emerald-700' : active ? 'text-violet-700 font-semibold' : 'text-slate-400'
      }`}>{label}</span>
    </div>
  );
}

export default function BookingCard({ booking, role = 'client', onAction }) {
  const toast = useToast();
  const person = role === 'client'
    ? { label: 'Freelancer', name: booking.freelancerName }
    : { label: 'Client',     name: booking.clientName };

  const currentStep  = STATUS_ORDER.indexOf(booking.status);
  const isCancelled  = booking.status === 'cancelled';

  const handleAccept = () => {
    onAction && onAction('accept', booking.id);
    toast.success('✓ Booking accepted! Client has been notified.');
  };

  const handleDecline = () => {
    onAction && onAction('decline', booking.id);
    toast.warning('Booking declined.');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-md hover:border-violet-100 transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-50">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-sm leading-snug truncate mb-1">{booking.serviceName}</h3>
            <div className="flex items-center gap-2">
              <Avatar name={person.name} size="xs" />
              <span className="text-xs text-slate-500">
                {person.label}: <span className="font-semibold text-slate-700">{person.name}</span>
              </span>
            </div>
          </div>
          <Badge status={booking.status} showDot />
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 bg-slate-50 rounded-xl p-3 border border-slate-100 italic">
          "{booking.projectDescription}"
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 px-0 py-0">
        {[
          { label: 'Price',    value: `₹${booking.price.toLocaleString()}`,     icon: IndianRupee },
          { label: 'Delivery', value: `${booking.deliveryTime} days`,             icon: Clock },
          { label: 'Due',      value: new Date(booking.requiredDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }), icon: Calendar },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center justify-center py-3 gap-0.5">
            <Icon size={13} className="text-slate-400 mb-0.5" />
            <p className="text-xs font-bold text-slate-800">{value}</p>
            <p className="text-[10px] text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Timeline (only for non-cancelled bookings) */}
      {!isCancelled && (
        <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/50">
          <div className="flex items-center justify-between gap-1">
            {STATUS_ORDER.map((status, i) => {
              const done   = i < currentStep;
              const active = i === currentStep;
              return (
                <React.Fragment key={status}>
                  <TimelineDot done={done} active={active} label={STATUS_LABELS[status]} />
                  {i < STATUS_ORDER.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 rounded-full transition-all duration-500 ${
                      i < currentStep ? 'bg-emerald-300' : 'bg-slate-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions for freelancer */}
      {role === 'freelancer' && booking.status === 'pending' && (
        <div className="px-5 py-3 border-t border-slate-100 flex gap-2">
          <Button
            size="sm"
            variant="success"
            fullWidth
            onClick={handleAccept}
            id={`accept-booking-${booking.id}`}
          >
            <CheckCircle size={13} /> Accept
          </Button>
          <Button
            size="sm"
            variant="danger"
            fullWidth
            onClick={handleDecline}
            id={`decline-booking-${booking.id}`}
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  );
}
