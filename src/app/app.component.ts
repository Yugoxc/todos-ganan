import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Todos Ganan</h3>
            <p class="text-gray-400">
              La plataforma inmobiliaria donde todos ganan. Conectamos propietarios con buscadores para maximizar las oportunidades de venta.
            </p>
          </div>
          
          <div>
            <h4 class="text-md font-semibold mb-4">Enlaces</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a routerLink="/" class="hover:text-white transition-colors">Inicio</a></li>
              <li><a routerLink="/propiedades" class="hover:text-white transition-colors">Propiedades</a></li>
              <li><a routerLink="/publicar" class="hover:text-white transition-colors">Publicar</a></li>
              <li><a routerLink="/ranking" class="hover:text-white transition-colors">Ranking</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-md font-semibold mb-4">Herramientas</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a routerLink="/simulador" class="hover:text-white transition-colors">Simulador de hipotecas</a></li>
              <li><a routerLink="/ganancias" class="hover:text-white transition-colors">Mis ganancias</a></li>
              <li><a routerLink="/perfil" class="hover:text-white transition-colors">Mi perfil</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-md font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Términos y condiciones</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Política de privacidad</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Todos Ganan. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'Todos Ganan';
} 