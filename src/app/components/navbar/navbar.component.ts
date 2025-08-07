import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <app-icon name="Building2" class="w-5 h-5 text-white"></app-icon>
            </div>
            <span class="text-xl font-bold text-gray-900">Todos Ganan</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-6">
            <a routerLink="/" routerLinkActive="text-brand-500" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors">
              <app-icon name="Home" class="w-4 h-4"></app-icon>
              Inicio
            </a>
            <a routerLink="/propiedades" routerLinkActive="text-brand-500" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors">
              <app-icon name="Building2" class="w-4 h-4"></app-icon>
              Propiedades
            </a>
            <a routerLink="/publicar" routerLinkActive="text-brand-500" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors">
              <app-icon name="Building2" class="w-4 h-4"></app-icon>
              Publicar
            </a>
            <a routerLink="/ranking" routerLinkActive="text-brand-500" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors">
              <app-icon name="Trophy" class="w-4 h-4"></app-icon>
              Ranking
            </a>
            <a routerLink="/simulador" routerLinkActive="text-brand-500" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors">
              <app-icon name="Calculator" class="w-4 h-4"></app-icon>
              Simulador
            </a>
            <a routerLink="/ganancias" routerLinkActive="text-brand-500" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors">
              <app-icon name="DollarSign" class="w-4 h-4"></app-icon>
              Ganancias
            </a>
          </div>

          <!-- User Menu / Login -->
          <div class="flex items-center gap-4">
            <ng-container *ngIf="currentUser; else loginButton">
              <div class="flex items-center gap-3">
                <a routerLink="/perfil" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors">
                  <img 
                    [src]="currentUser.avatar || 'https://via.placeholder.com/32x32/666666/FFFFFF?text=U'" 
                    [alt]="currentUser.name"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <span class="hidden sm:block">{{ currentUser.name }}</span>
                </a>
                <button 
                  (click)="logout()" 
                  class="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <app-icon name="LogOut" class="w-4 h-4"></app-icon>
                  <span class="hidden sm:block">Salir</span>
                </button>
              </div>
            </ng-container>
            
            <ng-template #loginButton>
              <button 
                (click)="openLoginModal()" 
                class="btn btn-primary flex items-center gap-2"
              >
                <app-icon name="LogIn" class="w-4 h-4"></app-icon>
                <span class="hidden sm:block">Iniciar Sesión</span>
              </button>
            </ng-template>

            <!-- Mobile menu button -->
            <button 
              (click)="toggleMobileMenu()" 
              class="md:hidden p-2 text-gray-700 hover:text-brand-500 transition-colors"
            >
              <svg *ngIf="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <app-icon name="X" class="w-5 h-5" *ngIf="mobileMenuOpen"></app-icon>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div 
          *ngIf="mobileMenuOpen" 
          class="md:hidden border-t border-gray-200 py-4 space-y-4"
        >
          <a routerLink="/" routerLinkActive="text-brand-500" (click)="closeMobileMenu()" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors py-2">
            <app-icon name="Home" class="w-4 h-4"></app-icon>
            Inicio
          </a>
          <a routerLink="/propiedades" routerLinkActive="text-brand-500" (click)="closeMobileMenu()" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors py-2">
            <app-icon name="Building2" class="w-4 h-4"></app-icon>
            Propiedades
          </a>
          <a routerLink="/publicar" routerLinkActive="text-brand-500" (click)="closeMobileMenu()" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors py-2">
            <app-icon name="Building2" class="w-4 h-4"></app-icon>
            Publicar
          </a>
          <a routerLink="/ranking" routerLinkActive="text-brand-500" (click)="closeMobileMenu()" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors py-2">
            <app-icon name="Trophy" class="w-4 h-4"></app-icon>
            Ranking
          </a>
          <a routerLink="/simulador" routerLinkActive="text-brand-500" (click)="closeMobileMenu()" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors py-2">
            <app-icon name="Calculator" class="w-4 h-4"></app-icon>
            Simulador
          </a>
          <a routerLink="/ganancias" routerLinkActive="text-brand-500" (click)="closeMobileMenu()" class="flex items-center gap-2 text-gray-700 hover:text-brand-500 transition-colors py-2">
            <app-icon name="DollarSign" class="w-4 h-4"></app-icon>
            Ganancias
          </a>
        </div>
      </div>
    </nav>

    <!-- Login Modal -->
    <div 
      *ngIf="showLoginModal" 
      class="modal-backdrop"
      (click)="closeLoginModal($event)"
    >
      <div class="modal-content p-6" (click)="$event.stopPropagation()">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Inicia sesión en Todos Ganan</h2>
          <button 
            (click)="closeLoginModal()" 
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <app-icon name="X" class="w-5 h-5"></app-icon>
          </button>
        </div>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="space-y-4">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              [(ngModel)]="loginData.email"
              required
              class="form-input"
              placeholder="tu@email.com"
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              [(ngModel)]="loginData.password"
              required
              class="form-input"
              placeholder="••••••••"
            />
          </div>

          <div *ngIf="loginError" class="text-error text-sm">
            {{ loginError }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-full"
            [disabled]="isLoading"
          >
            <span *ngIf="isLoading" class="skeleton w-4 h-4 rounded"></span>
            <span *ngIf="!isLoading">Entrar</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            ¿No tienes cuenta? 
            <a href="#" class="text-brand-500 hover:text-brand-600 font-medium">
              Regístrate
            </a>
          </p>
        </div>

        <!-- Demo credentials -->
        <div class="mt-4 p-3 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-2">Credenciales de prueba:</p>
          <p class="text-xs text-gray-500">Email: juan@example.com</p>
          <p class="text-xs text-gray-500">Contraseña: 123456</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal-content {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .modal-content {
        margin: 1rem;
        max-height: calc(100vh - 2rem);
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  showLoginModal = false;
  mobileMenuOpen = false;
  isLoading = false;
  loginError = '';
  
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.closeLoginModal();
      }
    });
  }

  openLoginModal() {
    this.showLoginModal = true;
    this.loginError = '';
  }

  closeLoginModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showLoginModal = false;
    this.loginData = { email: '', password: '' };
    this.loginError = '';
  }

  async onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.loginError = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    try {
      await this.authService.login(this.loginData).toPromise();
      this.router.navigate(['/']);
    } catch (error: any) {
      this.loginError = error.message || 'Error al iniciar sesión';
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
} 