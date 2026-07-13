import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { ExampleCardComponent } from '@/shared/example-card';

interface Credit {
  readonly name: string;
  readonly role: string;
  readonly description: string;
  readonly url: string;
  readonly docsUrl?: string;
}

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [ZardBadgeComponent, ZardButtonComponent, ExampleCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container py-14">
      <h1 class="text-3xl font-semibold tracking-tight">Credits</h1>
      <p class="text-muted-foreground mt-2 max-w-2xl">
        ng-mapcn stands on the shoulders of these projects.
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-2">
        @for (credit of credits; track credit.name) {
          <app-example-card>
            <div class="flex h-full flex-col gap-3 p-6">
              <div class="flex items-center gap-2">
                <span class="font-semibold">{{ credit.name }}</span>
                <z-badge zType="secondary">{{ credit.role }}</z-badge>
              </div>

              <p class="text-muted-foreground flex-1 text-sm">
                {{ credit.description }}
              </p>

              <div class="flex items-center gap-2">
                <a
                  z-button
                  zType="outline"
                  zSize="sm"
                  [href]="credit.url"
                  target="_blank"
                  rel="noreferrer"
                  >Visit site</a
                >
                @if (credit.docsUrl) {
                  <a
                    z-button
                    zType="ghost"
                    zSize="sm"
                    [href]="credit.docsUrl"
                    target="_blank"
                    rel="noreferrer"
                    >Docs</a
                  >
                }
              </div>
            </div>
          </app-example-card>
        }
      </div>
    </section>
  `,
})
export class CreditsComponent {
  readonly credits: readonly Credit[] = [
    {
      name: 'mapcn',
      role: 'Inspiration',
      description:
        'The React + MapLibre GL library ng-mapcn is an Angular port of. Its composable API and shadcn-style copy-paste distribution are the blueprint for this library.',
      url: 'https://www.mapcn.dev',
      docsUrl: 'https://www.mapcn.dev/docs',
    },
    {
      name: 'Zard UI',
      role: 'UI kit',
      description:
        'Angular component library used to build this demo and documentation site — buttons, cards, badges, tables and tabs are all Zard components.',
      url: 'https://zardui.com',
      docsUrl: 'https://zardui.com/docs/installation',
    },
    {
      name: 'MapLibre GL JS',
      role: 'Engine',
      description:
        'The open-source rendering engine every ng-mapcn component drives under the hood.',
      url: 'https://maplibre.org',
    },
    {
      name: 'Carto',
      role: 'Basemaps',
      description:
        'The free light and dark basemaps used by default — no API key required.',
      url: 'https://carto.com',
    },
  ];
}
