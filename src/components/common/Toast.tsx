/**
 * CIVORA Toast Notification Component
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    error: ShieldAlert,
  };

  const styles = {
    info: 'bg-slate-900 text-white border-slate-700',
    success: 'bg-emerald-900 text-white border-emerald-700',
    warning: 'bg-amber-900 text-white border-amber-700',
    error: 'bg-rose-900 text-white border-rose-700',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const IconComp = icons[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl text-xs transition animate-slide-up ${
              styles[toast.type]
            }`}
          >
            <IconComp className="w-4 h-4 shrink-0 mt-0.5 opacity-90" />
            <div className="flex-1 space-y-0.5">
              <h5 className="font-semibold text-xs tracking-tight">{toast.title}</h5>
              <p className="text-[11px] opacity-80 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 p-0.5 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
