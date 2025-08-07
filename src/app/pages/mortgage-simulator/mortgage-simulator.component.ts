import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../components/icon/icon.component';
import { RouterModule } from '@angular/router';

interface BankOffer {
  bank: string;
  rate: number;
  monthlyPayment: number;
  totalPayment: number;
  logo: string;
}

@Component({
  selector: 'app-mortgage-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <app-icon name="Calculator" class="w-6 h-6 text-white"></app-icon>
            </div>
            <h1 class="text-4xl font-bold text-gray-900">Simulador Hipotecario</h1>
          </div>
          <p class="text-xl text-gray-600">Calcula tu cuota mensual y compara ofertas</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="card">
            <div class="card-header">
              <h2 class="text-2xl font-bold">Ingresa los datos</h2>
            </div>
            <div class="card-body">
              <form (ngSubmit)="calculateMortgage()" class="space-y-6">
                <div class="form-group">
                  <label class="form-label flex items-center gap-2">
                    <app-icon name="DollarSign" class="w-4 h-4"></app-icon>
                    Valor de la propiedad
                  </label>
                  <input type="number" [(ngModel)]="propertyValue" name="propertyValue" class="form-input" placeholder="Ej: 50000000" required />
                </div>

                <div class="form-group">
                  <label class="form-label flex items-center gap-2">
                    <app-icon name="Percent" class="w-4 h-4"></app-icon>
                    Pie (%)
                  </label>
                  <input type="number" [(ngModel)]="downPaymentPercent" name="downPaymentPercent" class="form-input" placeholder="Ej: 20" min="10" max="90" required />
                </div>

                <div class="form-group">
                  <label class="form-label flex items-center gap-2">
                    <app-icon name="Calendar" class="w-4 h-4"></app-icon>
                    Plazo (años)
                  </label>
                  <select [(ngModel)]="loanTerm" name="loanTerm" class="form-input">
                    <option value="10">10 años</option>
                    <option value="15">15 años</option>
                    <option value="20">20 años</option>
                    <option value="25">25 años</option>
                    <option value="30">30 años</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary w-full">Calcular hipoteca</button>
              </form>

              <div *ngIf="monthlyPayment > 0" class="mt-8 p-6 bg-green-50 rounded-lg">
                <h3 class="text-lg font-semibold text-green-800 mb-4">Resultado del cálculo</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">Cuota mensual:</span>
                    <div class="font-semibold text-lg text-green-600">{{ monthlyPayment | currency:'USD':'symbol':'1.0-0' }}</div>
                  </div>
                  <div>
                    <span class="text-gray-600">Total a pagar:</span>
                    <div class="font-semibold">{{ totalPayment | currency:'USD':'symbol':'1.0-0' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h2 class="text-2xl font-bold">Ofertas de bancos</h2>
            </div>
            <div class="card-body">
              <div *ngIf="bankOffers.length === 0" class="text-center py-12">
                <app-icon name="Calculator" class="w-16 h-16 text-gray-300 mx-auto mb-4"></app-icon>
                <p class="text-gray-500">Ingresa los datos y calcula para ver las ofertas</p>
              </div>

              <div *ngIf="bankOffers.length > 0" class="space-y-4">
                <div *ngFor="let offer of bankOffers" class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span class="text-blue-600 font-bold">{{ offer.bank.charAt(0) }}</span>
                      </div>
                      <div>
                        <h3 class="font-semibold">{{ offer.bank }}</h3>
                        <p class="text-sm text-gray-600">Tasa: {{ offer.rate }}%</p>
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <!-- <div>
                      <span class="text-gray-600">Cuota mensual:</span>
                      <div class="font-semibold text-lg text-primary-600">{{ offer.monthlyPayment | currency:'USD':'symbol':'1.0-0' }}</div>
                    </div> -->
                    <div>
                      <span class="text-gray-600">Total a pagar:</span>
                      <div class="font-semibold">{{ offer.totalPayment | currency:'USD':'symbol':'1.0-0' }}</div>
                    </div>
                  </div>

                  <button class="btn btn-secondary w-full mt-3">Solicitar información</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 card">
          <div class="card-body text-center">
            <h3 class="text-2xl font-bold mb-4">¿Necesitas ayuda?</h3>
            <p class="text-gray-600 mb-6">Nuestros asesores están disponibles para ayudarte</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="btn btn-primary flex items-center gap-2">
                <app-icon name="Phone" class="w-4 h-4"></app-icon>
                Llamar ahora
              </button>
              <button class="btn btn-secondary flex items-center gap-2">
                <app-icon name="Mail" class="w-4 h-4"></app-icon>
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MortgageSimulatorComponent implements OnInit {
  propertyValue = 50000000;
  downPaymentPercent = 20;
  loanTerm = 20;
  monthlyPayment = 0;
  totalPayment = 0;
  bankOffers: BankOffer[] = [];

  ngOnInit() {
    this.calculateMortgage();
  }

  calculateMortgage() {
    const downPayment = (this.propertyValue * this.downPaymentPercent) / 100;
    const loanAmount = this.propertyValue - downPayment;
    const monthlyRate = 0.005;
    const numberOfPayments = this.loanTerm * 12;

    this.monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    this.totalPayment = this.monthlyPayment * numberOfPayments;
    this.generateBankOffers(loanAmount, numberOfPayments);
  }

  generateBankOffers(loanAmount: number, numberOfPayments: number) {
    const banks = [
      { name: 'Banco de Chile', rate: 5.8 },
      { name: 'Banco Santander', rate: 6.2 },
      { name: 'Banco Estado', rate: 5.5 },
      { name: 'Banco BCI', rate: 6.0 }
    ];

    this.bankOffers = banks.map(bank => {
      const monthlyRate = (bank.rate / 100) / 12;
      const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      return {
        bank: bank.name,
        rate: bank.rate,
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(monthlyPayment * numberOfPayments),
        logo: ''
      };
    });

    this.bankOffers.sort((a, b) => a.rate - b.rate);
  }
} 