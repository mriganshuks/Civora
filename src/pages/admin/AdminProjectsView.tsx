/**
 * CIVORA Admin Projects View
 * Full filterable, searchable register of all municipal works with budget allocations and statuses.
 */

import React, { useState } from 'react';
import {
  FolderGit2,
  Search,
  Filter,
  ArrowRight,
  Plus,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Project } from '../../types';

export const AdminProjectsView: React.FC = () => {
  const { projects, setActiveProjectId, navigate } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contractorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatLakh = (val: number) => `₹${(val / 100000).toFixed(2)} L`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Municipal Works Projects Register"
        subtitle="Authoritative repository of all sanctioned capital infrastructure works in Ludhiana."
        breadcrumbs={[
          { label: 'Admin Portal', path: '/admin/dashboard' },
          { label: 'Projects' },
        ]}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, title, contractor..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'in_execution', 'procurement', 'completed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition cursor-pointer ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Data Table */}
      <DataTable
        columns={[
          {
            key: 'id',
            header: 'Project ID',
            render: (p) => (
              <span className="font-mono text-xs font-bold text-blue-700">
                {p.id}
              </span>
            ),
          },
          {
            key: 'title',
            header: 'Project Details',
            render: (p) => (
              <div>
                <span className="font-bold text-slate-900 block text-xs">{p.title}</span>
                <span className="text-[11px] text-slate-500">{p.ward} &bull; {p.department}</span>
              </div>
            ),
          },
          {
            key: 'sanctionOrderNumber',
            header: 'Sanction Order',
            render: (p) => (
              <span className="font-mono text-[11px] text-slate-600">
                {p.sanctionOrderNumber}
              </span>
            ),
          },
          {
            key: 'contractValue',
            header: 'Contract Value',
            render: (p) => (
              <div>
                <span className="font-bold text-slate-900 text-xs block">{formatLakh(p.contractValue)}</span>
                <span className="text-[10px] text-emerald-700">Paid: {formatLakh(p.disbursedAmount)}</span>
              </div>
            ),
          },
          {
            key: 'status',
            header: 'Lifecycle Status',
            render: (p) => <StatusBadge status={p.status} size="sm" />,
          },
          {
            key: 'action',
            header: 'Public Passport',
            render: (p) => (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProjectId(p.id);
                  navigate(`/project/${p.id}`);
                }}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 cursor-pointer flex items-center gap-1"
              >
                <span>Passport</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>
            ),
          },
        ]}
        data={filteredProjects}
        onRowClick={(p) => {
          setActiveProjectId(p.id);
          navigate(`/project/${p.id}`);
        }}
      />
    </div>
  );
};
