import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  info:    Info,
  warning: AlertTriangle,
};

const STYLES = {
  success: 'bg-white border-emerald-200 shadow-lg shadow-emerald-50',
  error:   'bg-white border-red-200 shadow-lg shadow-red-50',
  info:    'bg-white border-violet-200 shadow-lg shadow-violet-50',
  warning: 'bg-white border-amber-200 shadow-lg shadow-amber-50',
};

const ICON_STYLES = {
  success: 'text-emerald-500 bg-emerald-50',
  error:   'text-red-500 bg-red-50',
  info:    'text-violet-600 bg-violet-50',
  warning: 'text-amber-500 bg-amber-50',
};

const TEXT_STYLES = {
  success: 'text-emerald-800',
  error:   'text-red-800',
  info:    'text-violet-800',
  warning: 'text-amber-800',
};

let toastIdCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, removing: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
  }, []);

  const addToast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    const id = ++toastIdCounter;
    setToasts(prev => [...prev, { id, message, type, removing: false }]);
    setTimeout(() => removeToast(id), duration);
    return id;
  }, [removeToast]);

  const toast = {
    success: (msg, opts) => addToast({ message: msg, type: 'success', ...opts }),
    error:   (msg, opts) => addToast({ message: msg, type: 'error',   ...opts }),
    info:    (msg, opts) => addToast({ message: msg, type: 'info',    ...opts }),
    warning: (msg, opts) => addToast({ message: msg, type: 'warning', ...opts }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Portal */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4 sm:px-0"
      >
        {toasts.map(t => {
          const Icon = ICONS[t.type];
          return (
            <div
              key={t.id}
              role="alert"
              className={`
                flex items-start gap-3 px-4 py-3.5 rounded-2xl border
                pointer-events-auto w-full
                ${STYLES[t.type]}
                ${t.removing ? 'animate-toast-out' : 'animate-toast-in'}
              `}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${ICON_STYLES[t.type]}`}>
                <Icon size={15} strokeWidth={2.5} />
              </div>
              <p className={`text-sm font-medium flex-1 pt-1 ${TEXT_STYLES[t.type]}`}>{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors flex-shrink-0 -mt-0.5 -mr-0.5"
              >
                <X size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
