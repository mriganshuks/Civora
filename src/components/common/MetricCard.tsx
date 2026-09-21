/**
 * CIVORA MetricCard Component
 * High contrast, mathematically spaced, institutional data presentation.
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    positive: boolean;
    label?: string;
  };
  icon?: LucideIcon;
  layerTag?: string;
  accentColor?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'slate' | 'rose';
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  layerTag,
  accentColor = 'slate',
  onClick,
  className = '',
}) => {
  const accentBorders = {
    slate: 'hover:border-slate-300',
    blue: 'hover:border-blue-300',
    emerald: 'hover:border-emerald-300',
    amber: 'hover:border-amber-300',
    indigo: 'hover:border-indigo-300',
    rose: 'hover:border-rose-300',
  };

  const iconColors = {
    slate: 'text-slate-600 bg-slate-100',
    blue: 'text-blue-600 bg-blue-50 border border-blue-100',
    emerald: 'text-emerald-700 bg-emerald-50 border border-emerald-100',
    amber: 'text-amber-700 bg-amber-50 border border-amber-100',
    indigo: 'text-indigo-600 bg-indigo-50 border border-indigo-100',
    rose: 'text-rose-700 bg-rose-50 border border-rose-100',
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition-all duration-150 ${accentBorders[accentColor]} ${onClick ? 'cursor-pointer hover:shadow-sm' : ''} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {layerTag && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {layerTag}
            </span>
          )}
          <p className="text-xs font-medium text-slate-600 tracking-tight mt-1">{title}</p>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${iconColors[accentColor]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
          {value}
        </div>
        {(subtitle || trend) && (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
            {trend && (
              <span
                className={`font-medium inline-flex items-center gap-0.5 ${
                  trend.positive ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
            )}
            {subtitle && <span className="truncate">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
