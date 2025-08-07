import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="min-h-screen bg-gray-50">
      <router-outlet></router-outlet>
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 md:py-12 safe-bottom">
      <div class="container-responsive">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 class="text-lg md:text-xl font-semibold mb-3 md:mb-4">Todos Ganan</h3>
            <p class="text-gray-400 text-sm md:text-base leading-relaxed">
              La plataforma inmobiliaria donde todos ganan. Conectamos propietarios con buscadores para maximizar las oportunidades de venta.
            </p>
          </div>
          
          <div>
            <h4 class="text-base md:text-lg font-semibold mb-3 md:mb-4">Enlaces</h4>
            <ul class="space-y-2 text-gray-400 text-sm md:text-base">
              <li><a routerLink="/" class="hover:text-white transition-colors hover:underline">Inicio</a></li>
              <li><a routerLink="/propiedades" class="hover:text-white transition-colors hover:underline">Propiedades</a></li>
              <li><a routerLink="/publicar" class="hover:text-white transition-colors hover:underline">Publicar</a></li>
              <li><a routerLink="/ranking" class="hover:text-white transition-colors hover:underline">Ranking</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-base md:text-lg font-semibold mb-3 md:mb-4">Herramientas</h4>
            <ul class="space-y-2 text-gray-400 text-sm md:text-base">
              <li><a routerLink="/simulador" class="hover:text-white transition-colors hover:underline">Simulador de hipotecas</a></li>
              <li><a routerLink="/ganancias" class="hover:text-white transition-colors hover:underline">Mis ganancias</a></li>
              <li><a routerLink="/perfil" class="hover:text-white transition-colors hover:underline">Mi perfil</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-base md:text-lg font-semibold mb-3 md:mb-4">Legal</h4>
            <ul class="space-y-2 text-gray-400 text-sm md:text-base">
              <li><a href="#" class="hover:text-white transition-colors hover:underline">Términos y condiciones</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:underline">Política de privacidad</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:underline">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
          <p class="text-sm md:text-base">&copy; 2024 Todos Ganan. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'Todos Ganan';
} 