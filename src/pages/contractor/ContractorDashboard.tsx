/**
 * CIVORA Contractor Dashboard
 * Perspective: XYZ Infrastructure & Roads Pvt Ltd
 * Designed for contractor execution, milestone verification requests, and transparent payments.
 */

import React from 'react';
import {
  HardHat,
  Briefcase,
  CreditCard,
  Scale,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { ProjectCard } from '../../components/common/ProjectCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PRIMARY_PROJECT } from '../../data/mockData';

export const ContractorDashboard: React.FC = () => {
  const { navigate, setActiveProjectId, addToast } = useApp();

  const handleRequestInspection = () => {
    addToast({
      type: 'info',
      title: 'Inspection Request Submitted',
      message: 'Executive Engineer notified for Milestone 2 on-site QC inspection.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Contractor Execution Desk"
        subtitle="XYZ Infrastructure &amp; Roads Pvt Ltd &bull; Registration: PWD-PB-CL-A-8842 &bull; Active execution &amp; milestone payment tracking."
        badge={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            Execution &amp; Billing Layer
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRequestInspection}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Request On-Site Inspection</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveProjectId(PRIMARY_PROJECT.id);
                navigate(`/project/${PRIMARY_PROJECT.id}`);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Project Passport</span>
            </button>
          </div>
        }
      />

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Contracts"
          value="1 Project"
          subtitle="Model Town Ward 24"
          layerTag="Government & Project"
          accentColor="blue"
        />
        <MetricCard
          title="Awarded Contract Value"
          value="₹7.91 Lakh"
          subtitle="Sanctioned ₹8.40 Lakh"
          layerTag="Execution Layer"
          accentColor="slate"
        />
        <MetricCard
          title="Disbursed to Date"
          value="₹2.40 Lakh"
          subtitle="Milestone 1 Verified & Paid"
          layerTag="Accountability Layer"
          accentColor="emerald"
        />
        <MetricCard
          title="Warranty Bond Active"
          value="36 Months"
          subtitle="BG: PNB-BG-2024-99120"
          layerTag="Warranty Layer"
          accentColor="amber"
        />
      </div>

      {/* Active Work In-Progress Spotlight */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded inline-block">
              Current Contract in Execution
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              {PRIMARY_PROJECT.title} ({PRIMARY_PROJECT.id})
            </h2>
            <p className="text-xs text-slate-500">
              Department: {PRIMARY_PROJECT.department} &bull; Ward 24, Ludhiana
            </p>
          </div>
          <StatusBadge status={PRIMARY_PROJECT.status} size="md" />
        </div>

        {/* Milestone 2 Progress Highlight */}
        <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900">
                  Current Milestone: M2 — Bituminous Binder Course Laying
                </span>
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  40% Progress
                </span>
              </div>
              <p className="text-xs text-amber-800/90 mt-1">
                Laying 50mm Dense Bituminous Macadam (DBM). Compaction test logs being uploaded for Executive Engineer review.
              </p>
            </div>
            <span className="font-mono font-bold text-sm text-slate-900 shrink-0">
              ₹3,16,000
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate('/contractor/verification')}
              className="px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-200 hover:bg-amber-300 rounded-lg transition cursor-pointer"
            >
              Upload Quality Core Test Evidence
            </button>
            <span className="text-xs text-amber-700">
              Target Completion: 15 Oct 2024
            </span>
          </div>
        </div>

        {/* Payment Disbursal Status */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-700 font-medium">
              Milestone 1 Payment (₹2,40,000) credited via Punjab State e-Treasury Voucher #DEMO-TRZ-PB-2024-88491
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/contractor/payments')}
            className="text-blue-700 hover:underline font-semibold shrink-0 cursor-pointer"
          >
            View Treasury Ledger &rarr;
          </button>
        </div>
      </div>

      {/* Grid: Tender Opportunities & Active Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Open Tenders in Ludhiana (Eligible Class A)
            </h3>
            <button
              type="button"
              onClick={() => navigate('/contractor/tenders')}
              className="text-xs text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-slate-700">NIT-LDH-2024-0092</span>
                <span className="font-semibold text-xs text-emerald-700">₹14.20 Lakh</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">CC Paver Flooring — Sarabha Nagar Ward 28</h4>
              <p className="text-[11px] text-slate-500">Closes in 4 days &bull; EMD: ₹28,400</p>
            </div>
            <div className="py-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-slate-700">NIT-LDH-2024-0098</span>
                <span className="font-semibold text-xs text-emerald-700">₹22.50 Lakh</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Stormwater Drain Relining — Ferozepur Road</h4>
              <p className="text-[11px] text-slate-500">Closes in 9 days &bull; EMD: ₹45,000</p>
            </div>
          </div>
        </div>

        {/* Warranty Status Box */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Contractor Reputation &amp; Warranty Bonds
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Score: 94/100
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Your firm holds a 0% anomaly flag rate on asphalt temperature logs. 36-month defect liability bond will automatically unlock on 05 Dec 2027 upon successful public audit sign-off.
          </p>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Active Warranty Guarantee:</span>
              <span className="font-semibold text-slate-800">₹39,550 (5% Retention)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Defect Resolution SLA:</span>
              <span className="font-semibold text-emerald-700">&lt; 48 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
