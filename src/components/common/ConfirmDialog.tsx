/**
 * CIVORA Confirmation Dialog Component
 */

import React from 'react';
import { AlertCircle, ShieldAlert, Check } from 'lucide-react';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  id?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm Action',
  cancelLabel = 'Cancel',
  variant = 'primary',
  id,
}) => {
  const buttonStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
  };

  const icons = {
    primary: Check,
    warning: AlertCircle,
    danger: ShieldAlert,
  };

  const IconComp = icons[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm" id={id}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
            <IconComp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg shadow-xs transition cursor-pointer ${buttonStyles[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
