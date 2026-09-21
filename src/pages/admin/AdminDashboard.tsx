/**
 * CIVORA Government / Admin Dashboard
 * Authoritative, institutional, data-dense control room for Municipal Works Directorate.
 */

import React from 'react';
import {
  Building2,
  FolderGit2,
  FileCheck2,
  CreditCard,
  ShieldAlert,
  HardHat,
  ArrowRight,
  TrendingUp,
  Search,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskIndicator } from '../../components/common/RiskIndicator';
import { MapContainer } from '../../components/common/MapContainer';
import { PRIMARY_PROJECT } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { navigate, setActiveProjectId, projects, anomalyFlags } = useApp();

  const formatLakh = (val: number) => `₹${(val / 100000).toFixed(2)} L`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Municipal Works Directorate"
        subtitle="Ludhiana Municipal Corporation &bull; Authoritative Closed-Loop Public Works &amp; Audit Oversight."
        badge={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            Government Layer
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin/risk-anomalies')}
              className="px-3.5 py-2 text-xs font-semibold text-rose-900 bg-rose-100 hover:bg-rose-200 border border-rose-300 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              <span>Anomaly Indicators ({anomalyFlags.length})</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>All Projects</span>
            </button>
          </div>
        }
      />

      {/* Institutional Macro Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Sanctioned Works Budget"
          value="₹4.20 Crore"
          subtitle="FY 2024–25 Capital Outlay"
          layerTag="Financial Layer"
          accentColor="blue"
        />
        <MetricCard
          title="Projects in Execution"
          value="7 Works"
          subtitle="Across Zones A, B, C, D"
          layerTag="Execution Layer"
          accentColor="slate"
        />
        <MetricCard
          title="Pending QC Verifications"
          value="3 Milestones"
          subtitle="Awaiting EE certification"
          layerTag="Verification Layer"
          accentColor="amber"
        />
        <MetricCard
          title="Anomaly Indicators"
          value="2 Flags"
          subtitle="Audit Review Required"
          layerTag="Intelligence Layer"
          accentColor="rose"
        />
      </div>

      {/* Map & Corridor Spatial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Active Municipal Works GIS Registry
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Live Spatial Layer
            </span>
          </div>
          <MapContainer wardName="Zone D &bull; Model Town &amp; Sarabha Nagar" />
        </div>

        {/* Anomaly / Human Review Queue */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                Audit Review Queue
              </span>
              <span className="text-xs font-mono text-slate-400">Layer 2</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900">
              Procurement &amp; Compaction Review
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              Automated audit algorithms flagged 2 potential procedural discrepancies across city tenders for human investigation.
            </p>

            <div className="space-y-2 pt-1">
              {anomalyFlags.map((flag) => (
                <div
                  key={flag.id}
                  onClick={() => navigate('/admin/risk-anomalies')}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/80 cursor-pointer transition space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <RiskIndicator level={flag.severity} />
                    <span className="text-[10px] font-mono text-slate-400">{flag.detectedAt}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-slate-900">{flag.title}</h5>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{flag.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/admin/risk-anomalies')}
            className="mt-4 w-full py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition text-center cursor-pointer"
          >
            Review Institutional Risk Dashboard &rarr;
          </button>
        </div>
      </div>

      {/* Authoritative Projects Data Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Municipal Capital Projects Register
            </h3>
            <p className="text-xs text-slate-500">
              Comprehensive ledger connecting sanctions, contractors, milestones, and disbursements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
          >
            Full Register &rarr;
          </button>
        </div>

        <DataTable
          columns={[
            {
              key: 'id',
              header: 'Project ID',
              render: (p) => (
                <span className="font-mono text-xs font-semibold text-blue-700">
                  {p.id}
                </span>
              ),
            },
            {
              key: 'title',
              header: 'Project Title & Ward',
              render: (p) => (
                <div>
                  <span className="font-bold text-slate-900 block text-xs truncate max-w-xs">{p.title}</span>
                  <span className="text-[11px] text-slate-500">{p.ward}, {p.city}</span>
                </div>
              ),
            },
            {
              key: 'contractValue',
              header: 'Sanction / Value',
              render: (p) => (
                <div>
                  <span className="font-bold text-slate-900 font-sans text-xs block">{formatLakh(p.contractValue)}</span>
                  <span className="text-[11px] text-slate-400">Est: {formatLakh(p.estimatedCost)}</span>
                </div>
              ),
            },
            {
              key: 'contractorName',
              header: 'Contractor',
              render: (p) => (
                <span className="text-xs text-slate-700 font-medium">
                  {p.contractorName}
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (p) => <StatusBadge status={p.status} size="sm" />,
            },
            {
              key: 'actions',
              header: 'Action',
              render: (p) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProjectId(p.id);
                    navigate(`/project/${p.id}`);
                  }}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 cursor-pointer"
                >
                  Inspect Passport
                </button>
              ),
            },
          ]}
          data={projects}
          onRowClick={(p) => {
            setActiveProjectId(p.id);
            navigate(`/project/${p.id}`);
          }}
        />
      </div>
    </div>
  );
};
