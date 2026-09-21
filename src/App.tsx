/**
 * CIVORA Master Application Component (Phase 2)
 * Routing, Role-Based Access Enforcement & Live Data Shell
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PublicProjectPassportPage } from './pages/PublicProjectPassportPage';
import { AppShell } from './components/layout/AppShell';
import { DemoRoleSwitcher } from './components/layout/DemoRoleSwitcher';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

// Citizen Pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { CitizenPageShell } from './pages/citizen/CitizenPageShell';

// Contractor Pages
import { ContractorDashboard } from './pages/contractor/ContractorDashboard';
import { ContractorPageShell } from './pages/contractor/ContractorPageShell';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProjectsView } from './pages/admin/AdminProjectsView';
import { AdminRiskView } from './pages/admin/AdminRiskView';
import { AdminPageShell } from './pages/admin/AdminPageShell';

const AppRouter: React.FC = () => {
  const { currentRoute, isAuthenticated, currentUser, role, navigate, addToast } = useApp();

  // 1. Public Routes (unauthenticated or open transparency)
  if (currentRoute === '/') {
    return (
      <>
        <LandingPage />
        <DemoRoleSwitcher />
      </>
    );
  }

  if (currentRoute === '/login') {
    return (
      <>
        <LoginPage />
        <DemoRoleSwitcher />
      </>
    );
  }

  if (currentRoute === '/signup') {
    return (
      <>
        <SignupPage />
        <DemoRoleSwitcher />
      </>
    );
  }

  if (currentRoute.startsWith('/project')) {
    return (
      <>
        <PublicProjectPassportPage />
        <DemoRoleSwitcher />
      </>
    );
  }

  // Route Authentication & Role Guard
  const isCitizenRoute = currentRoute.startsWith('/citizen');
  const isContractorRoute = currentRoute.startsWith('/contractor');
  const isAdminRoute = currentRoute.startsWith('/admin');

  if (isCitizenRoute || isContractorRoute || isAdminRoute) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full shadow-lg text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">
                Authentication Required
              </h2>
              <p className="text-xs text-slate-500">
                This civic portal section is protected by role-based access control.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Sign In or Use 1-Click Demo Profiles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full py-2 px-4 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                Return to Public Transparency Portal
              </button>
            </div>
          </div>
          <DemoRoleSwitcher />
        </div>
      );
    }
  }

  // 2. Citizen Authenticated Shell & Sub-routes
  if (isCitizenRoute) {
    let content: React.ReactNode = <CitizenDashboard />;

    if (currentRoute === '/citizen/report') {
      content = <CitizenPageShell view="report" />;
    } else if (currentRoute === '/citizen/my-reports') {
      content = <CitizenPageShell view="my-reports" />;
    } else if (currentRoute === '/citizen/clusters') {
      content = <CitizenPageShell view="clusters" />;
    } else if (currentRoute === '/citizen/projects') {
      content = <CitizenPageShell view="projects" />;
    } else if (currentRoute === '/citizen/notifications') {
      content = <CitizenPageShell view="notifications" />;
    } else if (currentRoute === '/citizen/feedback') {
      content = <CitizenPageShell view="feedback" />;
    }

    return (
      <AppShell>
        {content}
        <DemoRoleSwitcher />
      </AppShell>
    );
  }

  // 3. Contractor Authenticated Shell & Sub-routes
  if (isContractorRoute) {
    let content: React.ReactNode = <ContractorDashboard />;

    if (currentRoute === '/contractor/eligible') {
      content = <ContractorPageShell view="eligible" />;
    } else if (currentRoute === '/contractor/tenders') {
      content = <ContractorPageShell view="tenders" />;
    } else if (currentRoute === '/contractor/bids') {
      content = <ContractorPageShell view="bids" />;
    } else if (currentRoute === '/contractor/contracts') {
      content = <ContractorPageShell view="contracts" />;
    } else if (currentRoute === '/contractor/active-projects') {
      content = <ContractorPageShell view="active-projects" />;
    } else if (currentRoute === '/contractor/milestones') {
      content = <ContractorPageShell view="milestones" />;
    } else if (currentRoute === '/contractor/verification') {
      content = <ContractorPageShell view="verification" />;
    } else if (currentRoute === '/contractor/payments') {
      content = <ContractorPageShell view="payments" />;
    } else if (currentRoute === '/contractor/warranty') {
      content = <ContractorPageShell view="warranty" />;
    }

    return (
      <AppShell>
        {content}
        <DemoRoleSwitcher />
      </AppShell>
    );
  }

  // 4. Admin / Government Authenticated Shell & Sub-routes
  if (isAdminRoute) {
    let content: React.ReactNode = <AdminDashboard />;

    if (currentRoute === '/admin/projects') {
      content = <AdminProjectsView />;
    } else if (currentRoute === '/admin/risk-anomalies') {
      content = <AdminRiskView />;
    } else if (currentRoute === '/admin/issues') {
      content = <AdminPageShell view="issues" />;
    } else if (currentRoute === '/admin/ai-verification') {
      content = <AdminPageShell view="ai-verification" />;
    } else if (currentRoute === '/admin/clusters') {
      content = <AdminPageShell view="clusters" />;
    } else if (currentRoute === '/admin/technical-assessment') {
      content = <AdminPageShell view="technical-assessment" />;
    } else if (currentRoute === '/admin/budget-sanction') {
      content = <AdminPageShell view="budget-sanction" />;
    } else if (currentRoute === '/admin/procurement') {
      content = <AdminPageShell view="procurement" />;
    } else if (currentRoute === '/admin/contracts') {
      content = <AdminPageShell view="contracts" />;
    } else if (currentRoute === '/admin/execution') {
      content = <AdminPageShell view="execution" />;
    } else if (currentRoute === '/admin/verification') {
      content = <AdminPageShell view="verification" />;
    } else if (currentRoute === '/admin/payments') {
      content = <AdminPageShell view="payments" />;
    } else if (currentRoute === '/admin/citizen-feedback') {
      content = <AdminPageShell view="citizen-feedback" />;
    } else if (currentRoute === '/admin/warranty') {
      content = <AdminPageShell view="warranty" />;
    } else if (currentRoute === '/admin/audit-trail') {
      content = <AdminPageShell view="audit-trail" />;
    } else if (currentRoute === '/admin/analytics') {
      content = <AdminPageShell view="analytics" />;
    }

    return (
      <AppShell>
        {content}
        <DemoRoleSwitcher />
      </AppShell>
    );
  }

  // Fallback to landing page
  return (
    <>
      <LandingPage />
      <DemoRoleSwitcher />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
