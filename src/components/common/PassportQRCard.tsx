/**
 * CIVORA Public Project Passport QR Card
 * High-visibility public transparency marker for civic site boards & public verification.
 */

import React from 'react';
import { QrCode, ExternalLink, ShieldCheck, Download, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PassportQRCardProps {
  projectId: string;
  projectTitle: string;
  ward: string;
  status: string;
  sanctionedAmount: string;
  className?: string;
  id?: string;
}

export const PassportQRCard: React.FC<PassportQRCardProps> = ({
  projectId,
  projectTitle,
  ward,
  status,
  sanctionedAmount,
  className = '',
  id,
}) => {
  const { navigate, addToast } = useApp();

  const passportUrl = `${window.location.origin}/project/${projectId}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(passportUrl);
    addToast({
      type: 'success',
      title: 'Public Passport URL Copied',
      message: `Direct link to ${projectId} copied to clipboard.`,
    });
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}
    >
      <div className="bg-slate-900 px-5 py-3.5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">
            Digital Project Passport
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          IMMUTABLE AUDIT RECORD
        </span>
      </div>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* QR Code Presentation */}
          <div className="relative p-3 bg-white border-2 border-dashed border-slate-300 rounded-xl shadow-xs shrink-0 flex flex-col items-center">
            {/* Crisp SVG QR Code Placeholder Pattern */}
            <svg
              className="w-32 h-32 text-slate-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Corner 1 */}
              <rect x="5" y="5" width="30" height="30" fill="#0f172a" rx="2" />
              <rect x="10" y="10" width="20" height="20" fill="white" />
              <rect x="14" y="14" width="12" height="12" fill="#0f172a" />
              {/* Corner 2 */}
              <rect x="65" y="5" width="30" height="30" fill="#0f172a" rx="2" />
              <rect x="70" y="10" width="20" height="20" fill="white" />
              <rect x="74" y="14" width="12" height="12" fill="#0f172a" />
              {/* Corner 3 */}
              <rect x="5" y="65" width="30" height="30" fill="#0f172a" rx="2" />
              <rect x="10" y="70" width="20" height="20" fill="white" />
              <rect x="14" y="74" width="12" height="12" fill="#0f172a" />
              {/* Data Blocks */}
              <rect x="42" y="8" width="6" height="6" fill="#0f172a" />
              <rect x="52" y="16" width="6" height="6" fill="#0f172a" />
              <rect x="42" y="24" width="6" height="6" fill="#0f172a" />
              <rect x="8" y="42" width="6" height="6" fill="#0f172a" />
              <rect x="20" y="48" width="8" height="6" fill="#0f172a" />
              <rect x="44" y="44" width="12" height="12" fill="#2563eb" rx="2" />
              <rect x="62" y="42" width="6" height="6" fill="#0f172a" />
              <rect x="72" y="48" width="8" height="6" fill="#0f172a" />
              <rect x="84" y="42" width="6" height="8" fill="#0f172a" />
              <rect x="42" y="66" width="6" height="8" fill="#0f172a" />
              <rect x="52" y="74" width="8" height="6" fill="#0f172a" />
              <rect x="68" y="68" width="8" height="8" fill="#0f172a" />
              <rect x="82" y="78" width="10" height="6" fill="#0f172a" />
              <rect x="42" y="86" width="6" height="6" fill="#0f172a" />
              <rect x="54" y="86" width="10" height="6" fill="#0f172a" />
              <rect x="72" y="88" width="6" height="6" fill="#0f172a" />
            </svg>
            <span className="text-[10px] font-mono font-medium text-slate-500 mt-2">
              SCAN ON SITE BOARD
            </span>
          </div>

          {/* Details & Actions */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-mono font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  {projectId}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Public Verified
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1.5">
                {projectTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">{ward}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Sanction Amount</span>
                <span className="font-semibold text-slate-900 font-sans">{sanctionedAmount}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Current Status</span>
                <span className="font-semibold text-blue-700 capitalize">{status.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => navigate(`/project/${projectId}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition shadow-xs cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Public Passport
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
