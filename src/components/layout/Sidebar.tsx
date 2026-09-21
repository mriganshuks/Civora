/**
 * CIVORA Sidebar Component
 * Role-adaptive navigation structure for Citizen, Contractor, and Admin/Government roles.
 */

import React from 'react';
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Layers,
  FolderGit2,
  QrCode,
  Bell,
  MessageSquare,
  Briefcase,
  Gavel,
  CheckSquare,
  ShieldCheck,
  CreditCard,
  ShieldAlert,
  BarChart3,
  Scale,
  FileCheck2,
  HardHat,
  Cpu,
  History,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string | number;
  badgeColor?: 'blue' | 'amber' | 'green' | 'red' | 'gray';
  layer?: string;
}

export const Sidebar: React.FC<{ isCollapsed?: boolean; onToggleCollapse?: () => void }> = ({
  isCollapsed = false,
}) => {
  const { role, currentRoute, navigate, activeProject } = useApp();

  const citizenItems: SidebarItem[] = [
    { id: 'c-dash', label: 'Dashboard', icon: LayoutDashboard, path: '/citizen/dashboard' },
    { id: 'c-report', label: 'Report Issue', icon: FilePlus, path: '/citizen/report' },
    { id: 'c-reports', label: 'My Reports', icon: FileText, path: '/citizen/my-reports', badge: '1' },
    { id: 'c-clusters', label: 'Issue Clusters', icon: Layers, path: '/citizen/clusters' },
    { id: 'c-projects', label: 'Projects', icon: FolderGit2, path: '/citizen/projects' },
    { id: 'c-passport', label: 'Project Passport', icon: QrCode, path: `/project/${activeProject.id}` },
    { id: 'c-notifs', label: 'Notifications', icon: Bell, path: '/citizen/notifications', badge: '2', badgeColor: 'blue' },
    { id: 'c-feedback', label: 'Feedback', icon: MessageSquare, path: '/citizen/feedback' },
  ];

  const contractorItems: SidebarItem[] = [
    { id: 'k-dash', label: 'Dashboard', icon: LayoutDashboard, path: '/contractor/dashboard' },
    { id: 'k-eligible', label: 'Eligible Projects', icon: FolderGit2, path: '/contractor/eligible' },
    { id: 'k-tenders', label: 'Tenders', icon: Gavel, path: '/contractor/tenders' },
    { id: 'k-bids', label: 'My Bids', icon: FileCheck2, path: '/contractor/bids' },
    { id: 'k-contracts', label: 'My Contracts', icon: Briefcase, path: '/contractor/contracts', badge: '1' },
    { id: 'k-active', label: 'Active Projects', icon: HardHat, path: '/contractor/active-projects' },
    { id: 'k-milestones', label: 'Milestones', icon: CheckSquare, path: '/contractor/milestones', badge: 'M2', badgeColor: 'amber' },
    { id: 'k-verif', label: 'Verification', icon: ShieldCheck, path: '/contractor/verification' },
    { id: 'k-payments', label: 'Payments', icon: CreditCard, path: '/contractor/payments' },
    { id: 'k-warranty', label: 'Warranty', icon: Scale, path: '/contractor/warranty' },
  ];

  const adminItems: SidebarItem[] = [
    { id: 'a-dash', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'a-issues', label: 'Issues', icon: FileText, path: '/admin/issues', badge: '14', badgeColor: 'amber' },
    { id: 'a-ai-verif', label: 'AI Verification', icon: Sparkles, path: '/admin/ai-verification', layer: 'Intelligence' },
    { id: 'a-clusters', label: 'Issue Clusters', icon: Layers, path: '/admin/clusters' },
    { id: 'a-projects', label: 'Projects', icon: FolderGit2, path: '/admin/projects' },
    { id: 'a-tech-assess', label: 'Technical Assessment', icon: HardHat, path: '/admin/technical-assessment' },
    { id: 'a-budget', label: 'Budget & Sanction', icon: CreditCard, path: '/admin/budget-sanction' },
    { id: 'a-procurement', label: 'Procurement', icon: Gavel, path: '/admin/procurement' },
    { id: 'a-contracts', label: 'Contracts', icon: Briefcase, path: '/admin/contracts' },
    { id: 'a-execution', label: 'Execution', icon: CheckSquare, path: '/admin/execution' },
    { id: 'a-verif', label: 'Verification', icon: ShieldCheck, path: '/admin/verification' },
    { id: 'a-payments', label: 'Payments', icon: CreditCard, path: '/admin/payments' },
    { id: 'a-risk', label: 'Risk & Anomalies', icon: ShieldAlert, path: '/admin/risk-anomalies', badge: 'Review', badgeColor: 'red' },
    { id: 'a-feedback', label: 'Citizen Feedback', icon: MessageSquare, path: '/admin/citizen-feedback' },
    { id: 'a-warranty', label: 'Warranty', icon: Scale, path: '/admin/warranty' },
    { id: 'a-audit', label: 'Audit Trail', icon: History, path: '/admin/audit-trail' },
    { id: 'a-analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ];

  const roleConfigs: Record<UserRole, { title: string; subtitle: string; items: SidebarItem[] }> = {
    citizen: {
      title: 'Citizen Portal',
      subtitle: 'Ward Accountability View',
      items: citizenItems,
    },
    contractor: {
      title: 'Contractor Portal',
      subtitle: 'Execution & Billing Desk',
      items: contractorItems,
    },
    admin: {
      title: 'Government / Admin',
      subtitle: 'Municipal Works Directorate',
      items: adminItems,
    },
    public: {
      title: 'Public Transparency',
      subtitle: 'Open Audit Registry',
      items: citizenItems,
    },
  };

  const currentConfig = roleConfigs[role] || roleConfigs.citizen;

  return (
    <aside
      id="civora-sidebar"
      className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 h-screen sticky top-0 select-none z-30 transition-all duration-200"
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base tracking-wider shadow-sm group-hover:bg-blue-500 transition">
            C
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-wider">
                CIVORA
              </span>
              <span className="text-[9px] uppercase font-bold text-blue-400 bg-blue-950 px-1.5 py-0.2 rounded border border-blue-800">
                PHASE 1
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
              Civic Works Accountability
            </p>
          </div>
        </button>
      </div>

      {/* Role Context Ribbon */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            {currentConfig.title}
          </span>
          <span className="text-[11px] text-slate-300 font-medium">
            {currentConfig.subtitle}
          </span>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-400" title="Connected" />
      </div>

      {/* Navigation Links (Scrollable for extensive Admin items) */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 text-xs font-medium">
        {currentConfig.items.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentRoute === item.path ||
            (item.path !== '/' && currentRoute.startsWith(item.path));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-left cursor-pointer group ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 text-[10px] font-bold rounded ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : item.badgeColor === 'red'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : item.badgeColor === 'amber'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Core Principle */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400">
        <p className="italic text-slate-300 text-center font-medium">
          &ldquo;Every rupee must have a digital journey.&rdquo;
        </p>
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-slate-500">
          <span>CIVORA Core v1.0</span>
          <span>&bull;</span>
          <button
            type="button"
            onClick={() => navigate(`/project/${activeProject.id}`)}
            className="hover:text-slate-300 inline-flex items-center gap-0.5 underline cursor-pointer"
          >
            Public Passport <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
