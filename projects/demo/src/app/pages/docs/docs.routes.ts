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
        title: 'Introduction',
        loadComponent: () =>
          import('./getting-started').then((m) => m.GettingStartedComponent),
      },
      {
        path: 'installation',
        title: 'Installation',
        loadComponent: () =>
          import('./installation').then((m) => m.InstallationComponent),
      },
      {
        path: 'api-reference',
        title: 'API Reference',
        loadComponent: () =>
          import('./api-reference').then((m) => m.ApiReferenceComponent),
      },
      {
        path: 'basemaps',
        title: 'Map Styles',
        loadComponent: () =>
          import('./components/basemaps-page').then((m) => m.BasemapsPageComponent),
      },
      {
        path: 'llms-txt',
        title: 'llms.txt',
        loadComponent: () => import('./llms-txt').then((m) => m.LlmsTxtComponent),
      },
      {
        path: 'components/map',
        title: 'Map',
        loadComponent: () =>
          import('./components/map-page').then((m) => m.MapPageComponent),
      },
      {
        path: 'components/controls',
        title: 'Controls',
        loadComponent: () =>
          import('./components/controls-page').then((m) => m.ControlsPageComponent),
      },
      {
        path: 'components/markers',
        title: 'Markers',
        loadComponent: () =>
          import('./components/markers-page').then((m) => m.MarkersPageComponent),
      },
      {
        path: 'components/popups',
        title: 'Popups',
        loadComponent: () =>
          import('./components/popups-page').then((m) => m.PopupsPageComponent),
      },
      {
        path: 'components/routes',
        title: 'Routes',
        loadComponent: () =>
          import('./components/routes-page').then((m) => m.RoutesPageComponent),
      },
      {
        path: 'components/arcs',
        title: 'Arcs',
        loadComponent: () =>
          import('./components/arcs-page').then((m) => m.ArcsPageComponent),
      },
      {
        path: 'components/geojson',
        title: 'GeoJSON',
        loadComponent: () =>
          import('./components/geojson-page').then((m) => m.GeojsonPageComponent),
      },
      {
        path: 'components/clusters',
        title: 'Clusters',
        loadComponent: () =>
          import('./components/clusters-page').then((m) => m.ClustersPageComponent),
      },
      {
        path: 'components/advanced',
        title: 'Advanced',
        loadComponent: () =>
          import('./components/advanced-page').then((m) => m.AdvancedPageComponent),
      },
    ],
  },
];
