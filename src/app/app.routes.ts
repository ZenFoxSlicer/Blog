import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.routes').then(m => m.PUBLIC_ROUTES)
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent)
  },
  { path: '**', redirectTo: '' }
];
