/**
 * CIVORA - Application State, Auth & Database Context (Phase 2)
 * Connects to Supabase / Real Data Architecture while maintaining demo workflows.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserRole, User, Project, Complaint, IssueCluster, RiskAnomalyIndicator } from '../types';
import {
  DEMO_USERS,
  PRIMARY_PROJECT,
  ALL_PROJECTS,
  PRIMARY_COMPLAINT,
  COMPANION_COMPLAINTS,
  PRIMARY_CLUSTER,
  MOCK_NOTIFICATIONS,
} from '../data/mockData';
import {
  supabase,
  isSupabaseConfigured,
  getCurrentSessionUser,
  signInUser,
  signUpUser,
  signOutUser,
  fetchUserComplaints,
  fetchAllOperationalComplaints,
  createComplaintRecord,
  resetDemoData as resetSupabaseDemoData,
  ComplaintRow,
} from '../lib/supabase';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface ComplaintLifecycleData extends ComplaintRow {
  evidenceList?: {
    id: string;
    url: string;
    type: string;
    name: string;
    tamperProofHash?: string;
  }[];
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User | null;
  isAuthenticated: boolean;
  isSupabaseConnected: boolean;
  currentRoute: string;
  navigate: (path: string) => void;
  
  // Real Auth Actions
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (params: {
    email: string;
    password: string;
    name: string;
    role: 'citizen' | 'contractor';
    ward?: string;
    locality?: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  
  // Project & Governance Records
  projects: Project[];
  activeProject: Project;
  setActiveProjectId: (id: string) => void;
  
  // Real Complaints Architecture
  userComplaints: ComplaintRow[];
  allComplaints: ComplaintRow[];
  refreshComplaints: () => Promise<void>;
  submitComplaint: (params: {
    category: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'urgent';
    latitude: number;
    longitude: number;
    address: string;
    ward?: string;
    evidenceFiles?: File[];
  }) => Promise<{ success: boolean; complaintId?: string; error?: string }>;
  
  // Demo Mode Management
  showDemoData: boolean;
  setShowDemoData: (show: boolean) => void;
  resetToDemoSeed: () => void;
  
  // Legacy / Demo compatibility structures
  complaints: Complaint[];
  activeCluster: IssueCluster;
  anomalyFlags: RiskAnomalyIndicator[];
  notifications: typeof MOCK_NOTIFICATIONS;
  markNotificationRead: (id: string) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeModal: string | null;
  setActiveModal: (modalId: string | null) => void;
  activeDrawer: string | null;
  setActiveDrawer: (drawerId: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentSessionUser());
  const [role, setRoleState] = useState<UserRole>(() => {
    const session = getCurrentSessionUser();
    return session ? session.role : 'public';
  });
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [activeProjectId, setActiveProjectIdState] = useState<string>(PRIMARY_PROJECT.id);
  const [projects] = useState<Project[]>(ALL_PROJECTS);
  
  // Real complaints database state
  const [userComplaints, setUserComplaints] = useState<ComplaintRow[]>([]);
  const [allComplaints, setAllComplaints] = useState<ComplaintRow[]>([]);
  const [showDemoData, setShowDemoData] = useState<boolean>(true);
  
  // Mock fallback structures
  const [legacyComplaints] = useState<Complaint[]>(COMPANION_COMPLAINTS);
  const [activeCluster] = useState<IssueCluster>(PRIMARY_CLUSTER);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  // Sync initial URL on browser back/forward or deep link
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path && path !== '/') {
        setCurrentRoute(path);
      }
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to Supabase Auth state changes if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          const syncedUser: User = {
            id: session.user.id,
            name: userMeta.name || session.user.email?.split('@')[0] || 'Civic User',
            email: session.user.email || '',
            role: userMeta.role || 'citizen',
            ward: userMeta.ward || 'Ward 24',
            phone: userMeta.phone,
          };
          setCurrentUser(syncedUser);
          setRoleState(syncedUser.role);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setRoleState('public');
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  // Load complaints for current user whenever user changes
  const refreshComplaints = useCallback(async () => {
    if (currentUser?.id) {
      const userList = await fetchUserComplaints(currentUser.id, showDemoData);
      setUserComplaints(userList);
    } else {
      setUserComplaints([]);
    }

    const allList = await fetchAllOperationalComplaints();
    setAllComplaints(allList);
  }, [currentUser?.id, showDemoData]);

  useEffect(() => {
    refreshComplaints();
  }, [refreshComplaints]);

  const navigate = (path: string) => {
    // Route protection: check if protected and user is not authenticated
    const isProtectedRoute =
      path.startsWith('/citizen') ||
      path.startsWith('/contractor') ||
      path.startsWith('/admin');

    if (isProtectedRoute && !currentUser && path !== '/login' && path !== '/signup') {
      addToast({
        type: 'warning',
        title: 'Authentication Required',
        message: 'Please sign in or select a demo role to access operational portals.',
      });
      setCurrentRoute('/login');
      window.history.pushState({}, '', '/login');
      return;
    }

    // Role-based route authorization
    if (currentUser) {
      if (path.startsWith('/admin') && currentUser.role !== 'admin') {
        addToast({
          type: 'error',
          title: 'Access Restricted',
          message: 'The Government / Admin Portal requires executive administrative clearance.',
        });
        return;
      }
    }

    setCurrentRoute(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync role state with route
    if (path.startsWith('/citizen')) {
      setRoleState('citizen');
    } else if (path.startsWith('/contractor')) {
      setRoleState('contractor');
    } else if (path.startsWith('/admin')) {
      setRoleState('admin');
    }
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    
    // Set active user to demo user if switching manually in prototype mode
    if (newRole === 'public') {
      setCurrentUser(null);
      navigate('/');
      return;
    }

    const demoUser = DEMO_USERS[newRole];
    if (demoUser) {
      setCurrentUser(demoUser);
    }

    if (newRole === 'citizen') {
      navigate('/citizen/dashboard');
    } else if (newRole === 'contractor') {
      navigate('/contractor/dashboard');
    } else if (newRole === 'admin') {
      navigate('/admin/dashboard');
    }
    
    addToast({
      type: 'info',
      title: `Role Switched: ${newRole.toUpperCase()}`,
      message: `Operating as ${demoUser?.name || newRole} (${newRole}).`,
    });
  };

  // Real Auth Methods
  const signIn = async (email: string, password?: string) => {
    const result = await signInUser({ email, password });
    if (result.error || !result.user) {
      addToast({
        type: 'error',
        title: 'Authentication Failed',
        message: result.error || 'Invalid credentials',
      });
      return { success: false, error: result.error || 'Login failed' };
    }

    setCurrentUser(result.user);
    setRoleState(result.user.role);

    addToast({
      type: 'success',
      title: 'Welcome Back',
      message: `Signed in as ${result.user.name} (${result.user.role.toUpperCase()})`,
    });

    // Role-based redirect
    if (result.user.role === 'citizen') {
      navigate('/citizen/dashboard');
    } else if (result.user.role === 'contractor') {
      navigate('/contractor/dashboard');
    } else if (result.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/citizen/dashboard');
    }

    return { success: true };
  };

  const signUp = async (params: {
    email: string;
    password: string;
    name: string;
    role: 'citizen' | 'contractor';
    ward?: string;
    locality?: string;
    phone?: string;
  }) => {
    const result = await signUpUser(params);
    if (result.error || !result.user) {
      addToast({
        type: 'error',
        title: 'Registration Incomplete',
        message: result.error || 'Failed to create profile',
      });
      return { success: false, error: result.error || 'Signup failed' };
    }

    setCurrentUser(result.user);
    setRoleState(result.user.role);

    addToast({
      type: 'success',
      title: 'Account Registered',
      message: `Profile established for ${result.user.name}. Assigned role: ${result.user.role}.`,
    });

    if (result.user.role === 'citizen') {
      navigate('/citizen/dashboard');
    } else if (result.user.role === 'contractor') {
      navigate('/contractor/dashboard');
    }

    return { success: true };
  };

  const signOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    setRoleState('public');
    navigate('/');
    addToast({
      type: 'info',
      title: 'Session Concluded',
      message: 'You have been signed out securely.',
    });
  };

  // Real Complaint Submission
  const submitComplaint = async (params: {
    category: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'urgent';
    latitude: number;
    longitude: number;
    address: string;
    ward?: string;
    evidenceFiles?: File[];
  }) => {
    if (!currentUser) {
      addToast({
        type: 'error',
        title: 'Submission Halted',
        message: 'You must be signed in as a registered resident to submit grievances.',
      });
      return { success: false, error: 'User not authenticated' };
    }

    const { complaint, error } = await createComplaintRecord({
      userId: currentUser.id,
      category: params.category,
      title: params.title,
      description: params.description,
      severity: params.severity,
      latitude: params.latitude,
      longitude: params.longitude,
      address: params.address,
      ward: params.ward || currentUser.ward || 'Ward 24',
      evidenceFiles: params.evidenceFiles,
    });

    if (error) {
      addToast({
        type: 'error',
        title: 'Submission Error',
        message: error,
      });
      return { success: false, error };
    }

    // Refresh active lists
    await refreshComplaints();

    addToast({
      type: 'success',
      title: 'Grievance Registered',
      message: `Unique identifier ${complaint.complaint_id} assigned. Audit record generated.`,
    });

    return { success: true, complaintId: complaint.complaint_id };
  };

  const resetToDemoSeed = () => {
    resetSupabaseDemoData();
    refreshComplaints();
    addToast({
      type: 'info',
      title: 'Demo Seed Restored',
      message: 'Sample municipal records and complaints reset to baseline state.',
    });
  };

  const activeProject =
    projects.find((p) => p.id === activeProjectId) || PRIMARY_PROJECT;

  const setActiveProjectId = (id: string) => {
    setActiveProjectIdState(id);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'tst-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        isAuthenticated: Boolean(currentUser),
        isSupabaseConnected: isSupabaseConfigured,
        currentRoute,
        navigate,
        signIn,
        signUp,
        signOut,
        projects,
        activeProject,
        setActiveProjectId,
        userComplaints,
        allComplaints,
        refreshComplaints,
        submitComplaint,
        showDemoData,
        setShowDemoData,
        resetToDemoSeed,
        complaints: legacyComplaints,
        activeCluster,
        anomalyFlags: activeProject.anomalies,
        notifications,
        markNotificationRead,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        activeModal,
        setActiveModal,
        activeDrawer,
        setActiveDrawer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
