/**
 * CIVORA VerificationCard Component
 * Execution & Verification Layer
 * AI-assisted checks + On-site Human Engineering verification
 */

import React from 'react';
import { CheckCircle2, ShieldCheck, UserCheck, FileText, Lock, Sparkles } from 'lucide-react';
import { TechnicalVerification } from '../../types';

interface VerificationCardProps {
  verification: TechnicalVerification;
  className?: string;
  id?: string;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  verification,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}
    >
      <div className="bg-slate-50 border-b border-slate-200/80 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-900">
            Technical Quality &amp; Engineering Sign-off
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          ID: {verification.id}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Inspector Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                {verification.inspectorName}
              </h4>
              <p className="text-xs text-slate-500">
                {verification.inspectorDesignation} &bull; {verification.department}
              </p>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="text-slate-400 block text-[11px]">Inspection Timestamp</span>
            <span className="font-medium text-slate-800">{verification.verifiedAt}</span>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            Quality Assurance Protocol Checklist
          </span>
          <div className="space-y-2">
            {verification.inspectionChecklist.map((chk, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-medium text-slate-900 block">{chk.item}</span>
                  <span className="text-slate-600 text-[11px] mt-0.5 block">{chk.remarks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core samples and lab reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
            <span className="text-slate-500 text-[11px] block">Material Test Cores</span>
            <span className="font-medium text-slate-900 flex items-center gap-1 mt-0.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              {verification.materialTestCoresTaken ? 'Cores Extracted & Tested' : 'Visual Inspection Only'}
            </span>
            {verification.labTestReportRef && (
              <span className="font-mono text-[11px] text-slate-500 mt-1 block">
                Ref: {verification.labTestReportRef}
              </span>
            )}
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
            <span className="text-slate-500 text-[11px] block">Spatial Boundary Check</span>
            <span className="font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Geo-Coordinates Validated in Ward
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Accuracy: &plusmn;1.4m via RTK GNSS
            </span>
          </div>
        </div>

        {/* Cryptographic hash representation */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono">
          <div className="flex items-center gap-2 truncate">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] text-slate-400">HASH:</span>
            <span className="truncate text-slate-200">
              {verification.tamperProofInspectionHash}
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-sans font-semibold uppercase bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
            Certified
          </span>
        </div>
      </div>
    </div>
  );
};
