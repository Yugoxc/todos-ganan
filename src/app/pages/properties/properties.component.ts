import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property, PropertyType } from '../../models/property.model';
import { PropertyTypeLabelPipe } from '../../pipes/property-type.pipe';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PropertyTypeLabelPipe, IconComponent],
  template: `
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-4">Propiedades disponibles</h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Encuentra tu próxima propiedad ideal. Filtra por ubicación, tipo y precio para encontrar exactamente lo que buscas.
          </p>
        </div>

        <!-- Filters -->
        <div class="card mb-8">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-4">Filtros de búsqueda</h2>
            <form (ngSubmit)="applyFilters()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="form-group">
                <label class="form-label">Región</label>
                <select [(ngModel)]="filters.region" name="region" class="form-input">
                  <option value="">Todas las regiones</option>
                  <option value="Metropolitana">Metropolitana</option>
                  <option value="Valparaíso">Valparaíso</option>
                  <option value="Biobío">Biobío</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Comuna</label>
                <select [(ngModel)]="filters.commune" name="commune" class="form-input">
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
                <select [(ngModel)]="filters.type" name="type" class="form-input">
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
                <select [(ngModel)]="filters.maxPrice" name="maxPrice" class="form-input">
                  <option value="">Sin límite</option>
                  <option value="25000000">$25.000.000</option>
                  <option value="50000000">$50.000.000</option>
                  <option value="75000000">$75.000.000</option>
                  <option value="100000000">$100.000.000</option>
                </select>
              </div>

              <div class="md:col-span-2 lg:col-span-4 flex gap-4">
                <button type="submit" class="btn btn-primary flex-1 flex items-center justify-center gap-2">
                  <app-icon name="Search" class="w-4 h-4"></app-icon>
                  Buscar propiedades
                </button>
                <button type="button" (click)="clearFilters()" class="btn btn-secondary">
                  Limpiar filtros
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Results -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <p class="text-gray-600">
              {{ filteredProperties.length }} propiedades encontradas
            </p>
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">Ordenar por:</label>
              <select [(ngModel)]="sortBy" (change)="sortProperties()" class="form-input text-sm">
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="date-desc">Más recientes</option>
                <option value="date-asc">Más antiguos</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Properties Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            *ngFor="let property of filteredProperties" 
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
                  <span class="flex items-center gap-1" *ngIf="property.bedrooms > 0">
                    <app-icon name="Home" class="w-4 h-4"></app-icon>
                    {{ property.bedrooms }} hab
                  </span>
                  <span class="flex items-center gap-1" *ngIf="property.bathrooms > 0">
                    <app-icon name="Bath" class="w-4 h-4"></app-icon>
                    {{ property.bathrooms }} baños
                  </span>
                  <span class="flex items-center gap-1" *ngIf="property.area > 0">
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

        <!-- No results -->
        <div *ngIf="filteredProperties.length === 0" class="text-center py-12">
          <app-icon name="Search" class="w-16 h-16 text-gray-400 mx-auto mb-4"></app-icon>
          <h3 class="text-xl font-semibold mb-2">No se encontraron propiedades</h3>
          <p class="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <button (click)="clearFilters()" class="btn btn-primary">
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
      
      .property-card-content {
        padding: var(--spacing-md);
      }
    }
  `]
})
export class PropertiesComponent implements OnInit {
  allProperties: Property[] = [];
  filteredProperties: Property[] = [];
  filters = {
    region: '',
    commune: '',
    type: '',
    maxPrice: ''
  };
  sortBy = 'date-desc';
  PropertyType = PropertyType;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadProperties();
    this.loadFiltersFromQueryParams();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe(properties => {
      this.allProperties = properties;
      this.applyFilters();
    });
  }

  loadFiltersFromQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.filters.region = params['region'] || '';
      this.filters.commune = params['commune'] || '';
      this.filters.type = params['type'] || '';
      this.filters.maxPrice = params['maxPrice'] || '';
    });
  }

  applyFilters() {
    let filtered = [...this.allProperties];

    // Aplicar filtros
    if (this.filters.region) {
      filtered = filtered.filter(p => p.region === this.filters.region);
    }
    if (this.filters.commune) {
      filtered = filtered.filter(p => p.commune === this.filters.commune);
    }
    if (this.filters.type) {
      filtered = filtered.filter(p => p.type === this.filters.type);
    }
    if (this.filters.maxPrice) {
      const maxPrice = parseInt(this.filters.maxPrice);
      filtered = filtered.filter(p => p.price <= maxPrice);
    }

    this.filteredProperties = filtered;
    this.sortProperties();
  }

  sortProperties() {
    switch (this.sortBy) {
      case 'price-asc':
        this.filteredProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProperties.sort((a, b) => b.price - a.price);
        break;
      case 'date-desc':
        this.filteredProperties.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'date-asc':
        this.filteredProperties.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
    }
  }

  clearFilters() {
    this.filters = {
      region: '',
      commune: '',
      type: '',
      maxPrice: ''
    };
    this.applyFilters();
    this.router.navigate(['/propiedades']);
  }

  viewProperty(property: Property) {
    this.router.navigate(['/propiedad', property.id]);
  }

  participateInProperty(property: Property, event: Event) {
    event.stopPropagation();
    console.log('Participando en propiedad:', property.id);
    this.router.navigate(['/propiedad', property.id]);
  }

  toggleFavorite(property: Property, event: Event) {
    event.stopPropagation();
    property.isFavorite = !property.isFavorite;
    console.log('Favorito toggled:', property.id, property.isFavorite);
  }
} 