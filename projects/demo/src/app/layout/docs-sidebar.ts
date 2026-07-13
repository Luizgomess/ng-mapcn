import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-docs-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="space-y-6">
      @for (group of groups; track group.label) {
        <div>
          <div class="mb-2 text-xs font-semibold tracking-wide">
            {{ group.label }}
          </div>
          <ul class="space-y-0.5">
            @for (item of group.items; track item.path) {
              <li>
                <a
                  [routerLink]="item.path"
                  routerLinkActive="bg-accent text-foreground"
                  [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
                  class="text-muted-foreground hover:text-foreground block rounded-md px-2 py-1.5 text-sm transition-colors"
                  >{{ item.label }}</a
                >
              </li>
            }
          </ul>
        </div>
      }
    </nav>
  `,
})
export class DocsSidebarComponent {
  readonly groups: NavGroup[] = [
    {
      label: 'Basics',
      items: [
        { label: 'Getting Started', path: '/docs', exact: true },
        { label: 'Installation', path: '/docs/installation' },
        { label: 'Map Styles', path: '/docs/basemaps' },
        { label: 'API Reference', path: '/docs/api-reference' },
        { label: 'llms.txt', path: '/docs/llms-txt' },
      ],
    },
    {
      label: 'Components',
      items: [
        { label: 'Map', path: '/docs/components/map' },
        { label: 'Controls', path: '/docs/components/controls' },
        { label: 'Markers', path: '/docs/components/markers' },
        { label: 'Popups', path: '/docs/components/popups' },
        { label: 'Routes', path: '/docs/components/routes' },
        { label: 'Arcs', path: '/docs/components/arcs' },
        { label: 'GeoJSON', path: '/docs/components/geojson' },
        { label: 'Clusters', path: '/docs/components/clusters' },
        { label: 'Advanced', path: '/docs/components/advanced' },
      ],
    },
  ];
}
