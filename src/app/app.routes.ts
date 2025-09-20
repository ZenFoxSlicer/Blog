import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent)
  },
  { path: '**', redirectTo: '' }
];
