import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property, PropertyType } from '../../models/property.model';
import { PropertyTypeLabelPipe } from '../../pipes/property-type.pipe';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PropertyTypeLabelPipe, IconComponent],
  template: `
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="hero-title">
            Encuentra tu próxima propiedad
          </h1>
          <p class="hero-subtitle">
            La plataforma inmobiliaria donde todos ganan
          </p>
          <button 
            routerLink="/publicar" 
            class="btn bg-white text-brand-500 hover:bg-gray-100 text-lg px-8 py-4 mt-8"
          >
            Publica tu propiedad gratis
          </button>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-8">Busca tu propiedad ideal</h2>
          
          <div class="card p-6">
            <form (ngSubmit)="onSearch()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="form-group">
                <label class="form-label">Región</label>
                <select [(ngModel)]="searchFilters.region" name="region" class="form-input">
                  <option value="">Todas las regiones</option>
                  <option value="Metropolitana">Metropolitana</option>
                  <option value="Valparaíso">Valparaíso</option>
                  <option value="Biobío">Biobío</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Comuna</label>
                <select [(ngModel)]="searchFilters.commune" name="commune" class="form-input">
                  <option value="">Todas las comunas</option>
                  <option value="Las Condes">Las Condes</option>
                  <option value="Providencia">Providencia</option>
                  <option value="Ñuñoa">Ñuñoa</option>
                  <option value="Santiago">Santiago</option>
                  <option value="Maipú">Maipú</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Tipo</label>
                <select [(ngModel)]="searchFilters.type" name="type" class="form-input">
                  <option value="">Todos los tipos</option>
                  <option [value]="PropertyType.HOUSE">Casa</option>
                  <option [value]="PropertyType.APARTMENT">Departamento</option>
                  <option [value]="PropertyType.TOWNHOUSE">Casa en condominio</option>
                  <option [value]="PropertyType.COMMERCIAL">Comercial</option>
                  <option [value]="PropertyType.LAND">Terreno</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Precio máximo</label>
                <select [(ngModel)]="searchFilters.maxPrice" name="maxPrice" class="form-input">
                  <option value="">Sin límite</option>
                  <option value="25000000">$25.000.000</option>
                  <option value="50000000">$50.000.000</option>
                  <option value="75000000">$75.000.000</option>
                  <option value="100000000">$100.000.000</option>
                </select>
              </div>

              <div class="md:col-span-2 lg:col-span-4">
                <button type="submit" class="btn btn-primary w-full flex items-center justify-center gap-2">
                  <app-icon name="Search" class="w-4 h-4"></app-icon>
                  Buscar propiedades
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Properties -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Propiedades destacadas</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Descubre las mejores oportunidades inmobiliarias seleccionadas especialmente para ti
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            *ngFor="let property of featuredProperties" 
            class="property-card group cursor-pointer"
            (click)="viewProperty(property)"
          >
            <div class="property-card-image">
              <img 
                [src]="property.images[0] || 'https://via.placeholder.com/400x280/666666/FFFFFF?text=Propiedad'" 
                [alt]="property.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4">
                <span class="badge badge-primary">{{ property.type | propertyTypeLabel }}</span>
              </div>
              <div class="absolute top-4 right-4">
                <button 
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                  (click)="toggleFavorite(property, $event)"
                >
                  <app-icon 
                    [name]="property.isFavorite ? 'Heart' : 'Heart'" 
                    [class]="property.isFavorite ? 'w-4 h-4 text-red-500 fill-current' : 'w-4 h-4 text-gray-400'"
                  ></app-icon>
                </button>
              </div>
            </div>
            
            <div class="property-card-content">
              <div class="flex items-start justify-between mb-2">
                <h3 class="property-card-title">{{ property.title }}</h3>
                <div class="flex items-center gap-1">
                  <app-icon name="Star" class="w-4 h-4 text-yellow-400 fill-current"></app-icon>
                  <span class="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              
              <p class="property-card-location flex items-center gap-1 mb-3">
                <app-icon name="MapPin" class="w-3 h-3"></app-icon>
                {{ property.location }}
              </p>
              
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <app-icon name="Home" class="w-4 h-4"></app-icon>
                    {{ property.bedrooms }} hab
                  </span>
                  <span class="flex items-center gap-1">
                    <app-icon name="Bath" class="w-4 h-4"></app-icon>
                    {{ property.bathrooms }} baños
                  </span>
                  <span class="flex items-center gap-1">
                    <app-icon name="Square" class="w-4 h-4"></app-icon>
                    {{ property.area }} m²
                  </span>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="property-card-price">{{ property.price | currency:'USD':'symbol':'1.0-0' }}</div>
                <button 
                  class="btn btn-primary text-sm px-4 py-2"
                  (click)="participateInProperty(property, $event)"
                >
                  Participar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <button 
            routerLink="/propiedades" 
            class="btn btn-secondary text-lg px-8 py-3"
          >
            Ver todas las propiedades
            <app-icon name="ArrowRight" class="w-4 h-4"></app-icon>
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">¿Por qué elegir Todos Ganan?</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Nuestra plataforma revoluciona el mercado inmobiliario conectando propietarios y buscadores de manera eficiente
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <app-icon name="Building2" class="w-8 h-8 text-brand-500"></app-icon>
            </div>
            <h3 class="text-xl font-semibold mb-2">Propiedades verificadas</h3>
            <p class="text-gray-600">Todas nuestras propiedades pasan por un riguroso proceso de verificación</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <app-icon name="DollarSign" class="w-8 h-8 text-brand-500"></app-icon>
            </div>
            <h3 class="text-xl font-semibold mb-2">Sin comisiones</h3>
            <p class="text-gray-600">Publica tu propiedad sin pagar comisiones. Solo pagas cuando vendes</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <app-icon name="Users" class="w-8 h-8 text-brand-500"></app-icon>
            </div>
            <h3 class="text-xl font-semibold mb-2">Comunidad activa</h3>
            <p class="text-gray-600">Conecta con miles de compradores interesados en tu zona</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, var(--brand-500) 0%, var(--brand-600) 100%);
      color: white;
      padding: var(--spacing-4xl) 0;
      text-align: center;
    }

    .hero-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      margin-bottom: var(--spacing-lg);
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2.5vw, 1.25rem);
      margin-bottom: var(--spacing-2xl);
      opacity: 0.9;
    }

    .property-card {
      background: white;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      transition: all var(--transition-normal);
      cursor: pointer;
      border: 1px solid var(--gray-200);
    }

    .property-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-2xl);
    }

    .property-card-image {
      position: relative;
      width: 100%;
      height: 280px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .property-card-image {
        height: 200px;
      }
    }

    .property-card-content {
      padding: var(--spacing-lg);
    }

    .property-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: var(--spacing-sm);
      line-height: 1.3;
    }

    .property-card-location {
      color: var(--gray-600);
      font-size: 0.875rem;
      margin-bottom: var(--spacing-sm);
    }

    .property-card-price {
      font-family: 'Inter', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 var(--spacing-md);
      }
      
      .hero-section {
        padding: var(--spacing-2xl) 0;
      }
      
      .property-card-content {
        padding: var(--spacing-md);
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProperties: Property[] = [];
  searchFilters = {
    region: '',
    commune: '',
    type: '',
    maxPrice: ''
  };
  PropertyType = PropertyType;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFeaturedProperties();
  }

  loadFeaturedProperties() {
    this.featuredProperties = this.propertyService.getFeaturedProperties();
  }

  onSearch() {
    // Convertir el precio máximo a string si es necesario
    if (this.searchFilters.maxPrice) {
      this.searchFilters.maxPrice = parseInt(this.searchFilters.maxPrice).toString();
    }
    
    // Navegar a la página de propiedades con los filtros
    this.router.navigate(['/propiedades'], { 
      queryParams: this.searchFilters 
    });
  }

  viewProperty(property: Property) {
    this.router.navigate(['/propiedad', property.id]);
  }

  participateInProperty(property: Property, event: Event) {
    event.stopPropagation();
    // Aquí iría la lógica para participar en la propiedad
    console.log('Participando en propiedad:', property.id);
    // Por ahora, navegar al detalle
    this.router.navigate(['/propiedad', property.id]);
  }

  toggleFavorite(property: Property, event: Event) {
    event.stopPropagation();
    property.isFavorite = !property.isFavorite;
    console.log('Favorito toggled:', property.id, property.isFavorite);
  }
} 