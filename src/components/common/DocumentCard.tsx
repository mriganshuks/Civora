/**
 * CIVORA DocumentCard Component
 * Official sanctioned orders, DPRs, Tenders, and QA reports.
 */

import React from 'react';
import { FileText, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DocumentCardProps {
  id?: string;
  title: string;
  documentType: string;
  documentNumber: string;
  date: string;
  fileSize?: string;
  verified?: boolean;
  className?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  title,
  documentType,
  documentNumber,
  date,
  fileSize = '1.4 MB (PDF)',
  verified = true,
  className = '',
}) => {
  const { addToast } = useApp();

  const handleDownload = () => {
    addToast({
      type: 'info',
      title: 'Downloading Public Document',
      message: `${title} (${documentNumber}) downloaded for offline verification.`,
    });
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex items-start justify-between gap-4 transition hover:border-slate-300 ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              {documentType}
            </span>
            {verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                <CheckCircle className="w-3 h-3" /> Digitally Signed
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-slate-900 leading-snug">
            {title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
            <span className="font-mono text-[11px] text-slate-600">
              Doc No: {documentNumber}
            </span>
            <span>&bull;</span>
            <span>{date}</span>
            <span>&bull;</span>
            <span>{fileSize}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        title="Download official copy"
        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition shrink-0 cursor-pointer"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};
