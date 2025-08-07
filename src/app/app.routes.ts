import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tailwind-test',
    loadComponent: () => import('./components/tailwind-test/tailwind-test.component').then(m => m.TailwindTestComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'propiedades',
    loadComponent: () => import('./pages/properties/properties.component').then(m => m.PropertiesComponent)
  },
  {
    path: 'propiedad/:id',
    loadComponent: () => import('./pages/property-detail/property-detail.component').then(m => m.PropertyDetailComponent)
  },
  {
    path: 'publicar',
    loadComponent: () => import('./pages/publish-property/publish-property.component').then(m => m.PublishPropertyComponent)
  },
  {
    path: 'ranking',
    loadComponent: () => import('./pages/ranking/ranking.component').then(m => m.RankingComponent)
  },
  {
    path: 'simulador',
    loadComponent: () => import('./pages/mortgage-simulator/mortgage-simulator.component').then(m => m.MortgageSimulatorComponent)
  },
  {
    path: 'ganancias',
    loadComponent: () => import('./pages/earnings/earnings.component').then(m => m.EarningsComponent)
  },
  {
    path: 'panel-buscador',
    loadComponent: () => import('./pages/searcher-panel/searcher-panel.component').then(m => m.SearcherPanelComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
]; 