/**
 * CIVORA EvidenceCard Component
 * Geo-tagged visual and technical evidence with cryptographic tamper-proof hash
 */

import React from 'react';
import { MapPin, Clock, Lock, Sparkles, User, ExternalLink } from 'lucide-react';
import { Evidence } from '../../types';

interface EvidenceCardProps {
  evidence: Evidence;
  onClick?: () => void;
  className?: string;
  id?: string;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onClick,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition hover:border-slate-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="relative aspect-video bg-slate-100 overflow-hidden group">
        <img
          src={evidence.url}
          alt={evidence.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium">
          <Clock className="w-3 h-3 text-slate-300" />
          <span>{evidence.timestamp}</span>
        </div>
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded bg-blue-600/90 text-white text-[10px] font-semibold uppercase tracking-wider">
          {evidence.type}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
          {evidence.title}
        </h4>

        {/* AI Assisted labels */}
        {evidence.aiLabels && evidence.aiLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {evidence.aiLabels.map((label, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-medium bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded"
              >
                <Sparkles className="w-2.5 h-2.5 text-sky-600" />
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{evidence.capturedBy}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[120px]">
            {evidence.tamperProofHash}
          </span>
        </div>
      </div>
    </div>
  );
};
