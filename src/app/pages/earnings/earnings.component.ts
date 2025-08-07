import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EarningsService } from '../../services/earnings.service';
import { Earnings, EarningsStatus, EarningsSummary } from '../../models/earnings.model';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <app-icon name="DollarSign" class="w-6 h-6 text-white"></app-icon>
            </div>
            <h1 class="text-4xl font-bold text-gray-900">Mis Ganancias</h1>
          </div>
          <p class="text-xl text-gray-600">
            Revisa tu historial de comisiones y ganancias
          </p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="card">
            <div class="card-body text-center">
              <app-icon name="TrendingUp" class="w-8 h-8 text-primary-600 mx-auto mb-3"></app-icon>
              <div class="text-3xl font-bold text-gray-900">{{ summary.totalEarnings | currency:'USD':'symbol':'1.0-0' }}</div>
              <div class="text-gray-600">Total ganado</div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-body text-center">
              <app-icon name="CheckCircle" class="w-8 h-8 text-green-500 mx-auto mb-3"></app-icon>
              <div class="text-3xl font-bold text-gray-900">{{ summary.paidEarnings | currency:'USD':'symbol':'1.0-0' }}</div>
              <div class="text-gray-600">Pagado</div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-body text-center">
              <app-icon name="Clock" class="w-8 h-8 text-yellow-500 mx-auto mb-3"></app-icon>
              <div class="text-3xl font-bold text-gray-900">{{ summary.pendingEarnings | currency:'USD':'symbol':'1.0-0' }}</div>
              <div class="text-gray-600">En espera</div>
            </div>
          </div>
        </div>

        <!-- Monthly Chart -->
        <div class="card mb-8">
          <div class="card-header">
            <h2 class="text-2xl font-bold">Ganancias mensuales</h2>
          </div>
          <div class="card-body">
            <div class="h-64 flex items-end justify-between gap-2">
              <div 
                *ngFor="let month of summary.monthlyEarnings"
                class="flex-1 bg-primary-100 rounded-t-lg relative group"
                [style.height]="getBarHeight(month.amount) + '%'"
              >
                <div class="absolute inset-0 bg-primary-600 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {{ month.amount | currency:'USD':'symbol':'1.0-0' }}
                </div>
                <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  {{ month.month }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earnings History -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold">Historial de ganancias</h2>
          </div>
          <div class="card-body p-0">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Propiedad
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    *ngFor="let earning of earnings"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ earning.propertyTitle }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-bold text-gray-900">{{ earning.amount | currency:'USD':'symbol':'1.0-0' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="badge"
                        [class.badge-success]="earning.status === 'paid'"
                        [class.badge-warning]="earning.status === 'pending'"
                        [class.badge-error]="earning.status === 'cancelled'"
                      >
                        <app-icon name="CheckCircle" *ngIf="earning.status === 'paid'" class="w-3 h-3 mr-1"></app-icon>
                        <app-icon name="Clock" *ngIf="earning.status === 'pending'" class="w-3 h-3 mr-1"></app-icon>
                        <app-icon name="XCircle" *ngIf="earning.status === 'cancelled'" class="w-3 h-3 mr-1"></app-icon>
                        {{ getStatusLabel(earning.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ earning.createdAt | date:'dd/MM/yyyy' }}</div>
                      <div *ngIf="earning.paidAt" class="text-xs text-gray-500">
                        Pagado: {{ earning.paidAt | date:'dd/MM/yyyy' }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">{{ earning.description }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="earnings.length === 0" class="text-center py-12">
          <app-icon name="DollarSign" class="w-16 h-16 text-gray-300 mx-auto mb-4"></app-icon>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No tienes ganancias aún</h3>
          <p class="text-gray-600 mb-6">
            Comienza a participar en propiedades para generar tus primeras comisiones
          </p>
          <button class="btn btn-primary">
            Ver propiedades disponibles
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class EarningsComponent implements OnInit {
  earnings: Earnings[] = [];
  summary: EarningsSummary = {
    totalEarnings: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
    monthlyEarnings: []
  };

  constructor(
    private earningsService: EarningsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEarnings();
  }

  loadEarnings() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.earningsService.getUserEarnings(currentUser.id).subscribe(earnings => {
      this.earnings = earnings;
    });

    this.earningsService.getEarningsSummary(currentUser.id).subscribe(summary => {
      this.summary = summary;
    });
  }

  getStatusLabel(status: EarningsStatus): string {
    switch (status) {
      case EarningsStatus.PAID:
        return 'Pagado';
      case EarningsStatus.PENDING:
        return 'En espera';
      case EarningsStatus.CANCELLED:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }

  getBarHeight(amount: number): number {
    const maxAmount = Math.max(...this.summary.monthlyEarnings.map(m => m.amount));
    return maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
  }
} 