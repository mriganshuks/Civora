/**
 * CIVORA Citizen Dashboard (Phase 2)
 * Dynamic data-driven citizen perspective.
 * Emphasizes transparency, real user submissions, spatial clustering, and closed-loop public outcome.
 */

import React from 'react';
import {
  FilePlus,
  QrCode,
  Layers,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  ArrowRight,
  TrendingUp,
  Database,
  Sparkles,
  Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { ProjectCard } from '../../components/common/ProjectCard';
import { IssueCard } from '../../components/common/IssueCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PRIMARY_PROJECT, PRIMARY_CLUSTER } from '../../data/mockData';

export const CitizenDashboard: React.FC = () => {
  const {
    navigate,
    setActiveProjectId,
    currentUser,
    userComplaints,
    showDemoData,
  } = useApp();

  const userReportCount = userComplaints.length;
  const userRealSubmissions = userComplaints.filter((c) => !c.is_demo);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={currentUser?.name ? `Citizen Portal &bull; ${currentUser.name}` : 'Citizen Civic Portal'}
        subtitle={`${currentUser?.ward || 'Ward 24'} (${currentUser?.locality || 'Model Town, Ludhiana'}) &bull; Real-time civic tracking from complaint to verified public outcome.`}
        badge={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
            Citizen Layer
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/citizen/report')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>Report Issue</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveProjectId(PRIMARY_PROJECT.id);
                navigate(`/project/${PRIMARY_PROJECT.id}`);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Project Passport</span>
            </button>
          </div>
        }
      />

      {/* Ward Status Overview Metrics with Real Count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="My Registered Grievances"
          value={userReportCount.toString()}
          subtitle={
            userRealSubmissions.length > 0
              ? `${userRealSubmissions.length} live submissions on record`
              : 'Logged under your profile'
          }
          layerTag="Citizen Layer"
          accentColor="slate"
        />
        <MetricCard
          title="Verified Issue Clusters"
          value="1"
          subtitle="AI spatial deduplication complete"
          layerTag="Intelligence Layer"
          accentColor="blue"
        />
        <MetricCard
          title="Ongoing Works Project"
          value="₹7.91 L"
          subtitle="PRJ-PB-LDH-W24-00041 in execution"
          layerTag="Execution Layer"
          accentColor="amber"
        />
        <MetricCard
          title="Verified Public Outcomes"
          value="8"
          subtitle="Corridors under 36mo warranty"
          layerTag="Accountability Layer"
          accentColor="emerald"
        />
      </div>

      {/* Recent User Complaints Strip */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>My Active Grievance Submissions</span>
              <span className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700 font-semibold">
                {userReportCount}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Individual issues tracked under authenticated citizen profile {currentUser?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/citizen/my-reports')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All My Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {userComplaints.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <p className="text-xs text-slate-600">You have not submitted any civic reports yet.</p>
            <button
              type="button"
              onClick={() => navigate('/citizen/report')}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>Submit Your First Report</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userComplaints.slice(0, 2).map((comp) => (
              <div
                key={comp.id}
                className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition bg-slate-50/40 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700">
                        {comp.complaint_id}
                      </span>
                      {comp.is_demo ? (
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                          DEMO DATA
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          LIVE SUBMISSION
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                      {comp.title}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-blue-100 text-blue-800">
                    {comp.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {comp.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[200px]">{comp.address}</span>
                  </span>
                  <span className="text-[10px]">
                    {new Date(comp.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Project Card Spotlight */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Corridor Works In Your Ward
            </h3>
            <p className="text-xs text-slate-500">
              Ward 24 project aggregated from verified citizen complaints
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/citizen/projects')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <ProjectCard
          project={PRIMARY_PROJECT}
          onSelect={(p) => {
            setActiveProjectId(p.id);
            navigate(`/project/${p.id}`);
          }}
        />
      </div>

      {/* Closed-Loop Transparency Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Closed-Loop Public Guarantee
            </h4>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Every complaint in Civora is assigned an unforgeable digital audit trail. Contractors are only paid when milestone sensor &amp; photo verifications match the original citizen complaint coordinates.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setActiveProjectId(PRIMARY_PROJECT.id);
            navigate(`/project/${PRIMARY_PROJECT.id}`);
          }}
          className="px-4 py-2 text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-lg shrink-0 shadow-xs cursor-pointer"
        >
          View Public Audit Passport
        </button>
      </div>
    </div>
  );
};
