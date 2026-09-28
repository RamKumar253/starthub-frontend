import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, hint, className = '', icon: Icon, suffix, required, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          ref={ref}
          required={required}
          className={`
            input-field
            ${Icon ? 'pl-10' : ''}
            ${suffix ? 'pr-12' : ''}
            ${error ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : ''}
            ${className}
          `}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
});

export default Input;

export function Textarea({ label, error, hint, className = '', rows = 4, required, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        required={required}
        className={`
          input-field resize-none leading-relaxed
          ${error ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : ''}
          ${className}
        `}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export function Select({ label, error, hint, className = '', children, required, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        required={required}
        className={`
          input-field bg-white cursor-pointer
          ${error ? 'border-red-400 focus:ring-red-400' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
