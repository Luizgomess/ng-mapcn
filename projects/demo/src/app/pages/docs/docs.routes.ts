import { Routes } from '@angular/router';
import { basemapProviders } from '@/shared/basemap.providers';
import { DocsLayoutComponent } from '../../layout/docs-layout';

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    component: DocsLayoutComponent,
    // Route-level so `ng-mapcn` is only reached from a lazy chunk.
    providers: basemapProviders,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./getting-started').then((m) => m.GettingStartedComponent),
      },
      {
        path: 'installation',
        loadComponent: () =>
          import('./installation').then((m) => m.InstallationComponent),
      },
      {
        path: 'api-reference',
        loadComponent: () =>
          import('./api-reference').then((m) => m.ApiReferenceComponent),
      },
      {
        path: 'basemaps',
        loadComponent: () =>
          import('./components/basemaps-page').then((m) => m.BasemapsPageComponent),
      },
      {
        path: 'llms-txt',
        loadComponent: () => import('./llms-txt').then((m) => m.LlmsTxtComponent),
      },
      {
        path: 'components/map',
        loadComponent: () =>
          import('./components/map-page').then((m) => m.MapPageComponent),
      },
      {
        path: 'components/controls',
        loadComponent: () =>
          import('./components/controls-page').then((m) => m.ControlsPageComponent),
      },
      {
        path: 'components/markers',
        loadComponent: () =>
          import('./components/markers-page').then((m) => m.MarkersPageComponent),
      },
      {
        path: 'components/popups',
        loadComponent: () =>
          import('./components/popups-page').then((m) => m.PopupsPageComponent),
      },
      {
        path: 'components/routes',
        loadComponent: () =>
          import('./components/routes-page').then((m) => m.RoutesPageComponent),
      },
      {
        path: 'components/arcs',
        loadComponent: () =>
          import('./components/arcs-page').then((m) => m.ArcsPageComponent),
      },
      {
        path: 'components/geojson',
        loadComponent: () =>
          import('./components/geojson-page').then((m) => m.GeojsonPageComponent),
      },
      {
        path: 'components/clusters',
        loadComponent: () =>
          import('./components/clusters-page').then((m) => m.ClustersPageComponent),
      },
      {
        path: 'components/advanced',
        loadComponent: () =>
          import('./components/advanced-page').then((m) => m.AdvancedPageComponent),
      },
    ],
  },
];
