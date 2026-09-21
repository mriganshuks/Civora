/**
 * CIVORA AppShell Component
 * Master authenticated layout shell with responsive sidebar, topbar, and role-based drawer/modals.
 */

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
import { ToastContainer } from '../common/Toast';
import { useApp } from '../../context/AppContext';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900">
              <Sidebar onToggleCollapse={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavigation onMobileMenuToggle={() => setMobileMenuOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
