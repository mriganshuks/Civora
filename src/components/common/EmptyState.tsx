/**
 * CIVORA EmptyState & LoadingState Components
 */

import React from 'react';
import { LucideIcon, FolderSearch, Loader2, AlertTriangle } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  id?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderSearch,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/90 p-10 text-center flex flex-col items-center justify-center ${className}`}
    >
      <div className="p-3 bg-slate-100 rounded-full text-slate-500 mb-3 border border-slate-200">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

interface LoadingStateProps {
  message?: string;
  className?: string;
  id?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading verified civic records...',
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`p-12 flex flex-col items-center justify-center text-center ${className}`}
    >
      <Loader2 className="w-7 h-7 text-blue-600 animate-spin mb-3" />
      <p className="text-xs font-medium text-slate-600">{message}</p>
      <span className="text-[11px] font-mono text-slate-400 mt-1">
        CIVORA AUDIT INTEGRITY CHECK
      </span>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  id?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'System Synchronization Error',
  message = 'Failed to load authoritative records. Please try again.',
  onRetry,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`p-8 bg-rose-50/50 border border-rose-200 rounded-xl text-center flex flex-col items-center justify-center ${className}`}
    >
      <div className="p-2.5 bg-rose-100 rounded-full text-rose-700 mb-2">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-bold text-rose-950">{title}</h4>
      <p className="text-xs text-rose-700 max-w-sm mt-1">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 px-3 py-1.5 text-xs font-medium bg-white text-rose-900 border border-rose-300 rounded hover:bg-rose-50 transition cursor-pointer"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
};
