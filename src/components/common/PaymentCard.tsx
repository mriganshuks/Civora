/**
 * CIVORA PaymentCard Component
 * Financial Traceability Layer.
 * "Every rupee must have a digital journey."
 * NOTE: CIVORA does not process payments or hold funds.
 * It provides an immutable public audit trail of state treasury payment references.
 */

import React from 'react';
import { Receipt, CheckCircle2, AlertCircle, Building2, Hash, Shield } from 'lucide-react';
import { PaymentReference } from '../../types';

interface PaymentCardProps {
  payment: PaymentReference;
  className?: string;
  id?: string;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  className = '',
  id,
}) => {
  const formatInr = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-slate-900">
            Treasury Voucher Record
          </span>
          {payment.isDemoData && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              DEMO DATA
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Disbursed &amp; Certified</span>
        </div>
      </div>

      {/* Main body */}
      <div className="p-5 space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-500 block">Milestone Certified Amount</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5 font-sans">
              {formatInr(payment.certifiedAmount)}
            </div>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
            {payment.milestoneId}
          </span>
        </div>

        <p className="text-xs font-medium text-slate-700">
          {payment.milestoneTitle}
        </p>

        {/* Audit Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 text-[11px] flex items-center gap-1">
              <Hash className="w-3 h-3 text-slate-400" /> Treasury Voucher No.
            </span>
            <span className="font-mono font-medium text-slate-900 block truncate">
              {payment.treasuryVoucherNumber}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 text-[11px] flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400" /> Payee Entity
            </span>
            <span className="font-medium text-slate-900 block truncate">
              {payment.payeeName}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 text-[11px]">Disbursement Date</span>
            <span className="font-medium text-slate-800 block">
              {payment.disbursementDate}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 text-[11px]">Bank Ref (IFMS/RBI)</span>
            <span className="font-mono text-slate-800 block truncate">
              {payment.bankTransactionRef}
            </span>
          </div>
        </div>

        {/* Institutional disclaimer banner */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/70 text-[11px] text-slate-600 flex items-start gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Financial Accountability:</strong> Civora does not hold or disburse funds. This entry records verified treasury confirmation linked to Milestone 1 technical sign-off.
          </p>
        </div>
      </div>
    </div>
  );
};
