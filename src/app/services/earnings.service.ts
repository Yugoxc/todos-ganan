import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Earnings, EarningsStatus, EarningsSummary, MonthlyEarnings, RankingEntry, Badge } from '../models/earnings.model';

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  // Datos simulados de ganancias
  private mockEarnings: Earnings[] = [
    {
      id: '1',
      userId: '1',
      propertyId: '1',
      propertyTitle: 'Casa moderna en Las Condes',
      amount: 850000,
      status: EarningsStatus.PAID,
      createdAt: new Date('2024-01-15'),
      paidAt: new Date('2024-02-01'),
      description: 'Comisión por venta concretada'
    },
    {
      id: '2',
      userId: '1',
      propertyId: '2',
      propertyTitle: 'Departamento en Providencia',
      amount: 450000,
      status: EarningsStatus.PAID,
      createdAt: new Date('2024-01-10'),
      paidAt: new Date('2024-01-25'),
      description: 'Comisión por venta concretada'
    },
    {
      id: '3',
      userId: '1',
      propertyId: '3',
      propertyTitle: 'Casa en Ñuñoa',
      amount: 650000,
      status: EarningsStatus.PENDING,
      createdAt: new Date('2024-01-20'),
      description: 'Comisión pendiente de pago'
    }
  ];

  private mockRanking: RankingEntry[] = [
    {
      userId: '1',
      userName: 'Juan Pérez',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      totalEarnings: 1950000,
      totalProperties: 3,
      totalLeads: 5,
      rank: 1,
      level: 3,
      badges: [
        {
          id: '1',
          name: 'Primera Venta',
          description: 'Completaste tu primera venta',
          icon: '🏆',
          earnedAt: new Date('2024-01-25')
        },
        {
          id: '2',
          name: 'Top Vendedor',
          description: 'Eres el vendedor del mes',
          icon: '⭐',
          earnedAt: new Date('2024-02-01')
        }
      ]
    },
    {
      userId: '2',
      userName: 'María González',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      totalEarnings: 1200000,
      totalProperties: 2,
      totalLeads: 3,
      rank: 2,
      level: 2,
      badges: [
        {
          id: '3',
          name: 'Primera Venta',
          description: 'Completaste tu primera venta',
          icon: '🏆',
          earnedAt: new Date('2024-01-20')
        }
      ]
    },
    {
      userId: '3',
      userName: 'Carlos Rodríguez',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      totalEarnings: 800000,
      totalProperties: 1,
      totalLeads: 2,
      rank: 3,
      level: 1,
      badges: []
    }
  ];

  constructor() {}

  getUserEarnings(userId: string): Observable<Earnings[]> {
    const userEarnings = this.mockEarnings.filter(e => e.userId === userId);
    return of(userEarnings).pipe(delay(400));
  }

  getEarningsSummary(userId: string): Observable<EarningsSummary> {
    const userEarnings = this.mockEarnings.filter(e => e.userId === userId);
    
    const totalEarnings = userEarnings.reduce((sum, e) => sum + e.amount, 0);
    const pendingEarnings = userEarnings
      .filter(e => e.status === EarningsStatus.PENDING)
      .reduce((sum, e) => sum + e.amount, 0);
    const paidEarnings = userEarnings
      .filter(e => e.status === EarningsStatus.PAID)
      .reduce((sum, e) => sum + e.amount, 0);

    // Datos mensuales simulados
    const monthlyEarnings: MonthlyEarnings[] = [
      { month: 'Enero 2024', amount: 1300000, count: 2 },
      { month: 'Febrero 2024', amount: 650000, count: 1 }
    ];

    const summary: EarningsSummary = {
      totalEarnings,
      pendingEarnings,
      paidEarnings,
      monthlyEarnings
    };

    return of(summary).pipe(delay(300));
  }

  getRanking(): Observable<RankingEntry[]> {
    return of(this.mockRanking).pipe(delay(500));
  }

  getUserRanking(userId: string): Observable<RankingEntry | undefined> {
    const userRanking = this.mockRanking.find(r => r.userId === userId);
    return of(userRanking).pipe(delay(200));
  }

  addEarning(earning: Omit<Earnings, 'id' | 'createdAt'>): Observable<Earnings> {
    const newEarning: Earnings = {
      ...earning,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    this.mockEarnings.push(newEarning);
    
    return of(newEarning).pipe(delay(300));
  }

  updateEarningStatus(earningId: string, status: EarningsStatus): Observable<void> {
    const earning = this.mockEarnings.find(e => e.id === earningId);
    if (earning) {
      earning.status = status;
      if (status === EarningsStatus.PAID) {
        earning.paidAt = new Date();
      }
    }
    
    return of(void 0).pipe(delay(200));
  }
} 