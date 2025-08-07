import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Property, PropertyType, PropertyStatus, PropertyParticipant, ParticipantStatus, Lead, LeadStatus } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // Propiedades simuladas
  private mockProperties: Property[] = [
    {
      id: '1',
      title: 'Casa moderna en Las Condes',
      address: 'Av. Apoquindo 1234',
      commune: 'Las Condes',
      region: 'Metropolitana',
      location: 'Av. Apoquindo 1234, Las Condes',
      price: 85000000,
      surface: 180,
      area: 180,
      bedrooms: 4,
      bathrooms: 3,
      type: PropertyType.HOUSE,
      description: 'Hermosa casa moderna con excelente ubicación, amplios espacios y terminaciones de lujo.',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
      ],
      featured: true,
      createdAt: new Date('2024-01-15'),
      status: PropertyStatus.ACTIVE,
      amenities: ['Estacionamiento', 'Jardín', 'Terraza', 'Seguridad 24/7'],
      parking: 2,
      isFavorite: false,
      participants: [
        {
          id: '1',
          userId: '1',
          userName: 'Juan Pérez',
          userEmail: 'juan@example.com',
          status: ParticipantStatus.EVALUATION,
          registeredAt: new Date('2024-01-16'),
          leads: [
            {
              id: '1',
              name: 'Ana Silva',
              email: 'ana@example.com',
              phone: '+56911111111',
              observations: 'Interesada en visitar la propiedad',
              status: LeadStatus.INTERESTED,
              createdAt: new Date('2024-01-17')
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Departamento en Providencia',
      address: 'Av. Providencia 5678',
      commune: 'Providencia',
      region: 'Metropolitana',
      location: 'Av. Providencia 5678, Providencia',
      price: 45000000,
      surface: 85,
      area: 85,
      bedrooms: 2,
      bathrooms: 2,
      type: PropertyType.APARTMENT,
      description: 'Departamento luminoso y funcional en edificio con amenities.',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
      ],
      featured: true,
      createdAt: new Date('2024-01-10'),
      status: PropertyStatus.ACTIVE,
      amenities: ['Gimnasio', 'Piscina', 'Sala de eventos', 'Seguridad'],
      parking: 1,
      isFavorite: false,
      participants: [
        {
          id: '2',
          userId: '1',
          userName: 'Juan Pérez',
          userEmail: 'juan@example.com',
          status: ParticipantStatus.CONCRETED,
          registeredAt: new Date('2024-01-11'),
          leads: []
        }
      ]
    },
    {
      id: '3',
      title: 'Casa en Ñuñoa',
      address: 'Av. Grecia 9012',
      commune: 'Ñuñoa',
      region: 'Metropolitana',
      location: 'Av. Grecia 9012, Ñuñoa',
      price: 65000000,
      surface: 150,
      area: 150,
      bedrooms: 3,
      bathrooms: 2,
      type: PropertyType.HOUSE,
      description: 'Casa familiar con jardín y terraza en barrio tranquilo.',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
      ],
      featured: true,
      createdAt: new Date('2024-01-12'),
      status: PropertyStatus.ACTIVE,
      amenities: ['Jardín', 'Terraza', 'Estacionamiento'],
      parking: 1,
      isFavorite: false,
      participants: []
    },
    {
      id: '4',
      title: 'Oficina comercial en Santiago Centro',
      address: 'Ahumada 123',
      commune: 'Santiago',
      region: 'Metropolitana',
      location: 'Ahumada 123, Santiago Centro',
      price: 35000000,
      surface: 120,
      area: 120,
      bedrooms: 0,
      bathrooms: 2,
      type: PropertyType.COMMERCIAL,
      description: 'Oficina comercial en excelente ubicación céntrica.',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
      ],
      featured: false,
      createdAt: new Date('2024-01-08'),
      status: PropertyStatus.ACTIVE,
      amenities: ['Aire acondicionado', 'Sistema de seguridad', 'Estacionamiento'],
      parking: 2,
      isFavorite: false,
      participants: []
    },
    {
      id: '5',
      title: 'Terreno en Maipú',
      address: 'Camino Rinconada 456',
      commune: 'Maipú',
      region: 'Metropolitana',
      location: 'Camino Rinconada 456, Maipú',
      price: 25000000,
      surface: 500,
      area: 500,
      bedrooms: 0,
      bathrooms: 0,
      type: PropertyType.LAND,
      description: 'Terreno plano ideal para construcción residencial.',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'
      ],
      featured: false,
      createdAt: new Date('2024-01-05'),
      status: PropertyStatus.ACTIVE,
      amenities: [],
      parking: 0,
      isFavorite: false,
      participants: []
    }
  ];

  constructor() {}

  getProperties(): Observable<Property[]> {
    return of(this.mockProperties).pipe(delay(500));
  }

  getFeaturedProperties(): Property[] {
    return this.mockProperties.filter(property => property.featured);
  }

  getPropertyById(id: string): Observable<Property | undefined> {
    const property = this.mockProperties.find(p => p.id === id);
    return of(property).pipe(delay(300));
  }

  searchProperties(filters: any): Observable<Property[]> {
    let filtered = [...this.mockProperties];
    
    if (filters.region) {
      filtered = filtered.filter(p => p.region.toLowerCase().includes(filters.region.toLowerCase()));
    }
    
    if (filters.commune) {
      filtered = filtered.filter(p => p.commune.toLowerCase().includes(filters.commune.toLowerCase()));
    }
    
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    
    return of(filtered).pipe(delay(400));
  }

  participateInProperty(propertyId: string, userId: string, userName: string, userEmail: string): Observable<PropertyParticipant> {
    const property = this.mockProperties.find(p => p.id === propertyId);
    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    const participant: PropertyParticipant = {
      id: Date.now().toString(),
      userId,
      userName,
      userEmail,
      status: ParticipantStatus.EVALUATION,
      registeredAt: new Date(),
      leads: []
    };

    property.participants.push(participant);
    
    return of(participant).pipe(delay(300));
  }

  addLead(propertyId: string, participantId: string, lead: Omit<Lead, 'id' | 'createdAt'>): Observable<Lead> {
    const property = this.mockProperties.find(p => p.id === propertyId);
    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    const participant = property.participants.find(p => p.id === participantId);
    if (!participant) {
      throw new Error('Participante no encontrado');
    }

    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    participant.leads.push(newLead);
    
    return of(newLead).pipe(delay(300));
  }

  updateParticipantStatus(propertyId: string, participantId: string, status: ParticipantStatus): Observable<void> {
    const property = this.mockProperties.find(p => p.id === propertyId);
    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    const participant = property.participants.find(p => p.id === participantId);
    if (!participant) {
      throw new Error('Participante no encontrado');
    }

    participant.status = status;
    
    return of(void 0).pipe(delay(200));
  }
} 