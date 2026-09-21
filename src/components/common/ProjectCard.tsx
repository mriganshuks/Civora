/**
 * CIVORA ProjectCard Component
 * High-clarity project summary card with progress tracker and audit identifier.
 */

import React from 'react';
import { Building, MapPin, IndianRupee, ArrowRight, ShieldCheck } from 'lucide-react';
import { Project } from '../../types';
import { StatusBadge } from './StatusBadge';
import { useApp } from '../../context/AppContext';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
  className?: string;
  id?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  className = '',
  id,
}) => {
  const { navigate, setActiveProjectId } = useApp();

  const formatLakh = (val: number) => {
    const lakh = val / 100000;
    return `₹${lakh.toFixed(2)} L`;
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(project);
    } else {
      setActiveProjectId(project.id);
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <div
      id={id}
      onClick={handleClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm cursor-pointer flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Card Header: ID & Status */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="font-mono text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            {project.id}
          </span>
          <StatusBadge status={project.status} size="sm" />
        </div>

        {/* Title & Ward */}
        <h3 className="text-base font-bold text-slate-900 line-clamp-1 mt-1">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{project.ward}, {project.city}</span>
        </p>

        {/* Financial & Contractor specs */}
        <div className="grid grid-cols-2 gap-3 py-3 my-3 border-y border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Contract Value</span>
            <span className="font-semibold text-slate-900 font-sans">
              {formatLakh(project.contractValue)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Contractor</span>
            <span className="font-medium text-slate-800 truncate block">
              {project.contractorName || 'Tendering'}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Physical Progress</span>
            <span className="font-bold text-slate-900">{project.progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                project.progressPercent === 100
                  ? 'bg-emerald-600'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-2 flex items-center justify-between text-xs border-t border-slate-100">
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Public Audit Trail
        </span>
        <span className="font-semibold text-blue-700 inline-flex items-center gap-1 group">
          View Details <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
};
