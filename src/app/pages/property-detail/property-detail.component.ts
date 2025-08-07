import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
import { Property, PropertyType } from '../../models/property.model';
import { PropertyTypeLabelPipe } from '../../pipes/property-type.pipe';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, PropertyTypeLabelPipe, IconComponent],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <button 
            (click)="goBack()" 
            class="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <app-icon name="ArrowLeft" class="w-4 h-4"></app-icon>
            Volver
          </button>
        </nav>

        <div *ngIf="property" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Image Gallery -->
            <div class="card overflow-hidden mb-8">
              <div class="relative">
                <img 
                  [src]="property.images[currentImageIndex]" 
                  [alt]="property.title"
                  class="w-full h-96 object-cover"
                />
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="flex gap-2">
                    <button 
                      *ngFor="let image of property.images; let i = index"
                      (click)="currentImageIndex = i"
                      class="w-16 h-12 rounded-lg overflow-hidden border-2"
                      [class.border-primary-600]="i === currentImageIndex"
                      [class.border-white]="i !== currentImageIndex"
                    >
                      <img [src]="image" [alt]="property.title" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Property Details -->
            <div class="card mb-8">
              <div class="card-header">
                <h1 class="text-3xl font-bold text-gray-900">{{ property.title }}</h1>
                <p class="text-gray-600 flex items-center gap-2 mt-2">
                  <app-icon name="MapPin" class="w-4 h-4"></app-icon>
                  {{ property.address }}, {{ property.commune }}, {{ property.region }}
                </p>
              </div>
              
              <div class="card-body">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div class="text-center">
                    <div class="flex items-center justify-center gap-2 mb-2">
                      <app-icon name="Square" class="w-5 h-5 text-primary-600"></app-icon>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">{{ property.surface }}m²</div>
                    <div class="text-sm text-gray-600">Superficie</div>
                  </div>
                  
                  <div class="text-center">
                    <div class="flex items-center justify-center gap-2 mb-2">
                      <app-icon name="Home" class="w-5 h-5 text-primary-600"></app-icon>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">{{ property.bedrooms }}</div>
                    <div class="text-sm text-gray-600">Dormitorios</div>
                  </div>
                  
                  <div class="text-center">
                    <div class="flex items-center justify-center gap-2 mb-2">
                      <app-icon name="Bath" class="w-5 h-5 text-primary-600"></app-icon>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">{{ property.bathrooms }}</div>
                    <div class="text-sm text-gray-600">Baños</div>
                  </div>
                  
                  <div class="text-center">
                    <div class="flex items-center justify-center gap-2 mb-2">
                      <app-icon name="Users" class="w-5 h-5 text-primary-600"></app-icon>
                    </div>
                    <div class="text-2xl font-bold text-gray-900">{{ property.participants.length }}</div>
                    <div class="text-sm text-gray-600">Participantes</div>
                  </div>
                </div>

                <div class="border-t border-gray-200 pt-6">
                  <h3 class="text-xl font-semibold mb-4">Descripción</h3>
                  <p class="text-gray-700 leading-relaxed">{{ property.description }}</p>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="card mb-8">
              <div class="card-header">
                <h3 class="text-xl font-semibold">Ubicación</h3>
              </div>
              <div class="card-body">
                <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div class="text-center text-gray-600">
                    <app-icon name="MapPin" class="w-12 h-12 mx-auto mb-4"></app-icon>
                    <p>Mapa de ubicación</p>
                    <p class="text-sm">{{ property.address }}, {{ property.commune }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Price Card -->
            <div class="card mb-6 sticky top-24">
              <div class="card-body">
                <div class="text-center mb-6">
                  <div class="text-3xl font-bold text-primary-600 mb-2">
                    {{ property.price | currency:'USD':'symbol':'1.0-0' }}
                  </div>
                  <div class="text-gray-600">{{ property.type | propertyTypeLabel }}</div>
                </div>

                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Tipo:</span>
                    <span class="font-medium">{{ property.type | propertyTypeLabel }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Superficie:</span>
                    <span class="font-medium">{{ property.surface }}m²</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Dormitorios:</span>
                    <span class="font-medium">{{ property.bedrooms }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Baños:</span>
                    <span class="font-medium">{{ property.bathrooms }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Publicado:</span>
                    <span class="font-medium">{{ property.createdAt | date:'dd/MM/yyyy' }}</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <button 
                    (click)="participateInProperty()"
                    class="btn btn-primary w-full"
                  >
                    Quiero vender esta propiedad
                  </button>
                  
                  <button 
                    (click)="openSimulator()"
                    class="btn btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <app-icon name="Calculator" class="w-4 h-4"></app-icon>
                    Simular crédito
                  </button>
                </div>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="card">
              <div class="card-header">
                <h3 class="text-lg font-semibold">Información de contacto</h3>
              </div>
              <div class="card-body">
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <app-icon name="Phone" class="w-4 h-4 text-gray-600"></app-icon>
                    <span class="text-gray-700">+56 9 1234 5678</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <app-icon name="Mail" class="w-4 h-4 text-gray-600"></app-icon>
                    <span class="text-gray-700">contacto@todosganan.cl</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <app-icon name="Calendar" class="w-4 h-4 text-gray-600"></app-icon>
                    <span class="text-gray-700">Lun - Vie: 9:00 - 18:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div *ngIf="!property && !error" class="text-center py-12">
          <div class="skeleton w-32 h-8 mx-auto mb-4"></div>
          <div class="skeleton w-64 h-4 mx-auto"></div>
        </div>

        <!-- Error -->
        <div *ngIf="error" class="text-center py-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <button 
            (click)="goBack()" 
            class="btn btn-primary"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  currentImageIndex = 0;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.loadProperty(propertyId);
    }
  }

  loadProperty(id: string) {
    this.propertyService.getPropertyById(id).subscribe({
      next: (property) => {
        if (property) {
          this.property = property;
        } else {
          this.error = 'La propiedad no existe o ha sido removida';
        }
      },
      error: (err) => {
        this.error = 'Error al cargar la propiedad';
        console.error('Error loading property:', err);
      }
    });
  }

  participateInProperty() {
    if (!this.authService.isAuthenticated()) {
      // Redirigir al login o mostrar modal
      alert('Debes iniciar sesión para participar');
      return;
    }

    if (!this.property) return;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.propertyService.participateInProperty(
      this.property.id,
      currentUser.id,
      currentUser.name,
      currentUser.email
    ).subscribe({
      next: () => {
        alert('¡Te has registrado exitosamente para participar en esta propiedad!');
        this.router.navigate(['/panel-buscador']);
      },
      error: (err) => {
        alert('Error al registrarse. Inténtalo de nuevo.');
        console.error('Error participating:', err);
      }
    });
  }

  openSimulator() {
    this.router.navigate(['/simulador'], { 
      queryParams: { 
        propertyPrice: this.property?.price,
        propertyId: this.property?.id 
      } 
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 