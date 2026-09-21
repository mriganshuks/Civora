/**
 * CIVORA Breadcrumbs & PageHeader Components
 */

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; id?: string }> = ({
  items,
  id,
}) => {
  const { navigate } = useApp();

  return (
    <nav
      id={id}
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs text-slate-500 mb-3"
    >
      <button
        type="button"
        onClick={() => navigate('/')}
        className="hover:text-slate-800 transition flex items-center gap-1 cursor-pointer"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {isLast || !item.path ? (
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => navigate(item.path!)}
                className="hover:text-slate-900 transition truncate max-w-[160px] cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  id?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
  breadcrumbs,
  id,
}) => {
  return (
    <div id={id} className="mb-6 space-y-2">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans">
              {title}
            </h1>
            {badge}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
