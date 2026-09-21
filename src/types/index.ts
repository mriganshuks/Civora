/**
 * CIVORA - Closed-Loop Civic Works & Public Accountability Platform
 * Core Data Models & UI Types
 */

export type UserRole = 'public' | 'citizen' | 'contractor' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  phone?: string;
  ward?: string;
  locality?: string;
  organization?: string;
  designation?: string;
}

export type IssueStatus =
  | 'reported'
  | 'ai_verified'
  | 'clustered'
  | 'project_created'
  | 'in_progress'
  | 'resolved'
  | 'rejected';

export type ProjectStatus =
  | 'need_identified'
  | 'assessment'
  | 'sanctioned'
  | 'tendering'
  | 'awarded'
  | 'in_execution'
  | 'technical_verification'
  | 'citizen_verification'
  | 'warranty'
  | 'completed'
  | 'delayed'
  | 'review_required';

export type VerificationStatus =
  | 'pending'
  | 'ai_assisted_passed'
  | 'human_verified'
  | 'rejected'
  | 'review_required';

export type PaymentStatus =
  | 'pending_verification'
  | 'certified'
  | 'disbursed'
  | 'held';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address: string;
  ward: string;
  zone: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Evidence {
  id: string;
  type: 'photo' | 'document' | 'satellite' | 'sensor' | 'video';
  url: string;
  thumbnailUrl?: string;
  title: string;
  timestamp: string;
  capturedBy: string;
  captureRole: UserRole;
  geoLocation?: GeoLocation;
  tamperProofHash: string; // SHA-256 mock hash for immutable audit
  aiLabels?: string[];
  aiConfidence?: number;
}

export interface Complaint {
  id: string; // e.g. CMP-PB-LDH-W24-000173
  title: string;
  description: string;
  category: string;
  citizenName: string;
  citizenPhoneMasked: string;
  submittedAt: string;
  location: GeoLocation;
  status: IssueStatus;
  clusterId?: string;
  evidence: Evidence[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  upvotesCount: number;
}

export interface IssueCluster {
  id: string; // e.g. ISSUE-LDH-W24-00041
  title: string;
  category: string;
  ward: string;
  location: GeoLocation;
  complaintCount: number;
  complaintIds: string[];
  aiDeduplicationScore: number;
  firstReportedAt: string;
  lastReportedAt: string;
  status: 'analyzing' | 'clustered' | 'forwarded_to_dept' | 'project_created';
  associatedProjectId?: string;
}

export interface Milestone {
  id: string;
  number: number;
  title: string;
  description: string;
  targetDate: string;
  completionDate?: string;
  weightagePercent: number;
  amount: number; // in INR (e.g. 240000)
  status: 'pending' | 'in_progress' | 'submitted' | 'technical_verified' | 'paid';
  evidenceSubmitted?: Evidence[];
  inspectorNotes?: string;
  paymentRef?: string;
}

export interface TechnicalVerification {
  id: string;
  milestoneId: string;
  inspectorName: string;
  inspectorDesignation: string;
  department: string;
  verifiedAt: string;
  status: VerificationStatus;
  inspectionChecklist: {
    item: string;
    passed: boolean;
    remarks: string;
  }[];
  materialTestCoresTaken: boolean;
  labTestReportRef?: string;
  geoValidationPassed: boolean;
  tamperProofInspectionHash: string;
}

export interface PaymentReference {
  id: string;
  sanctionRef: string;
  treasuryVoucherNumber: string; // e.g. DEMO-TRZ-PB-2024-88491
  milestoneId: string;
  milestoneTitle: string;
  certifiedAmount: number; // e.g. 240000
  disbursementDate: string;
  payeeName: string; // e.g. XYZ Infrastructure
  bankTransactionRef: string;
  status: PaymentStatus;
  isDemoData: true;
}

export interface RiskAnomalyIndicator {
  id: string;
  projectId?: string;
  investigationProtocol?: string;
  severity: 'low' | 'medium' | 'high';
  type:
    | 'low_competition'
    | 'repeated_awards'
    | 'contract_amendment'
    | 'deadline_extension'
    | 'cost_variation'
    | 'material_delay';
  title: string;
  description: string;
  detectedAt: string;
  status: 'under_review' | 'investigating' | 'cleared';
  aiConfidence: number;
}

export type AnomalyFlag = RiskAnomalyIndicator;

export interface CitizenFeedback {
  id: string;
  citizenNameMasked: string;
  ward: string;
  rating: number; // 1 to 5
  comment: string;
  timestamp: string;
  verifiedResident: boolean;
  satisfactionStatus: 'satisfied' | 'neutral' | 'unsatisfied';
}

export interface WarrantyMaintenance {
  defectLiabilityPeriodMonths: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'claim_pending';
  contractorGuaranteeRef: string;
  periodicInspectionsCompleted: number;
  scheduledInspectionsTotal: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actorRole: UserRole;
  systemLayer:
    | 'Citizen Layer'
    | 'Intelligence Layer'
    | 'Government & Project Layer'
    | 'Execution & Verification Layer'
    | 'Financial & Accountability Layer';
  details: string;
  blockHash: string;
  previousHash: string;
}

export interface Project {
  id: string; // e.g. PRJ-PB-LDH-W24-00041
  title: string;
  description: string;
  category: string;
  department: string;
  ward: string;
  zone: string;
  city: string;
  state: string;
  location: GeoLocation;
  status: ProjectStatus;
  originatingClusterId: string;
  originatingComplaintId: string;
  
  // Financials
  estimatedCost: number; // e.g. 840000 (8.4 lakh)
  sanctionedAmount: number;
  contractValue: number; // e.g. 791000 (7.91 lakh)
  disbursedAmount: number;
  sanctionOrderNumber: string;

  // Contractor & Procurement
  tenderNumber: string;
  contractorName: string; // e.g. XYZ Infrastructure
  contractAwardDate: string;
  targetCompletionDate: string;
  actualCompletionDate?: string;

  // Execution & Progress
  progressPercent: number;
  currentMilestoneNumber: number;
  milestones: Milestone[];
  
  // Verifications & Payments
  verifications: TechnicalVerification[];
  payments: PaymentReference[];
  
  // Anomalies
  anomalies: RiskAnomalyIndicator[];

  // Citizen & Warranty
  citizenFeedback: CitizenFeedback[];
  warranty: WarrantyMaintenance;

  // Audit
  auditLogs: AuditLogEntry[];
  
  // Evidence
  evidenceGallery: Evidence[];
}

export interface NavigationItem {
  id: string;
  label: string;
  iconName: string;
  path: string;
  badge?: string | number;
  badgeColor?: 'blue' | 'amber' | 'green' | 'red' | 'gray';
}
