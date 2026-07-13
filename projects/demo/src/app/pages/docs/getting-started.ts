import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsPageComponent } from '../../shared/docs-page';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [DocsPageComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-page
      title="Introduction"
      description="Copy-paste map components for Angular."
    >
      <p class="mb-10 text-sm leading-relaxed">
        ng-mapcn provides beautifully designed, accessible, and customizable
        map components. It is an Angular port of
        <a
          href="https://mapcn.dev"
          target="_blank"
          rel="noreferrer"
          class="underline underline-offset-4"
          >mapcn</a
        >, built on
        <a
          href="https://maplibre.org"
          target="_blank"
          rel="noreferrer"
          class="underline underline-offset-4"
          >MapLibre GL</a
        >
        and designed to feel native to modern Angular: standalone components,
        signals, and zero configuration.
      </p>

      <h2 id="philosophy" class="mb-3 scroll-mt-24 text-xl font-semibold">
        Philosophy
      </h2>
      <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
        ng-mapcn follows the shadcn model for maps: components you can own,
        with zero lock-in and sensible defaults that work immediately.
      </p>
      <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
        Maps are often treated as black boxes hidden behind wrapper libraries
        and configuration-heavy SDKs. ng-mapcn takes a different approach. It
        stays close to MapLibre, keeps the API familiar, and lets you drop down
        to the raw map instance whenever you need more control.
      </p>
      <p class="text-muted-foreground mb-10 text-sm leading-relaxed">
        The goal is simple: make maps feel like the rest of your UI stack —
        composable, themeable, accessible, and easy to customize.
      </p>

      <h2 id="why-ng-mapcn" class="mb-3 scroll-mt-24 text-xl font-semibold">
        Why ng-mapcn?
      </h2>
      <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
        Most Angular map setups are either too opinionated or too heavy.
        ng-mapcn is built for teams that want to ship quickly without giving up
        control:
      </p>
      <ul class="text-muted-foreground mb-10 list-disc space-y-2 pl-5 text-sm leading-relaxed">
        <li>
          <span class="text-foreground font-medium">Own Your Code:</span>
          install via schematics and copy the components into your project — or
          use the npm package.
        </li>
        <li>
          <span class="text-foreground font-medium">Start Fast:</span> run one
          command and render your first map with production-ready defaults.
        </li>
        <li>
          <span class="text-foreground font-medium">Scale Safely:</span> build
          on top of MapLibre directly, then drop to raw APIs when needed.
        </li>
        <li>
          <span class="text-foreground font-medium">Angular Native:</span>
          standalone components, signal inputs/outputs, and OnPush change
          detection throughout.
        </li>
      </ul>

      <h2 id="any-map-style" class="mb-3 scroll-mt-24 text-xl font-semibold">
        Any Map Style
      </h2>
      <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
        ng-mapcn works with any MapLibre-compatible tiles — set them per map
        with the
        <code class="bg-muted rounded px-1.5 py-0.5 text-xs">styles</code>
        input, or app-wide with
        <code class="bg-muted rounded px-1.5 py-0.5 text-xs">provideMapStyles()</code>.
        There is a working example for each provider on the
        <a routerLink="/docs/basemaps" class="underline underline-offset-4"
          >Map Styles</a
        >
        page (and the basemap picker in the header switches this whole site
        live):
      </p>
      <ul class="text-muted-foreground mb-10 list-disc space-y-2 pl-5 text-sm leading-relaxed">
        <li>
          <span class="text-foreground font-medium">Carto</span> — clean, minimal
          basemaps perfect for data visualization. The default; no API key.
        </li>
        <li>
          <span class="text-foreground font-medium">OpenFreeMap</span> — free
          vector tiles from OpenStreetMap data. No key, no request limits.
        </li>
        <li>
          <span class="text-foreground font-medium">OpenStreetMap</span> —
          community-driven map data. Serves raster tiles rather than a hosted
          <code class="bg-muted rounded px-1.5 py-0.5 text-xs">style.json</code>,
          so the style is written by hand (dev/demo use only, per the OSM tile
          usage policy).
        </li>
        <li>
          <span class="text-foreground font-medium">MapTiler</span> — beautiful
          vector tiles with extensive customization. Requires an API key.
        </li>
        <li>
          <span class="text-foreground font-medium">Stadia Maps</span> — fast,
          reliable tile hosting with multiple styles. Keyless on
          <code class="bg-muted rounded px-1.5 py-0.5 text-xs">localhost</code>;
          API key or domain auth in production.
        </li>
        <li>
          And any other provider that supports the MapLibre style spec
        </li>
      </ul>

      <h2 id="features" class="mb-3 scroll-mt-24 text-xl font-semibold">
        Features
      </h2>
      <div class="mb-10 grid gap-4 sm:grid-cols-2">
        @for (feature of features; track feature.title) {
          <div class="bg-card rounded-lg border p-4">
            <div class="mb-1 text-sm font-medium">{{ feature.title }}</div>
            <div class="text-muted-foreground text-sm">
              {{ feature.description }}
            </div>
          </div>
        }
      </div>

      <div class="flex justify-end border-t pt-6">
        <a
          routerLink="/docs/installation"
          class="hover:bg-accent rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          >Installation →</a
        >
      </div>
    </app-docs-page>
  `,
})
export class GettingStartedComponent {
  readonly features = [
    {
      title: '⚡ Zero Config',
      description: 'Works out of the box with free map tiles. No API keys needed.',
    },
    {
      title: '🌗 Theme Aware',
      description: 'Automatically switches between light and dark map styles.',
    },
    {
      title: '🧩 Composable',
      description: 'Build complex UIs with simple, composable components.',
    },
    {
      title: '🛡️ TypeScript',
      description: 'Full type safety with comprehensive TypeScript support.',
    },
    {
      title: '📋 Copy & Paste',
      description: 'Own your code. Use schematics to copy the source into your project.',
    },
    {
      title: '🗺️ Any Map Style',
      description: 'Use any MapLibre-compatible tiles: MapTiler, Carto, OpenStreetMap, and more.',
    },
  ];
}
