export type UserRole = 'admin' | 'faculty' | 'student' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college?: string;
  avatar?: string;
}

export type PrototypeStatus = 'prototype' | 'pilot' | 'deployed';

export interface SpiritModule {
  id: string;
  name: string;
  description: string;
  type: 'empathy' | 'ethics' | 'worldview' | 'domain' | 'stewardship';
  enabled: boolean;
  promptExample?: string;
}

export type ProductType = 'coaching' | 'simulation';

export interface Prototype {
  id: string;
  name: string;
  college: string;
  domain: string;
  status: PrototypeStatus;
  productType?: ProductType;
  description: string;
  longDescription: string;
  spiritSummary: string;
  spiritModules: SpiritModule[];
  curriculumContent: string;
  alumniExemplars: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  icon: string;
  colorAccent: string;
  commercializationAngle: string;
  pilotPartner?: string;
  metrics: {
    engagementScore: number;
    ethicalAlignmentScore: number;
    feedbackCount: number;
    averageRating: number;
    usersReached: number;
  };
  aiPersona: {
    greeting: string;
    attribution: string;
    responses: Array<{
      keywords: string[];
      message: string;
    }>;
    defaultResponse: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attribution?: string;
}

export interface Partnership {
  id: string;
  name: string;
  college: string;
  type: 'healthcare' | 'business' | 'education' | 'nonprofit' | 'church' | 'government' | 'research';
  status: 'active' | 'pending' | 'completed';
  startDate: string;
  value?: number;
  notes: string;
  revenueModel: string;
}

export interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  role: UserRole;
}

export interface BuilderFormData {
  name: string;
  college: string;
  domain: string;
  description: string;
  curriculumContent: string;
  alumniExemplars: string;
  spiritModules: SpiritModule[];
  commercializationAngle: string;
}
