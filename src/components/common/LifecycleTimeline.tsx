/**
 * CIVORA Closed-Loop Lifecycle Timeline
 * Visualizes the 14-step closed-loop lifecycle from Citizen Need to Verified Public Outcome:
 * 1. Citizen Need
 * 2. Verified Problem
 * 3. Responsible Authority
 * 4. Project Created
 * 5. Budget / Sanction
 * 6. Procurement
 * 7. Contract
 * 8. Work Execution
 * 9. Technical Verification
 * 10. Government Payment
 * 11. Citizen Verification
 * 12. Warranty / Maintenance
 * 13. Public Audit Trail
 * 14. Verified Public Outcome
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

export interface LifecycleStep {
  id: number;
  label: string;
  layer:
    | 'Citizen Layer'
    | 'Intelligence Layer'
    | 'Government & Project Layer'
    | 'Execution & Verification Layer'
    | 'Financial & Accountability Layer';
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  reference?: string;
  details: string;
}

export const DEFAULT_LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    id: 1,
    label: 'Citizen Need',
    layer: 'Citizen Layer',
    status: 'completed',
    date: '18 Feb 2024',
    reference: 'CMP-PB-LDH-W24-000173',
    details: '14 residents in Ward 24 reported severe asphalt degradation and hazardous transit potholes.',
  },
  {
    id: 2,
    label: 'Verified Problem',
    layer: 'Intelligence Layer',
    status: 'completed',
    date: '18 Feb 2024',
    reference: 'ISSUE-LDH-W24-00041',
    details: 'Spatial AI deduplication aggregated duplicate reports into an active corridor cluster with 96.4% confidence.',
  },
  {
    id: 3,
    label: 'Responsible Authority',
    layer: 'Government & Project Layer',
    status: 'completed',
    date: '22 Feb 2024',
    reference: 'MCL-B&R-DIV-02',
    details: 'Assigned to Municipal Corporation Ludhiana, Bridges & Roads Division, Sub-division 4.',
  },
  {
    id: 4,
    label: 'Project Created',
    layer: 'Government & Project Layer',
    status: 'completed',
    date: '28 Feb 2024',
    reference: 'PRJ-PB-LDH-W24-00041',
    details: 'Detailed Project Report (DPR) and GIS engineering survey completed for 1.2 km corridor.',
  },
  {
    id: 5,
    label: 'Budget / Sanction',
    layer: 'Government & Project Layer',
    status: 'completed',
    date: '05 Mar 2024',
    reference: 'AS/MCL/2024/W24/ENG-1049',
    details: 'Administrative and technical sanction approved for ₹8,40,000 under Ward Infrastructure Fund.',
  },
  {
    id: 6,
    label: 'Procurement',
    layer: 'Government & Project Layer',
    status: 'completed',
    date: '15 Mar 2024',
    reference: 'NIT-2024-MCL-BR-089',
    details: 'Open e-tendering via State Procurement Portal; 4 bids evaluated by technical committee.',
  },
  {
    id: 7,
    label: 'Contract Awarded',
    layer: 'Government & Project Layer',
    status: 'completed',
    date: '12 Apr 2024',
    reference: 'CTR-2024-LDH-XYZ',
    details: 'Awarded to L1 bidder XYZ Infrastructure for ₹7,91,000 with 36-month defect warranty bond.',
  },
  {
    id: 8,
    label: 'Work Execution',
    layer: 'Execution & Verification Layer',
    status: 'current',
    date: 'Active',
    reference: 'Milestone 2 of 4',
    details: 'Milestone 1 completed. Dense Bituminous Macadam (DBM) binder layer currently in execution (45% progress).',
  },
  {
    id: 9,
    label: 'Technical Verification',
    layer: 'Execution & Verification Layer',
    status: 'completed',
    date: '28 May 2024',
    reference: 'VER-LDH-001',
    details: 'Field cores and nuclear density tests verified by Executive Engineer (Quality Control).',
  },
  {
    id: 10,
    label: 'Government Payment',
    layer: 'Financial & Accountability Layer',
    status: 'completed',
    date: '04 Jun 2024',
    reference: 'DEMO-TRZ-PB-2024-88491',
    details: 'Treasury voucher registered for ₹2,40,000 for Milestone 1. "Every rupee has a digital journey."',
  },
  {
    id: 11,
    label: 'Citizen Verification',
    layer: 'Citizen Layer',
    status: 'upcoming',
    date: 'Scheduled Oct 2024',
    reference: 'Ward Walkthrough',
    details: 'Public inspection walk with local Ward 24 committee delegates before final sign-off.',
  },
  {
    id: 12,
    label: 'Warranty / Maintenance',
    layer: 'Financial & Accountability Layer',
    status: 'upcoming',
    date: '36 Months',
    reference: 'Defect Liability Bond',
    details: 'Mandatory 3-year contractor maintenance with geo-tagged periodic health surveys.',
  },
  {
    id: 13,
    label: 'Public Audit Trail',
    layer: 'Financial & Accountability Layer',
    status: 'completed',
    date: 'Real-time',
    reference: 'Digital Ledger',
    details: 'Cryptographically linked event logs accessible via public QR Project Passport.',
  },
  {
    id: 14,
    label: 'Verified Public Outcome',
    layer: 'Financial & Accountability Layer',
    status: 'upcoming',
    date: 'Target Nov 2024',
    reference: 'Outcome KPI',
    details: 'Defect-free corridor, zero pothole grievances, 100% financial reconciliation.',
  },
];

interface LifecycleTimelineProps {
  steps?: LifecycleStep[];
  mode?: 'horizontal' | 'vertical';
  className?: string;
  id?: string;
}

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({
  steps = DEFAULT_LIFECYCLE_STEPS,
  mode = 'horizontal',
  className = '',
  id,
}) => {
  const [selectedStep, setSelectedStep] = useState<LifecycleStep>(steps[7]); // Highlight Milestone 8 by default

  const layerColors: Record<string, string> = {
    'Citizen Layer': 'text-purple-700 bg-purple-50 border-purple-200',
    'Intelligence Layer': 'text-sky-700 bg-sky-50 border-sky-200',
    'Government & Project Layer': 'text-blue-700 bg-blue-50 border-blue-200',
    'Execution & Verification Layer': 'text-amber-700 bg-amber-50 border-amber-200',
    'Financial & Accountability Layer': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  };

  if (mode === 'horizontal') {
    return (
      <div id={id} className={`space-y-4 ${className}`}>
        {/* Horizontal Scrollable Bar */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs overflow-x-auto">
          <div className="flex items-center min-w-[920px] justify-between relative py-2 px-1">
            {/* Connecting line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

            {steps.map((step) => {
              const isSelected = selectedStep?.id === step.id;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  className="flex flex-col items-center group relative z-10 focus:outline-hidden cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                        : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400'
                    } ${isSelected ? 'scale-110 ring-4 ring-slate-900/20' : ''}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isCurrent ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">{step.id}</span>
                    )}
                  </div>

                  <span
                    className={`text-[11px] font-medium mt-2 max-w-[80px] text-center leading-tight transition ${
                      isSelected
                        ? 'text-slate-900 font-bold'
                        : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Deep Dive */}
        {selectedStep && (
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  {selectedStep.id}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {selectedStep.label}
                    </h4>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                        layerColors[selectedStep.layer]
                      }`}
                    >
                      {selectedStep.layer}
                    </span>
                  </div>
                  {selectedStep.reference && (
                    <span className="text-xs font-mono text-slate-500">
                      Ref: {selectedStep.reference}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Timestamp / Milestone:</span>
                <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded">
                  {selectedStep.date || 'Pending'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 mt-3 leading-relaxed">
              {selectedStep.details}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Vertical Timeline Mode (for detailed Audit Trail views)
  return (
    <div id={id} className={`space-y-4 ${className}`}>
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {steps.map((step) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';

          return (
            <div key={step.id} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -left-[27px] top-1 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-[10px] font-bold">{step.id}</span>
                )}
              </div>

              {/* Card */}
              <div className="bg-white rounded-lg border border-slate-200/90 p-3.5 shadow-xs transition hover:border-slate-300">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {step.id}. {step.label}
                    </span>
                    <span
                      className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded border ${
                        layerColors[step.layer]
                      }`}
                    >
                      {step.layer}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {step.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-snug mt-1">
                  {step.details}
                </p>

                {step.reference && (
                  <div className="mt-2 text-[11px] font-mono text-blue-700 bg-blue-50/70 px-2 py-0.5 rounded inline-block">
                    Ref: {step.reference}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
