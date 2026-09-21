/**
 * CIVORA Contractor Sub-Views Shell
 * Provides shells for:
 * - /contractor/eligible
 * - /contractor/tenders
 * - /contractor/bids
 * - /contractor/contracts
 * - /contractor/active-projects
 * - /contractor/milestones
 * - /contractor/verification
 * - /contractor/payments
 * - /contractor/warranty
 */

import React, { useState } from 'react';
import {
  Briefcase,
  Gavel,
  FileCheck2,
  HardHat,
  CheckSquare,
  ShieldCheck,
  CreditCard,
  Scale,
  Upload,
  Camera,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PaymentCard } from '../../components/common/PaymentCard';
import { VerificationCard } from '../../components/common/VerificationCard';
import { DocumentCard } from '../../components/common/DocumentCard';
import { PRIMARY_PROJECT } from '../../data/mockData';

interface ContractorPageShellProps {
  view:
    | 'eligible'
    | 'tenders'
    | 'bids'
    | 'contracts'
    | 'active-projects'
    | 'milestones'
    | 'verification'
    | 'payments'
    | 'warranty';
}

export const ContractorPageShell: React.FC<ContractorPageShellProps> = ({ view }) => {
  const { navigate, addToast } = useApp();
  const [evidenceSubmitted, setEvidenceSubmitted] = useState(false);

  const handleEvidenceUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setEvidenceSubmitted(true);
    addToast({
      type: 'success',
      title: 'Milestone QC Evidence Submitted',
      message: 'Compaction test log & geo-tagged site images logged to cryptographic audit ledger.',
    });
  };

  if (view === 'milestones') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Contract Milestones &amp; Deliverables"
          subtitle="Milestones for PRJ-PB-LDH-W24-00041 &bull; Road Resurfacing Ward 24"
          breadcrumbs={[
            { label: 'Contractor Portal', path: '/contractor/dashboard' },
            { label: 'Milestones' },
          ]}
        />

        <div className="space-y-4">
          {PRIMARY_PROJECT.milestones.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {m.number}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                </div>
                <StatusBadge status={m.status} size="sm" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {m.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Contract Amount</span>
                  <span className="font-semibold text-slate-900">₹{(m.amount / 100000).toFixed(2)} Lakh</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Target Date</span>
                  <span className="font-medium text-slate-700">{m.targetDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Weightage</span>
                  <span className="font-semibold text-slate-900">{m.weightagePercent}%</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Action</span>
                  {m.status === 'in_progress' ? (
                    <button
                      type="button"
                      onClick={() => navigate('/contractor/verification')}
                      className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
                    >
                      Submit QC Evidence &rarr;
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-semibold">Verified &amp; Paid</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'verification') {
    return (
      <div className="space-y-6 max-w-4xl">
        <PageHeader
          title="Milestone Verification &amp; QC Evidence Submission"
          subtitle="Upload core cutter laboratory certificates, compaction reports, and timestamped site photos."
          breadcrumbs={[
            { label: 'Contractor Portal', path: '/contractor/dashboard' },
            { label: 'Verification' },
          ]}
        />

        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900">
            Submit QC Verification: Milestone 2 (Bituminous Binder Course)
          </h3>

          <form onSubmit={handleEvidenceUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Test Description &amp; Lab Accreditation
              </label>
              <input
                type="text"
                required
                defaultValue="NABL Core Cutter Lab Test #CC-LDH-882 — Bitumen Density 2.38 g/cc"
                className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Asphalt Laying Temperature (°C)
                </label>
                <input
                  type="number"
                  defaultValue={142}
                  className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                />
                <span className="text-[11px] text-slate-500">Normal specification: 135°C – 160°C</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Compaction Level (% Marshall)
                </label>
                <input
                  type="number"
                  defaultValue={98.4}
                  className="mt-1 w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                />
                <span className="text-[11px] text-slate-500">Minimum threshold: 97.5%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload Signed NABL Laboratory Certificate (PDF)
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-xl p-5 text-center bg-slate-50/50 cursor-pointer">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-700">
                  Click to select NABL test certificate PDF
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition cursor-pointer"
            >
              Submit for Executive Engineer Audit
            </button>
          </form>
        </div>

        {/* Existing verifications list */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Past Milestone Verifications
          </h4>
          {PRIMARY_PROJECT.verifications.map((v) => (
            <VerificationCard key={v.id} verification={v} />
          ))}
        </div>
      </div>
    );
  }

  if (view === 'payments') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Payment Disbursals &amp; Treasury Vouchers"
          subtitle="Trace every disbursed rupee against certified milestone invoices."
          breadcrumbs={[
            { label: 'Contractor Portal', path: '/contractor/dashboard' },
            { label: 'Payments' },
          ]}
        />

        <div className="space-y-3">
          {PRIMARY_PROJECT.payments.map((p) => (
            <PaymentCard key={p.id} payment={p} />
          ))}
        </div>
      </div>
    );
  }

  if (view === 'contracts' || view === 'active-projects') {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Active Contracts"
          subtitle="Signed civic infrastructure contracts awarded to XYZ Infrastructure &amp; Roads Pvt Ltd."
          breadcrumbs={[
            { label: 'Contractor Portal', path: '/contractor/dashboard' },
            { label: 'Contracts' },
          ]}
        />

        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                CTR-2024-LDH-XYZ
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {PRIMARY_PROJECT.title}
              </h3>
              <p className="text-xs text-slate-500">
                Sanctioned: {PRIMARY_PROJECT.sanctionOrderNumber} &bull; Ludhiana Municipal Corporation
              </p>
            </div>
            <StatusBadge status={PRIMARY_PROJECT.status} size="md" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 text-[11px] block">Contract Value</span>
              <span className="font-bold text-slate-900 text-sm">₹7.91 Lakh</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Award Date</span>
              <span className="font-medium text-slate-800">28 Mar 2024</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Physical Progress</span>
              <span className="font-semibold text-blue-700">40%</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Warranty Bond</span>
              <span className="font-semibold text-emerald-700">Active (36 Mo)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // default / tenders / eligible / warranty
  return (
    <div className="space-y-6">
      <PageHeader
        title={
          view === 'warranty'
            ? 'Warranty & Defect Liability Tracker'
            : view === 'bids'
            ? 'My Submitted Bids'
            : 'Open Tenders & Eligible Works'
        }
        subtitle="Authoritative contract tracking and procurement opportunities."
        breadcrumbs={[
          { label: 'Contractor Portal', path: '/contractor/dashboard' },
          { label: view },
        ]}
      />

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          {view === 'warranty'
            ? 'Active 36-Month Warranty Registry'
            : 'Ludhiana Municipal Corporation E-Procurement'}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {view === 'warranty'
            ? 'Contract PRJ-PB-LDH-W24-00041 defect liability bond is linked to bank guarantee PNB-BG-2024-99120. Defect reports from residents trigger 72-hour rectification workflows.'
            : 'All technical bids and BOQ rates are digitally sealed until official opening date.'}
        </p>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <span className="font-mono text-slate-500 block">STATUS: AUTHORITATIVE RECORD SYNCHRONIZED</span>
          <span className="font-bold text-slate-800 text-sm mt-1 block">
            {view === 'warranty' ? 'Defect Liability Period: Active' : 'Procurement Cycle: Q2 2024'}
          </span>
        </div>
      </div>
    </div>
  );
};
