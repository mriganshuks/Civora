/**
 * CIVORA TopNavigation Component (Phase 2)
 * Top bar housing global search, notifications drawer trigger, dynamic user profile,
 * database connectivity status, and authentication actions.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Layers,
  ExternalLink,
  Shield,
  LogOut,
  Sparkles,
  HelpCircle,
  Menu,
  Database,
  CloudCheck,
  CheckCircle2,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const TopNavigation: React.FC<{ onMobileMenuToggle?: () => void }> = ({
  onMobileMenuToggle,
}) => {
  const {
    role,
    setRole,
    currentUser,
    signOut,
    isSupabaseConnected,
    showDemoData,
    setShowDemoData,
    resetToDemoSeed,
    notifications,
    markNotificationRead,
    searchQuery,
    setSearchQuery,
    navigate,
    activeProject,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; tag: string; color: string }> = {
    citizen: { label: 'Citizen', tag: 'Ward Resident', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    contractor: { label: 'Contractor', tag: 'XYZ Infrastructure', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    admin: { label: 'Government / Admin', tag: 'MCL Ludhiana', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    public: { label: 'Public View', tag: 'Open Transparency', color: 'bg-slate-100 text-slate-800 border-slate-200' },
  };

  // Extract clean initials from user name
  const getUserInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header
      id="civora-top-navigation"
      className="bg-white border-b border-slate-200/80 sticky top-0 z-20 px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4"
    >
      {/* Left side: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          title="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, sanctions, contracts, or complaints..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition"
          />
        </div>
      </div>

      {/* Right side: Database status, Role Switcher & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Backend & Data Architecture Status Badge */}
        <div
          title={
            isSupabaseConnected
              ? 'Connected to Live Supabase PostgreSQL & Auth'
              : 'Running on Local High-Fidelity Data Architecture (Supabase-ready)'
          }
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-600"
        >
          <Database className={`w-3.5 h-3.5 ${isSupabaseConnected ? 'text-emerald-600' : 'text-blue-600'}`} />
          <span>{isSupabaseConnected ? 'Supabase Live' : 'Local DB'}</span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isSupabaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
            }`}
          />
        </div>

        {/* Role Demo Switcher Badge / Dropdown */}
        <div className="relative" ref={roleRef}>
          <button
            type="button"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition cursor-pointer"
          >
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Role:
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold border ${roleLabels[role]?.color}`}>
              {roleLabels[role]?.label}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-30 animate-fade-in text-xs">
              <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Switch Operational Perspective
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Phase 2 dynamic role testing
                </p>
              </div>

              {(['citizen', 'contractor', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition cursor-pointer ${
                    role === r ? 'bg-blue-50/60 font-semibold text-blue-900' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <span className="block capitalize">{r === 'admin' ? 'Government / Admin' : r}</span>
                    <span className="text-[11px] text-slate-400">
                      {roleLabels[r].tag}
                    </span>
                  </div>
                  {role === r && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  )}
                </button>
              ))}

              {/* Demo Mode Toggle inside switcher */}
              <div className="border-t border-slate-100 px-3 py-2 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 text-[11px] block">Demo Seed Records</span>
                  <span className="text-[10px] text-slate-500">Show seeded mock cases</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDemoData(!showDemoData)}
                  className={`text-xs px-2 py-0.5 rounded font-semibold transition cursor-pointer ${
                    showDemoData ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {showDemoData ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setRole('public');
                    navigate(`/project/${activeProject.id}`);
                    setShowRoleDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-blue-700 transition cursor-pointer font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Public Project Passport</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 relative cursor-pointer transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-30 animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Civic Audit Notifications
                </h4>
                <span className="text-[11px] font-medium text-blue-700">
                  {unreadCount} unread
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`p-3.5 hover:bg-slate-50/80 transition cursor-pointer ${
                      !notif.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-semibold text-slate-900">
                        {notif.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                <span className="text-[11px] text-slate-500">
                  CIVORA Continuous Audit Engine Active
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu with Real Data & Initials Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {getUserInitials(currentUser?.name)}
              </div>
            )}
            <div className="text-left hidden md:block">
              <span className="text-xs font-semibold text-slate-900 block leading-tight truncate max-w-[120px]">
                {currentUser?.name || 'Citizen User'}
              </span>
              <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">
                {currentUser?.ward || currentUser?.organization || 'Verified Resident'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-30 animate-fade-in text-xs">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <p className="font-semibold text-slate-900 text-sm">{currentUser?.name || 'Guest Resident'}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                  {currentUser?.email || 'No email attached'}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-semibold uppercase">
                    {currentUser?.role || 'Citizen'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {currentUser?.ward || 'Ward 24'}
                  </span>
                </div>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/project/' + activeProject.id);
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Public Project Passport</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetToDemoSeed();
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset Demo Seed Records</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    setShowProfileMenu(false);
                    await signOut();
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-rose-50 text-rose-700 flex items-center gap-2 cursor-pointer font-medium border-t border-slate-100 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
