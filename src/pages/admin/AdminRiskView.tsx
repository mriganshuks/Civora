/**
 * CIVORA Institutional Risk & Anomaly Indicators View
 * Follows strict compliance with Section 16:
 * Uses institutional terminology: "Anomaly Indicators", "Review Required", "Human Investigation", "Algorithmic Discrepancy".
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  FileSearch,
  Users,
  Search,
  Clock,
  ArrowRight,
  Filter,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { RiskIndicator } from '../../components/common/RiskIndicator';
import { Modal } from '../../components/common/Modal';
import { AnomalyFlag } from '../../types';

export const AdminRiskView: React.FC = () => {
  const { anomalyFlags, addToast } = useApp();
  const [selectedFlag, setSelectedFlag] = useState<AnomalyFlag | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investigationNotes, setInvestigationNotes] = useState('');

  const handleOpenReview = (flag: AnomalyFlag) => {
    setSelectedFlag(flag);
    setInvestigationNotes('');
    setIsModalOpen(true);
  };

  const handleResolveAction = (actionType: string) => {
    setIsModalOpen(false);
    addToast({
      type: 'success',
      title: 'Audit Action Recorded',
      message: `${actionType} logged to tamper-proof municipal audit ledger for ${selectedFlag?.id}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Anomaly Indicators &amp; Institutional Review"
        subtitle="Continuous algorithmic monitoring across procurement bids, site photography hashes, material quantities, and payment velocity."
        breadcrumbs={[
          { label: 'Admin Portal', path: '/admin/dashboard' },
          { label: 'Risk & Anomalies' },
        ]}
      />

      {/* Institutional Explainer Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900">
            Algorithmic Discrepancy Detection Framework
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Flags indicate mathematical or procedural variances requiring human investigation by the Municipal Vigilance Officer. An indicator is not a formal finding of misconduct; it ensures strict pre-payment verification and prevents public resource leakage.
          </p>
        </div>
      </div>

      {/* Active Anomaly Indicators List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Active Review Queue ({anomalyFlags.length} Indicators Flagged)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            LAYER 2 INTELLIGENCE ENGINE
          </span>
        </div>

        <div className="space-y-3">
          {anomalyFlags.map((flag) => (
            <div
              key={flag.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3 hover:border-slate-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {flag.id}
                    </span>
                    <span className="font-mono text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {flag.projectId}
                    </span>
                    <RiskIndicator level={flag.severity} />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {flag.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {flag.description}
                  </p>
                </div>

                <div className="shrink-0 text-right sm:text-right">
                  <span className="text-[11px] text-slate-400 font-mono block">
                    Detected: {flag.detectedAt}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenReview(flag)}
                    className="mt-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition cursor-pointer"
                  >
                    Conduct Human Review
                  </button>
                </div>
              </div>

              {/* Technical Indicator Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 text-[11px] block">Investigation Protocol</span>
                  <span className="font-medium text-slate-800">{flag.investigationProtocol}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 text-[11px] block">Disbursement Status</span>
                  <span className="font-semibold text-rose-700">Payment Voucher Paused</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 text-[11px] block">Assigned Auditor</span>
                  <span className="font-medium text-slate-800">Chief Vigilance Officer, MCL</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human Investigation Modal */}
      {selectedFlag && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Human Investigation Desk: ${selectedFlag.id}`}
          subtitle={`Project ${selectedFlag.projectId} — ${selectedFlag.title}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-900 block">Algorithmic Discrepancy Details:</span>
              <p className="text-amber-800 leading-relaxed">{selectedFlag.description}</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Official Investigation Findings &amp; Engineering Notes
              </label>
              <textarea
                rows={3}
                value={investigationNotes}
                onChange={(e) => setInvestigationNotes(e.target.value)}
                placeholder="Document core sample review, GPS metadata verification, or supplier invoice reconciliation..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Determine Administrative Action:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleResolveAction('Mandated Third-Party Physical Core Test')}
                  className="px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg border border-amber-300 transition text-left cursor-pointer"
                >
                  Request Independent 3rd-Party Lab Audit
                </button>
                <button
                  type="button"
                  onClick={() => handleResolveAction('Auditor Physical Verification Approved')}
                  className="px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg border border-emerald-300 transition text-left cursor-pointer"
                >
                  Verify Compliance &amp; Clear Indicator
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
