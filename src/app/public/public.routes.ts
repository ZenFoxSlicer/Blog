import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'clinics',
    loadComponent: () => import('./pages/clinics.component').then(m => m.ClinicsComponent)
  }
];



