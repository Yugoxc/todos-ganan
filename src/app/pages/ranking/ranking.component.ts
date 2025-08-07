import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarningsService } from '../../services/earnings.service';
import { RankingEntry } from '../../models/earnings.model';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <app-icon name="Trophy" class="w-6 h-6 text-white"></app-icon>
            </div>
            <h1 class="text-4xl font-bold text-gray-900">Ranking de Vendedores</h1>
          </div>
          <p class="text-xl text-gray-600">
            Descubre quiénes son los mejores vendedores de la plataforma
          </p>
        </div>

        <!-- Top 3 Podium -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <!-- Second Place -->
          <div *ngIf="ranking.length > 1" class="order-2 md:order-1">
            <div class="card text-center relative">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <app-icon name="Medal" class="w-4 h-4 text-gray-600"></app-icon>
                </div>
              </div>
              <div class="card-body pt-8">
                <img 
                  [src]="ranking[1].userAvatar || 'assets/default-avatar.png'" 
                  [alt]="ranking[1].userName"
                  class="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 class="font-semibold text-lg">{{ ranking[1].userName }}</h3>
                <p class="text-gray-600 text-sm mb-2">Nivel {{ ranking[1].level }}</p>
                <div class="text-2xl font-bold text-gray-500">{{ ranking[1].totalEarnings | currency:'USD':'symbol':'1.0-0' }}</div>
                <div class="text-sm text-gray-500">{{ ranking[1].totalProperties }} propiedades</div>
              </div>
            </div>
          </div>

          <!-- First Place -->
          <div *ngIf="ranking.length > 0" class="order-1 md:order-2">
            <div class="card text-center relative border-2 border-yellow-400">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <app-icon name="Trophy" class="w-5 h-5 text-white"></app-icon>
                </div>
              </div>
              <div class="card-body pt-8">
                <img 
                  [src]="ranking[0].userAvatar || 'assets/default-avatar.png'" 
                  [alt]="ranking[0].userName"
                  class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 class="font-semibold text-xl">{{ ranking[0].userName }}</h3>
                <p class="text-gray-600 text-sm mb-2">Nivel {{ ranking[0].level }}</p>
                <div class="text-3xl font-bold text-yellow-600">{{ ranking[0].totalEarnings | currency:'USD':'symbol':'1.0-0' }}</div>
                <div class="text-sm text-gray-500">{{ ranking[0].totalProperties }} propiedades</div>
              </div>
            </div>
          </div>

          <!-- Third Place -->
          <div *ngIf="ranking.length > 2" class="order-3">
            <div class="card text-center relative">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div class="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <app-icon name="Medal" class="w-4 h-4 text-white"></app-icon>
                </div>
              </div>
              <div class="card-body pt-8">
                <img 
                  [src]="ranking[2].userAvatar || 'assets/default-avatar.png'" 
                  [alt]="ranking[2].userName"
                  class="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 class="font-semibold text-lg">{{ ranking[2].userName }}</h3>
                <p class="text-gray-600 text-sm mb-2">Nivel {{ ranking[2].level }}</p>
                <div class="text-2xl font-bold text-orange-500">{{ ranking[2].totalEarnings | currency:'USD':'symbol':'1.0-0' }}</div>
                <div class="text-sm text-gray-500">{{ ranking[2].totalProperties }} propiedades</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ranking Table -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold">Ranking Completo</h2>
          </div>
          <div class="card-body p-0">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posición
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendedor
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nivel
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ganancias
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Propiedades
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leads
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Insignias
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    *ngFor="let entry of ranking; let i = index"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span 
                          class="text-lg font-bold"
                          [class.text-yellow-600]="i === 0"
                          [class.text-gray-500]="i === 1"
                          [class.text-orange-500]="i === 2"
                          [class.text-gray-400]="i > 2"
                        >
                          #{{ i + 1 }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img 
                          [src]="entry.userAvatar || 'assets/default-avatar.png'" 
                          [alt]="entry.userName"
                          class="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ entry.userName }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <app-icon name="Star" class="w-4 h-4 text-yellow-500 mr-1"></app-icon>
                        <span class="text-sm text-gray-900">Nivel {{ entry.level }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">
                        {{ entry.totalEarnings | currency:'USD':'symbol':'1.0-0' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ entry.totalProperties }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ entry.totalLeads }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex gap-1">
                        <span 
                          *ngFor="let badge of entry.badges.slice(0, 3)"
                          class="text-lg"
                          [title]="badge.name"
                        >
                          {{ badge.icon }}
                        </span>
                        <span 
                          *ngIf="entry.badges.length > 3" 
                          class="text-xs text-gray-500"
                        >
                          +{{ entry.badges.length - 3 }}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card text-center">
            <div class="card-body">
              <app-icon name="TrendingUp" class="w-8 h-8 text-primary-600 mx-auto mb-3"></app-icon>
              <div class="text-2xl font-bold text-gray-900">{{ ranking.length }}</div>
              <div class="text-gray-600">Vendedores activos</div>
            </div>
          </div>
          
          <div class="card text-center">
            <div class="card-body">
              <app-icon name="Trophy" class="w-8 h-8 text-yellow-500 mx-auto mb-3"></app-icon>
              <div class="text-2xl font-bold text-gray-900">{{ totalEarnings | currency:'USD':'symbol':'1.0-0' }}</div>
              <div class="text-gray-600">Total en comisiones</div>
            </div>
          </div>
          
          <div class="card text-center">
            <div class="card-body">
              <app-icon name="Star" class="w-8 h-8 text-primary-600 mx-auto mb-3"></app-icon>
              <div class="text-2xl font-bold text-gray-900">{{ totalBadges }}</div>
              <div class="text-gray-600">Insignias otorgadas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RankingComponent implements OnInit {
  ranking: RankingEntry[] = [];
  totalEarnings = 0;
  totalBadges = 0;

  constructor(private earningsService: EarningsService) {}

  ngOnInit() {
    this.loadRanking();
  }

  loadRanking() {
    this.earningsService.getRanking().subscribe(ranking => {
      this.ranking = ranking;
      this.totalEarnings = ranking.reduce((sum, entry) => sum + entry.totalEarnings, 0);
      this.totalBadges = ranking.reduce((sum, entry) => sum + entry.badges.length, 0);
    });
  }
}