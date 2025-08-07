export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  SEARCHER = 'searcher',
  OWNER = 'owner'
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  totalEarnings: number;
  totalProperties: number;
  totalLeads: number;
  rank: number;
} 