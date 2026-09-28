import React from 'react';

const sizeClasses = {
  xs: 'px-2.5 py-1.5 text-xs gap-1.5',
  sm: 'px-3.5 py-2 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-2',
};

const variantClasses = {
  primary:
    'bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 shadow-sm shadow-violet-200/60 hover:shadow-md hover:shadow-violet-200 active:scale-[0.98]',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-card active:scale-[0.98]',
  outline:
    'bg-transparent text-violet-600 border-2 border-violet-500 hover:bg-violet-50 hover:border-violet-600 active:scale-[0.98]',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.97]',
  danger:
    'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 active:scale-[0.98]',
  success:
    'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 active:scale-[0.98]',
  dark:
    'bg-slate-900 text-white hover:bg-slate-800 shadow-card active:scale-[0.98]',
  white:
    'bg-white text-violet-700 hover:bg-violet-50 shadow-card active:scale-[0.98]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-semibold rounded-xl
        transition-all duration-200 cursor-pointer select-none
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
        focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : children}
    </button>
  );
}
