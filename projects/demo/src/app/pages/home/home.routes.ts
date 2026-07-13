import { Routes } from '@angular/router';
import { basemapProviders } from '@/shared/basemap.providers';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    // Route-level so `ng-mapcn` is only reached from a lazy chunk.
    providers: basemapProviders,
    loadComponent: () => import('./home').then((m) => m.HomeComponent),
  },
];
