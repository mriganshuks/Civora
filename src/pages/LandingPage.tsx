/**
 * CIVORA Landing Page
 * Core Message: "From Citizen Need to Verified Public Outcome"
 * Supporting Principle: "Every rupee must have a digital journey."
 */

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  FileCheck2,
  TrendingUp,
  CreditCard,
  QrCode,
  Users,
  Building2,
  HardHat,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LifecycleTimeline } from '../components/common/LifecycleTimeline';
import { MetricCard } from '../components/common/MetricCard';
import { PRIMARY_PROJECT } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { navigate, setRole, setActiveProjectId } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Top Brand Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-xs">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg tracking-wider">
                CIVORA
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                PUBLIC ACCOUNTABILITY PLATFORM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Closed-Loop Civic Works &amp; Public Accountability
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveProjectId(PRIMARY_PROJECT.id);
              navigate(`/project/${PRIMARY_PROJECT.id}`);
            }}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Public Passport</span>
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Closed-Loop Public Infrastructure Traceability</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          From Citizen Need to <br className="hidden sm:inline" />
          <span className="text-blue-600">Verified Public Outcome</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          A closed-loop platform connecting citizen reporting, verification, public projects, execution, financial traceability, citizen verification, and public accountability.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setRole('citizen');
              navigate('/citizen/report');
            }}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Report a Civic Issue</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveProjectId(PRIMARY_PROJECT.id);
              navigate(`/project/${PRIMARY_PROJECT.id}`);
            }}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span>Explore Project Passport</span>
          </button>
        </div>

        {/* Core Principle Tagline */}
        <div className="pt-2">
          <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Principle: &ldquo;Every rupee must have a digital journey.&rdquo;
          </span>
        </div>
      </section>

      {/* The 14-Step Closed-Loop Lifecycle Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              The Closed-Loop Civic Works Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Not merely a grievance mailbox. Every public project is tracked across five authoritative layers from initial citizen voice to warranty completion.
            </p>
          </div>

          <LifecycleTimeline />
        </div>
      </section>

      {/* The 5 Major System Layers Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Five Authoritative Platform Layers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded inline-block">
              Layer 1
            </span>
            <h3 className="text-sm font-bold text-slate-900">Citizen Layer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Geo-tagged reporting, multi-citizen clustering, ward committee witness, and post-work citizen sign-off.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded inline-block">
              Layer 2
            </span>
            <h3 className="text-sm font-bold text-slate-900">Intelligence Layer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI-assisted deduplication, automated corridor clustering, satellite alignment, and procurement anomaly detection.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded inline-block">
              Layer 3
            </span>
            <h3 className="text-sm font-bold text-slate-900">Government &amp; Project</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Administrative sanctions, detailed engineering estimates, e-tendering, and transparent contract award.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded inline-block">
              Layer 4
            </span>
            <h3 className="text-sm font-bold text-slate-900">Execution &amp; Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Milestone delivery, QA lab core tests, Executive Engineer on-site verification, and tamper-proof hash logging.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block">
              Layer 5
            </span>
            <h3 className="text-sm font-bold text-slate-900">Financial &amp; Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Treasury voucher audit trail, milestone-linked disbursements, defect warranty bond tracking, and public QR passport.
            </p>
          </div>
        </div>
      </section>

      {/* Role-Based Demo Portals Gateway */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              Role-Based Demonstration Experiences
            </h3>
            <p className="text-xs text-slate-500">
              Select any role to explore its purpose-built interface over the shared project lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Citizen Gateway */}
            <div
              onClick={() => {
                setRole('citizen');
                navigate('/citizen/dashboard');
              }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-purple-300 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700 w-fit mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Citizen Experience</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Report issues, view active ward clusters, track road resurfacing projects, and participate in final walkthrough verification.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
                <span>Enter Citizen Portal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Contractor Gateway */}
            <div
              onClick={() => {
                setRole('contractor');
                navigate('/contractor/dashboard');
              }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 w-fit mb-4">
                  <HardHat className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Contractor Experience</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Bid for open tenders, submit milestone execution evidence, request technical inspection, and track treasury voucher status.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                <span>Enter Contractor Portal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Admin / Government Gateway */}
            <div
              onClick={() => {
                setRole('admin');
                navigate('/admin/dashboard');
              }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 w-fit mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Government / Admin</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Data-intensive dashboard for sanctions, technical verification, AI anomaly detection, procurement oversight, and audit trails.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                <span>Enter Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">CIVORA</span>
            <span>&bull;</span>
            <span>Closed-Loop Civic Works &amp; Public Accountability Platform</span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            &ldquo;Every rupee must have a digital journey.&rdquo; &bull; Phase 1 Prototype
          </div>
        </div>
      </footer>
    </div>
  );
};
