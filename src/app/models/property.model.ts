export interface Property {
  id: string;
  title: string;
  address: string;
  commune: string;
  region: string;
  location: string; // Para mostrar la ubicación completa
  price: number;
  surface: number;
  area: number; // Área en m² (alias de surface)
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  description: string;
  images: string[];
  featured: boolean;
  createdAt: Date;
  status: PropertyStatus;
  participants: PropertyParticipant[];
  amenities: string[];
  parking: number;
  yearBuilt?: number;
  isFavorite?: boolean; // Para manejar favoritos
}

export enum PropertyType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  TOWNHOUSE = 'townhouse',
  LAND = 'land',
  COMMERCIAL = 'commercial'
}

export enum PropertyStatus {
  ACTIVE = 'active',
  SOLD = 'sold',
  INACTIVE = 'inactive'
}

export interface PropertyParticipant {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: ParticipantStatus;
  registeredAt: Date;
  leads: Lead[];
}

export enum ParticipantStatus {
  EVALUATION = 'evaluation',
  CONCRETED = 'concreted',
  NOT_CONCRETED = 'not_concreted'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  observations: string;
  status: LeadStatus;
  createdAt: Date;
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  INTERESTED = 'interested',
  NOT_INTERESTED = 'not_interested',
  CONVERTED = 'converted'
} 