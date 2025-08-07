import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginCredentials, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Usuarios simulados
  private mockUsers: User[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'searcher' as any,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      phone: '+56912345678',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date(),
      isActive: true
    },
    {
      id: '2',
      name: 'María González',
      email: 'maria@example.com',
      role: 'admin' as any,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      phone: '+56987654321',
      createdAt: new Date('2024-01-10'),
      lastLogin: new Date(),
      isActive: true
    },
    {
      id: '3',
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      role: 'owner' as any,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      phone: '+56911223344',
      createdAt: new Date('2024-01-20'),
      lastLogin: new Date(),
      isActive: true
    }
  ];

  constructor() {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const user = this.mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === '123456') {
      const response: AuthResponse = {
        user,
        token: 'mock-jwt-token-' + Date.now()
      };
      
      // Guardar en localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', response.token);
      
      this.currentUserSubject.next(user);
      
      return of(response).pipe(delay(800)); // Simular delay de red
    }
    
    throw new Error('Credenciales inválidas');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
} 