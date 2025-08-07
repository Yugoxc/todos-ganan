export interface Earnings {
  id: string;
  userId: string;
  propertyId: string;
  propertyTitle: string;
  amount: number;
  status: EarningsStatus;
  createdAt: Date;
  paidAt?: Date;
  description: string;
}

export enum EarningsStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

export interface EarningsSummary {
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  monthlyEarnings: MonthlyEarnings[];
}

export interface MonthlyEarnings {
  month: string;
  amount: number;
  count: number;
}

export interface RankingEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  totalEarnings: number;
  totalProperties: number;
  totalLeads: number;
  rank: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
} 