/**
 * CIVORA Floating Demo Role Switcher
 * Fast prototype navigator for hackathon demonstrations.
 */

import React, { useState } from 'react';
import { Sparkles, Users, Eye, Building2, HardHat, Home, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, setRole, navigate, activeProject, currentRoute } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // If on landing page, user can use the header buttons too, but floating widget gives instant access anywhere
  return (
    <div className="fixed bottom-4 left-4 z-40">
      {isOpen ? (
        <div className="bg-slate-900 text-white rounded-xl border border-slate-700 shadow-2xl p-3 text-xs space-y-2 w-72 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold tracking-wider text-[11px] uppercase text-slate-200">
                Phase 1 Demo Switcher
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block px-1">
              Select Role View:
            </span>
            <button
              type="button"
              onClick={() => {
                setRole('citizen');
                setIsOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                role === 'citizen' ? 'bg-purple-900/60 text-purple-200 font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Citizen Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('contractor');
                setIsOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                role === 'contractor' ? 'bg-amber-900/60 text-amber-200 font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Contractor Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setIsOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                role === 'admin' ? 'bg-blue-900/60 text-blue-200 font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Government / Admin Portal</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block px-1">
              Public Experiences:
            </span>
            <button
              type="button"
              onClick={() => {
                navigate(`/project/${activeProject.id}`);
                setIsOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                currentRoute.startsWith('/project') ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Public Project Passport</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                currentRoute === '/' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Landing Page</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-full border border-slate-700 shadow-xl hover:bg-slate-800 transition text-xs font-medium cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] font-semibold">Demo Role Switcher</span>
          <span className="text-[10px] uppercase bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
            {role}
          </span>
        </button>
      )}
    </div>
  );
};
