import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../models/user.model';
import { IconComponent } from '../icon/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent, MatMenuModule, MatButtonModule],
  template: `
    <!-- Main Navigation -->
    <nav class="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          
          <!-- Logo Section -->
          <div class="flex items-center flex-shrink-0">
            <a routerLink="/" class="flex items-center space-x-3 group">
              <div class="flex flex-col">
                <span class="text-xl lg:text-2xl font-bold text-gray-900">
                  Todos Ganan
                </span>
                <span class="text-xs text-gray-500 -mt-1">Inversión Inteligente</span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center justify-center flex-1 px-8">
            <div class="flex items-center space-x-2">
              <a 
                routerLink="/propiedades" 
                routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
                class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border border-transparent"
              >
                <app-icon name="Building2" class="w-4 h-4"></app-icon>
                <span class="font-medium">Propiedades</span>
              </a>
              <a 
                routerLink="/publicar" 
                routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
                class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border border-transparent"
              >
                <app-icon name="Building2" class="w-4 h-4"></app-icon>
                <span class="font-medium">Publicar</span>
              </a>
              <a 
                routerLink="/ranking" 
                routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
                class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border border-transparent"
              >
                <app-icon name="Trophy" class="w-4 h-4"></app-icon>
                <span class="font-medium">Ranking</span>
              </a>
              <a 
                routerLink="/simulador" 
                routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
                class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border border-transparent"
              >
                <app-icon name="Calculator" class="w-4 h-4"></app-icon>
                <span class="font-medium">Simulador</span>
              </a>
              <a 
                routerLink="/ganancias" 
                routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
                class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border border-transparent"
              >
                <app-icon name="DollarSign" class="w-4 h-4"></app-icon>
                <span class="font-medium">Ganancias</span>
              </a>
            </div>
          </div>

          <!-- User Section -->
          <div class="flex items-center flex-shrink-0">
            
            <!-- User Menu (Desktop) -->
            <ng-container *ngIf="currentUser; else loginSection">
              <div class="hidden lg:flex items-center">
                <!-- Avatar -->
                <div class="relative flex-shrink-0">
                  <ng-container *ngIf="currentUser.avatar && currentUser.avatar !== ''; else noAvatar">
                    <img 
                      [src]="currentUser.avatar" 
                      [alt]="currentUser.name"
                      class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200"
                    />
                  </ng-container>
                  <ng-template #noAvatar>
                    <div 
                      class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200"
                    >
                      <span class="text-white font-medium text-sm">
                        {{ (currentUser.name ? currentUser.name.charAt(0) : 'U').toUpperCase() }}
                      </span>
                    </div>
                  </ng-template>
                </div>
                <!-- Name (single line, ellipsis if too long) -->
                <button 
                  mat-icon-button 
                  [matMenuTriggerFor]="userMenu"
                  class="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group ml-2 !w-auto !min-w-0"
                  style="max-width: 150px; width: auto; min-width: 0;"
                >
                  <span 
                    class="text-sm font-medium text-gray-900 truncate block" 
                    style="max-width: 200px;"
                  >
                    {{ currentUser.name }}
                  </span>
                </button>
                <app-icon name="ChevronDown" class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"></app-icon>

                <mat-menu #userMenu="matMenu" class="user-menu" [overlapTrigger]="false" style="border-radius: 18px;">
                  <div class="bg-white rounded-xl border-gray-100 overflow-hidden min-w-[280px]">
                    <!-- Action Buttons -->
                    <div class="flex flex-row justify-between items-center px-4 py-2 cursor-pointer" routerLink="/perfil">
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <app-icon name="User" class="w-4 h-4 text-blue-600"></app-icon>
                      </div>
                      
                      <div class="flex-1 text-left">
                        <span class="text-sm font-medium text-gray-900">Mi Perfil</span>
                        <p class="text-xs text-gray-500">Ver y editar información</p>
                      </div>
                    </div>
                    
                    <div class="flex flex-row justify-between items-center px-4 py-2 cursor-pointer" routerLink="/admin">
                      <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <app-icon name="User" class="w-4 h-4 text-purple-600"></app-icon>
                      </div>
                      <div class="flex-1 text-left">
                        <span class="text-sm font-medium text-gray-900">Configuración</span>
                        <p class="text-xs text-gray-500">Ajustes de cuenta</p>
                      </div>
                    </div>

                    <div class="flex flex-row justify-between items-center px-4 py-2 cursor-pointer" routerLink="/ganancias">
                      <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <app-icon name="DollarSign" class="w-4 h-4 text-green-600"></app-icon>
                      </div>
                      <div class="flex-1 text-left">
                        <span class="text-sm font-medium text-gray-900">Mis Ganancias</span>
                        <p class="text-xs text-gray-500">Ver historial</p>
                      </div>
                    </div>

                    <div class="flex flex-row justify-between items-center px-4 py-2 cursor-pointer" (click)="toggleTheme()">
                      <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                        <app-icon [name]="isDarkMode ? 'Sun' : 'Moon'" class="w-4 h-4 text-yellow-600"></app-icon>
                      </div>
                      <div class="flex-1 text-left">
                        <span class="text-sm font-medium text-gray-900">{{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
                        <!-- <p class="text-xs text-gray-500">{{ isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro' }}</p> -->
                      </div>
                    </div>

                    <!-- Logout Section -->
                     <div class="flex flex-row justify-between items-center px-4 py-2 cursor-pointer" (click)="logout()" >
                      <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <app-icon name="LogOut" class="w-4 h-4 text-red-600"></app-icon>
                      </div>
                      <div class="flex-1 text-left">
                        <span class="text-sm font-medium text-red-600">Cerrar Sesión</span>
                        <!-- <p class="text-xs text-red-500">Salir de tu cuenta</p> -->
                      </div>
                    </div>
                  </div>
                </mat-menu>
              </div>

              <!-- Mobile User Avatar -->
              <div class="lg:hidden flex items-center">
                <button 
                  (click)="toggleMobileMenu()" 
                  class="p-1 relative"
                >
                  <ng-container *ngIf="!mobileMenuOpen; else mobileMenuIcon">
                    <ng-container *ngIf="currentUser.avatar && currentUser.avatar !== ''; else mobileNoAvatar">
                      <img 
                        [src]="currentUser.avatar" 
                        [alt]="currentUser.name"
                        class="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200"
                      />
                    </ng-container>
                    <ng-template #mobileNoAvatar>
                      <div 
                        class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200"
                      >
                        <span class="text-white font-medium text-sm">
                          {{ (currentUser.name ? currentUser.name.charAt(0) : 'U').toUpperCase() }}
                        </span>
                      </div>
                    </ng-template>
                  </ng-container>
                  <ng-template #mobileMenuIcon>
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-gray-200">
                      <app-icon name="X" class="w-4 h-4 text-gray-600"></app-icon>
                    </div>
                  </ng-template>
                </button>
              </div>
            </ng-container>

            <!-- Login Button -->
            <ng-template #loginSection>
              <button 
                (click)="openLoginModal()" 
                class="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-900 to-gray-900 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <app-icon name="LogIn" class="w-4 h-4"></app-icon>
                <span>Login</span>
              </button>
              
              <!-- Mobile Login Icon -->
              <button 
                (click)="openLoginModal()" 
                class="sm:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <app-icon name="LogIn" class="w-5 h-5"></app-icon>
              </button>
            </ng-template>


          </div>
        </div>

        <!-- Mobile Menu -->
        <div 
          *ngIf="mobileMenuOpen" 
          class="lg:hidden border-t border-gray-100 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200"
        >
          <a 
            routerLink="/propiedades" 
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
            (click)="closeMobileMenu()" 
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-transparent"
          >
            <app-icon name="Building2" class="w-5 h-5"></app-icon>
            <span class="font-medium">Propiedades</span>
          </a>
                     <a 
             routerLink="/publicar" 
             routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
             (click)="closeMobileMenu()" 
             class="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-transparent"
           >
             <app-icon name="Building2" class="w-5 h-5"></app-icon>
             <span class="font-medium">Publicar</span>
           </a>
          <a 
            routerLink="/ranking" 
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
            (click)="closeMobileMenu()" 
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-transparent"
          >
            <app-icon name="Trophy" class="w-5 h-5"></app-icon>
            <span class="font-medium">Ranking</span>
          </a>
          <a 
            routerLink="/simulador" 
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
            (click)="closeMobileMenu()" 
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-transparent"
          >
            <app-icon name="Calculator" class="w-5 h-5"></app-icon>
            <span class="font-medium">Simulador</span>
          </a>
          <a 
            routerLink="/ganancias" 
            routerLinkActive="bg-blue-50 text-blue-700 border-blue-200" 
            (click)="closeMobileMenu()" 
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-transparent"
          >
            <app-icon name="DollarSign" class="w-5 h-5"></app-icon>
            <span class="font-medium">Ganancias</span>
          </a>
          
          <!-- Mobile Theme Toggle -->
            <button 
              (click)="toggleTheme(); closeMobileMenu()" 
              class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left rounded-xl"
            >
              <app-icon [name]="isDarkMode ? 'Sun' : 'Moon'" class="w-5 h-5"></app-icon>
              <span class="font-medium">{{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
            </button>

          <!-- Mobile Logout -->
          <div *ngIf="currentUser">
            <button 
              (click)="logout(); closeMobileMenu()" 
              class="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left rounded-xl"
            >
              <app-icon name="LogOut" class="w-5 h-5"></app-icon>
              <span class="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Login Modal -->
    <div 
      *ngIf="showLoginModal" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      (click)="closeLoginModal($event)"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
        
        <!-- Modal Header -->
        <div class="relative p-6 pb-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Bienvenido de vuelta</h2>
              <p class="text-gray-600 mt-1">Inicia sesión en tu cuenta</p>
            </div>
            <button 
              (click)="closeLoginModal()" 
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <app-icon name="X" class="w-5 h-5"></app-icon>
            </button>
          </div>
        </div>

        <!-- Login Form -->
        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="px-6 pb-6 space-y-4">
          
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <app-icon name="Mail" class="w-5 h-5 text-gray-400"></app-icon>
              </div>
              <input 
                type="email" 
                id="email" 
                name="email"
                [(ngModel)]="loginData.email"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="tu&#64;email.com"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                         <div class="relative">
               <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <app-icon name="Clock" class="w-5 h-5 text-gray-400"></app-icon>
               </div>
              <input 
                type="password" 
                id="password" 
                name="password"
                [(ngModel)]="loginData.password"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

                     <!-- Error Message -->
           <div *ngIf="loginError" class="p-3 bg-red-50 border border-red-200 rounded-xl">
             <div class="flex items-center space-x-2">
               <app-icon name="XCircle" class="w-4 h-4 text-red-500"></app-icon>
               <span class="text-red-700 text-sm">{{ loginError }}</span>
             </div>
           </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            [disabled]="isLoading"
          >
            <div class="flex items-center justify-center space-x-2">
              <span *ngIf="isLoading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span *ngIf="!isLoading">Iniciar Sesión</span>
            </div>
          </button>
        </form>

        <!-- Footer -->
        <div class="px-6 pb-6">
          <div class="text-center">
            <p class="text-gray-600 text-sm">
              ¿No tienes cuenta? 
              <a href="#" class="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Regístrate aquí
              </a>
            </p>
          </div>

                     <!-- Demo Credentials -->
           <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
             <div class="flex items-center space-x-2 mb-2">
               <app-icon name="CheckCircle" class="w-4 h-4 text-blue-500"></app-icon>
               <p class="text-sm font-medium text-blue-700">Credenciales de prueba</p>
             </div>
            <div class="space-y-1 text-xs text-blue-600">
              <p><span class="font-medium">Email:</span> juan&#64;example.com</p>
              <p><span class="font-medium">Contraseña:</span> 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>


  `
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  showLoginModal = false;
  mobileMenuOpen = false;
  userDropdownOpen = false;
  isLoading = false;
  loginError = '';
  isDarkMode = false;
  
  loginData = {
    email: 'juan@example.com',
    password: '123456'
  };

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.closeLoginModal();
      }
    });

    // Suscribirse al tema
    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!(event.target as Element).closest('.relative')) {
        this.userDropdownOpen = false;
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

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  closeUserDropdown() {
    this.userDropdownOpen = false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
} 