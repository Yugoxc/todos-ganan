import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-8">Panel Administrativo</h1>
        <p class="text-center text-gray-600">Página en construcción</p>
      </div>
    </div>
  `,
  styles: []
})
export class AdminPanelComponent {} 