/**
 * CIVORA ActivityFeed Component
 * Real-time public audit log and event feed across the 5 system layers.
 */

import React from 'react';
import { Shield, Clock, Hash, CheckCircle, FileText, ArrowUpRight } from 'lucide-react';
import { AuditLogEntry } from '../../types';

interface ActivityFeedProps {
  activities: AuditLogEntry[];
  maxItems?: number;
  className?: string;
  id?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  maxItems = 5,
  className = '',
  id,
}) => {
  const displayed = activities.slice(0, maxItems);

  const layerBadges: Record<string, string> = {
    'Citizen Layer': 'text-purple-700 bg-purple-50 border-purple-200',
    'Intelligence Layer': 'text-sky-700 bg-sky-50 border-sky-200',
    'Government & Project Layer': 'text-blue-700 bg-blue-50 border-blue-200',
    'Execution & Verification Layer': 'text-amber-700 bg-amber-50 border-amber-200',
    'Financial & Accountability Layer': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}
    >
      <div className="bg-slate-50 border-b border-slate-200/80 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Cryptographic Audit Trail
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          IMMUTABLE LOGS
        </span>
      </div>

      <div className="divide-y divide-slate-100 p-2">
        {displayed.map((item) => (
          <div
            key={item.id}
            className="p-3.5 hover:bg-slate-50/70 transition rounded-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-900">
                    {item.action}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded border ${
                      layerBadges[item.systemLayer] || 'text-slate-600 bg-slate-100'
                    }`}
                  >
                    {item.systemLayer}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.details}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Actor: <strong className="text-slate-700">{item.actor}</strong></span>
                  <span>&bull;</span>
                  <span className="font-mono">{item.timestamp}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 block">
                  #{item.blockHash.slice(0, 10)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
