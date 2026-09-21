/**
 * CIVORA Risk & Anomaly Indicator Component
 * Strictly complies with public accountability terminology:
 * "Anomaly Indicators", "Review Required", "Human Investigation"
 */

import React from 'react';
import { AlertTriangle, ShieldAlert, Info, HelpCircle } from 'lucide-react';
import { RiskAnomalyIndicator } from '../../types';

interface RiskIndicatorProps {
  anomaly?: RiskAnomalyIndicator;
  level?: 'low' | 'medium' | 'high';
  compact?: boolean;
  onInvestigateClick?: () => void;
  id?: string;
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  anomaly,
  level,
  compact = false,
  onInvestigateClick,
  id,
}) => {
  const activeSeverity = anomaly?.severity || level || 'medium';

  const severityConfigs = {
    low: {
      badgeText: 'ANOMALY INDICATOR: MINOR',
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      text: 'text-amber-900',
      icon: Info,
      iconColor: 'text-amber-600',
    },
    medium: {
      badgeText: 'REVIEW REQUIRED',
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-950',
      icon: AlertTriangle,
      iconColor: 'text-amber-700',
    },
    high: {
      badgeText: 'HUMAN INVESTIGATION RECOMMENDED',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-950',
      icon: ShieldAlert,
      iconColor: 'text-rose-700',
    },
  };

  const config = severityConfigs[activeSeverity] || severityConfigs.medium;
  const IconComponent = config.icon;

  if (compact || !anomaly) {
    return (
      <div
        id={id}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${config.bg} ${config.border} ${config.text}`}
      >
        <IconComponent className={`w-3.5 h-3.5 shrink-0 ${config.iconColor}`} />
        <span className="font-semibold tracking-wide text-[11px]">{config.badgeText}</span>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`rounded-lg border p-4 ${config.bg} ${config.border} text-slate-800 transition-all`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-white border border-slate-200/80 shadow-xs shrink-0">
            <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/80 border border-slate-200 ${config.text}`}>
                {config.badgeText}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Detected: {anomaly.detectedAt}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                AI Confidence: {(anomaly.aiConfidence * 100).toFixed(0)}%
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 mt-1">
              {anomaly.title}
            </h4>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed max-w-2xl">
              {anomaly.description}
            </p>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>AI-assisted workflow prompt. Requires independent verification by Public Works Audit Cell.</span>
            </div>
          </div>
        </div>

        {onInvestigateClick && (
          <button
            type="button"
            onClick={onInvestigateClick}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded shadow-xs shrink-0 cursor-pointer transition"
          >
            Review Case
          </button>
        )}
      </div>
    </div>
  );
};
