/**
 * CIVORA IssueCard Component
 * Citizen Grievance & Cluster card with geo-tags and verification status.
 */

import React from 'react';
import { MapPin, ThumbsUp, Layers, Clock, AlertCircle } from 'lucide-react';
import { Complaint } from '../../types';
import { StatusBadge } from './StatusBadge';

interface IssueCardProps {
  complaint: Complaint;
  onClick?: () => void;
  className?: string;
  id?: string;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  complaint,
  onClick,
  className = '',
  id,
}) => {
  const priorityColors = {
    low: 'text-slate-600 bg-slate-100',
    medium: 'text-blue-700 bg-blue-50 border-blue-200',
    high: 'text-amber-700 bg-amber-50 border-amber-200',
    urgent: 'text-rose-700 bg-rose-50 border-rose-200',
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-mono text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
          {complaint.id}
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
              priorityColors[complaint.priority]
            }`}
          >
            {complaint.priority}
          </span>
          <StatusBadge status={complaint.status} size="sm" />
        </div>
      </div>

      <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mt-1">
        {complaint.title}
      </h4>

      <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
        {complaint.description}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-100">
        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="truncate">{complaint.location.address}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
        <div className="flex items-center gap-2">
          {complaint.clusterId && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              <Layers className="w-3 h-3" />
              {complaint.clusterId}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
            <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
            {complaint.upvotesCount}
          </span>
          <span className="text-[11px] text-slate-400">
            {complaint.submittedAt.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};
