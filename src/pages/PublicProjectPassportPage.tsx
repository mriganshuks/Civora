/**
 * CIVORA Public Project Passport Page
 * Route: /project/:projectId
 * Example: PRJ-PB-LDH-W24-00041 (Road Resurfacing — Ward 24)
 * Publicly accessible without requiring admin authentication.
 * Prioritizes transparency, readability, and financial traceability.
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  QrCode,
  CheckCircle2,
  Clock,
  Download,
  Share2,
  ExternalLink,
  Receipt,
  FileText,
  UserCheck,
  Building2,
  Calendar,
  Layers,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { LifecycleTimeline } from '../components/common/LifecycleTimeline';
import { PaymentCard } from '../components/common/PaymentCard';
import { VerificationCard } from '../components/common/VerificationCard';
import { EvidenceCard } from '../components/common/EvidenceCard';
import { DocumentCard } from '../components/common/DocumentCard';
import { ActivityFeed } from '../components/common/ActivityFeed';
import { PassportQRCard } from '../components/common/PassportQRCard';
import { MapContainer } from '../components/common/MapContainer';

export const PublicProjectPassportPage: React.FC = () => {
  const { activeProject, navigate, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'financials'
    | 'milestones'
    | 'verification'
    | 'warranty'
    | 'audit'
  >('overview');

  const formatInr = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatLakh = (val: number) => {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'success',
      title: 'Passport Link Copied',
      message: 'Public passport URL copied to clipboard.',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-16">
      {/* Top Brand Banner */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Civora Home</span>
          </button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-wider">CIVORA</span>
            <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              OPEN PUBLIC AUDIT REGISTRY
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-md font-semibold transition cursor-pointer"
          >
            Citizen Sign In
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Project Header Banner */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">
                  {activeProject.id}
                </span>
                <StatusBadge status={activeProject.status} size="md" />
                <span className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Public Blockchain-Hashed Record
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeProject.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {activeProject.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {activeProject.ward}, {activeProject.city}, {activeProject.state}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {activeProject.department}
                </span>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 space-y-2 text-right sm:text-left min-w-[200px]">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">
                Contract Sanction Value
              </span>
              <div className="text-2xl font-bold text-slate-900 font-sans">
                {formatLakh(activeProject.contractValue)}
              </div>
              <span className="text-xs text-slate-500 block">
                Disbursed: <strong className="text-emerald-700">{formatLakh(activeProject.disbursedAmount)}</strong> ({Math.round((activeProject.disbursedAmount / activeProject.contractValue) * 100)}%)
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Physical Work Execution</span>
              <span className="text-blue-700">{activeProject.progressPercent}% Completed</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${activeProject.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* QR Code Presentation Component */}
        <PassportQRCard
          projectId={activeProject.id}
          projectTitle={activeProject.title}
          ward={activeProject.ward}
          status={activeProject.status}
          sanctionedAmount={formatLakh(activeProject.contractValue)}
        />

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview & Lifecycle' },
            { id: 'financials', label: 'Financial Traceability & Payments' },
            { id: 'milestones', label: 'Execution Milestones' },
            { id: 'verification', label: 'Technical Verification' },
            { id: 'warranty', label: 'Warranty & Maintenance' },
            { id: 'audit', label: 'Public Audit Ledger' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* 14-step Lifecycle Flow */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                14-Step Closed-Loop Project Journey
              </h3>
              <p className="text-xs text-slate-500">
                Trace how this project started from citizen complaint {activeProject.originatingComplaintId} to current on-site binder execution.
              </p>
              <LifecycleTimeline />
            </div>

            {/* GIS Map and Key Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  GIS Ward Corridor Boundaries
                </h3>
                <MapContainer wardName={`${activeProject.ward}, ${activeProject.city}`} />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Authoritative Documents
                </h3>
                <DocumentCard
                  title="Administrative & Technical Sanction Order"
                  documentType="Administrative Sanction"
                  documentNumber={activeProject.sanctionOrderNumber}
                  date="05 Mar 2024"
                  fileSize="2.1 MB (PDF)"
                />
                <DocumentCard
                  title="Notice Inviting Tender (NIT) & Bill of Quantities"
                  documentType="Tender Document"
                  documentNumber={activeProject.tenderNumber}
                  date="15 Mar 2024"
                  fileSize="3.4 MB (PDF)"
                />
                <DocumentCard
                  title="Contract Agreement & Defect Liability Bond"
                  documentType="Contract Award"
                  documentNumber="CTR-2024-LDH-XYZ"
                  date={activeProject.contractAwardDate}
                  fileSize="1.8 MB (PDF)"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="space-y-6 animate-fade-in">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Estimated Cost (DPR)</span>
                <div className="text-xl font-bold text-slate-900 font-sans mt-1">
                  {formatInr(activeProject.estimatedCost)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Sanctioned Amount</span>
                <div className="text-xl font-bold text-slate-900 font-sans mt-1">
                  {formatInr(activeProject.sanctionedAmount)}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Awarded Contract Value</span>
                <div className="text-xl font-bold text-slate-900 font-sans mt-1">
                  {formatInr(activeProject.contractValue)}
                </div>
                <span className="text-[11px] text-emerald-700">5.8% below sanction estimate</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Certified &amp; Disbursed</span>
                <div className="text-xl font-bold text-emerald-700 font-sans mt-1">
                  {formatInr(activeProject.disbursedAmount)}
                </div>
                <span className="text-[11px] text-slate-500">Milestone 1 completed</span>
              </div>
            </div>

            {/* Payment Audit Cards */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Treasury Disbursement Records (Every Rupee&apos;s Digital Journey)
              </h3>
              {activeProject.payments.map((p) => (
                <PaymentCard key={p.id} payment={p} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900">
              Contractual Milestones &amp; Execution Deliverables
            </h3>
            <div className="space-y-3">
              {activeProject.milestones.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
                      <span className="text-slate-400 text-[11px] block">Milestone Amount</span>
                      <span className="font-semibold text-slate-900 font-sans">{formatInr(m.amount)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Weightage</span>
                      <span className="font-semibold text-slate-900">{m.weightagePercent}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Target Date</span>
                      <span className="font-medium text-slate-700">{m.targetDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Payment Voucher</span>
                      <span className="font-mono text-[11px] text-blue-700 truncate block">
                        {m.paymentRef || 'Pending Verification'}
                      </span>
                    </div>
                  </div>

                  {m.inspectorNotes && (
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 text-xs text-slate-700">
                      <strong>QC Inspection Notes:</strong> {m.inspectorNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900">
              Technical Verification &amp; Photographic Evidence
            </h3>
            {activeProject.verifications.map((v) => (
              <VerificationCard key={v.id} verification={v} />
            ))}

            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Site Photographic Evidence
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProject.evidenceGallery.map((e) => (
                  <EvidenceCard key={e.id} evidence={e} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                Defect Liability &amp; Warranty Registry
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Every road works contract in Civora includes a mandatory 36-month defect liability period backed by a verified bank guarantee. If cracks or potholes develop during this window, the contractor is legally obligated to repair within 72 hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Warranty Duration</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  {activeProject.warranty.defectLiabilityPeriodMonths} Months (3 Years)
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Warranty Guarantee Bond</span>
                <span className="font-mono text-[11px] text-slate-900 mt-0.5 block">
                  {activeProject.warranty.contractorGuaranteeRef}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Periodic Health Audits</span>
                <span className="font-semibold text-blue-700 text-sm mt-0.5 block">
                  {activeProject.warranty.periodicInspectionsCompleted} of {activeProject.warranty.scheduledInspectionsTotal} Audits Completed
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900">
              Immutable Cryptographic Audit Trail
            </h3>
            <ActivityFeed activities={activeProject.auditLogs} maxItems={10} />
          </div>
        )}
      </main>
    </div>
  );
};
