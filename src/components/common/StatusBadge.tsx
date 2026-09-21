/**
 * CIVORA StatusBadge Component
 * Semantic color coding:
 * Green = verified / completed / passed
 * Blue = active / in_progress / information
 * Amber = pending / review / under_assessment
 * Red = risk / rejected / urgent / delayed
 * Gray = inactive / archived / draft
 */

import React from 'react';

export type BadgeVariant =
  | 'verified'
  | 'completed'
  | 'active'
  | 'in_progress'
  | 'pending'
  | 'review'
  | 'risk'
  | 'rejected'
  | 'neutral'
  | 'sanctioned'
  | 'ai_assisted';

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
  id?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant,
  size = 'md',
  showDot = true,
  className = '',
  id,
}) => {
  // Infer variant if not explicitly provided
  const resolvedVariant: BadgeVariant =
    variant ||
    (() => {
      const s = status.toLowerCase();
      if (s.includes('verif') || s.includes('complet') || s.includes('paid') || s.includes('passed') || s.includes('resolved')) {
        return 'verified';
      }
      if (s.includes('progress') || s.includes('active') || s.includes('award') || s.includes('execut')) {
        return 'active';
      }
      if (s.includes('pend') || s.includes('review') || s.includes('assess') || s.includes('cluster')) {
        return 'pending';
      }
      if (s.includes('risk') || s.includes('delay') || s.includes('reject') || s.includes('urgent')) {
        return 'risk';
      }
      if (s.includes('ai') || s.includes('intel')) {
        return 'ai_assisted';
      }
      return 'neutral';
    })();

  const styles: Record<BadgeVariant, { bg: string; text: string; dot: string; border: string }> = {
    verified: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200/80',
    },
    completed: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200/80',
    },
    active: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      dot: 'bg-blue-500',
      border: 'border-blue-200/80',
    },
    in_progress: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      dot: 'bg-blue-500',
      border: 'border-blue-200/80',
    },
    pending: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      border: 'border-amber-200/80',
    },
    review: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      border: 'border-amber-200/80',
    },
    risk: {
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      dot: 'bg-rose-500',
      border: 'border-rose-200/80',
    },
    rejected: {
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      dot: 'bg-rose-500',
      border: 'border-rose-200/80',
    },
    sanctioned: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      dot: 'bg-indigo-500',
      border: 'border-indigo-200/80',
    },
    ai_assisted: {
      bg: 'bg-sky-50',
      text: 'text-sky-900',
      dot: 'bg-sky-500',
      border: 'border-sky-200/80',
    },
    neutral: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      dot: 'bg-slate-400',
      border: 'border-slate-200',
    },
  };

  const current = styles[resolvedVariant] || styles.neutral;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] font-medium tracking-tight',
    md: 'px-2.5 py-1 text-xs font-medium tracking-tight',
    lg: 'px-3 py-1.5 text-xs font-semibold tracking-normal',
  };

  // Humanize label: replace underscores, capitalize words
  const formatLabel = (str: string) => {
    return str
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span className={`h-1.5 w-1.5 rounded-full ${current.dot} shrink-0`} />
      )}
      <span>{formatLabel(status)}</span>
    </span>
  );
};
