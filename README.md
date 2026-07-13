# ng-mapcn

Beautiful maps for Angular, made simple. An Angular port of [mapcn](https://mapcn.dev) — composable MapLibre GL components in the spirit of shadcn/ui.

- **MapLibre GL JS v5** under the hood — no API keys required (Carto basemaps)
- **Theme-aware** — follows the `dark`/`light` class on `<html>` (or `prefers-color-scheme`) and swaps the basemap at runtime
- **Composable** — declare markers, popups, routes, GeoJSON, arcs and clusters as children of `<ng-map>`
- **Signals-first** — standalone components, signal inputs/outputs, `effect()`-based reconciliation
- **Copy-paste distribution** — `ng add ng-mapcn` copies the sources into your project so you own the code (shadcn-style). Also usable as a regular npm package.

## Installation

### Copy-paste (recommended, shadcn-style)

```bash
ng add ng-mapcn
```

This will:

1. Add `maplibre-gl` to your dependencies
2. Register `maplibre-gl/dist/maplibre-gl.css` in `angular.json`
3. Append the required `.maplibregl-popup-*` CSS overrides to your global stylesheet
4. Copy the component sources to `src/app/components/ui/map` (customize with `--path`)

Import from the copied barrel:

```ts
import { MapComponent, MapMarkerComponent } from './components/ui/map';
```

### npm package

```bash
npm install ng-mapcn maplibre-gl
```

Then in your global `styles.scss`:

```scss
// theme tokens + component utility classes
@use 'ng-mapcn/src/lib/styles/index' as *;
// required .maplibregl-popup-* overrides
@use 'ng-mapcn/styles.scss' as *;
// MapLibre base CSS
@import 'maplibre-gl/dist/maplibre-gl.css';
```

The popup overrides are **required** — MapLibre injects its own popup chrome, which must be neutralized so the styled content shows cleanly:

```css
.maplibregl-popup-content {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
}
.maplibregl-popup-tip {
  display: none !important;
}
```

## Quick start

```html
<ng-map [center]="[-46.63, -23.55]" [zoom]="10">
  <ng-map-controls position="bottom-right" [showZoom]="true" [showCompass]="true" />

  <ng-map-marker [longitude]="-46.63" [latitude]="-23.55" [draggable]="true">
    <ng-marker-content>
      <!-- empty = default blue dot; or project any custom HTML -->
    </ng-marker-content>
    <ng-marker-popup><strong>São Paulo</strong></ng-marker-popup>
    <ng-marker-tooltip>Olá!</ng-marker-tooltip>
  </ng-map-marker>

  <ng-map-route [coordinates]="lineCoords" color="#4285F4" [width]="3" />
</ng-map>
```

## Components

| Component | Description |
|---|---|
| `ng-map` | Map host. Inputs: `center`, `zoom`, `theme` (`light`/`dark`/`auto`), `styles` (per-theme basemap), `blank` (tile-less dataviz style), `projection`, `viewport` (controlled mode), `loading`, `options` (raw MapLibre `MapOptions`). Outputs: `viewportChange`, `mapReady`, `mapClick`, `mapError`. |
| `ng-map-controls` | Zoom / compass / locate / fullscreen buttons (custom UI, not MapLibre `IControl`). |
| `ng-map-marker` | Declarative marker. `longitude`, `latitude`, `draggable`, `offset`, `rotation`, `anchor`, alignments; click/hover/drag outputs. |
| `ng-marker-content` | Projects custom HTML into the marker element (empty = default dot). |
| `ng-marker-popup` / `ng-marker-tooltip` / `ng-marker-label` | Popup on click, tooltip on hover, CSS label above/below the marker. |
| `ng-map-popup` | Standalone popup at a lng/lat (no marker). |
| `ng-map-route` | LineString layer with color/width/opacity/dashArray and click output. |
| `ng-map-geojson` | Fill + outline layers from GeoJSON data or URL. Declarative hover via `promoteId` + `fillHoverPaint` (feature-state). |
| `ng-map-arc` | Curved arcs between points (flight paths). Invisible hit layer for comfortable hover/click; `hoverPaint` via feature-state. |
| `ng-map-cluster-layer` | Clustered points with count labels, threshold-based colors/sizes and expansion-zoom on click. |

Utilities: `MapViewport`, `getViewport`, `buildArcCoordinates`, `mergeHoverPaint`, `blankMapStyle`, `defaultStyles`, and `MapContextService` (map / isLoaded / resolvedTheme signals for advanced layer work via `inject`).

## Theming

Without a `theme` input, the map watches the `dark`/`light` class on `document.documentElement` (works with any theme toggler) and falls back to `prefers-color-scheme`. Switching theme calls `map.setStyle(..., { diff: true })` and every layer component re-adds itself automatically once the style settles.

## Basemaps

Any MapLibre-compatible style works. Set it per map with `styles`, or once for the whole app with `provideMapStyles()`:

```ts
import { provideMapStyles } from 'ng-mapcn';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMapStyles({
      light: 'https://tiles.openfreemap.org/styles/positron',
      dark: 'https://tiles.openfreemap.org/styles/dark',
    }),
    // ...or pass a Signal (or a factory that injects a service) to swap the
    // basemap at runtime: provideMapStyles(() => inject(BasemapService).styles)
  ],
};
```

Precedence: `[styles]` → `[blank]` → `provideMapStyles()` → Carto default.

| Provider | Style URL | API key |
|---|---|---|
| Carto (default) | `https://basemaps.cartocdn.com/gl/{positron\|dark-matter\|voyager}-gl-style/style.json` | no |
| OpenFreeMap | `https://tiles.openfreemap.org/styles/{liberty\|bright\|positron\|dark\|fiord}` | no |
| OpenStreetMap | raster tiles `https://tile.openstreetmap.org/{z}/{x}/{y}.png` — build the `StyleSpecification` by hand; dev/demo only ([tile usage policy](https://operations.osmfoundation.org/policies/tiles/)) | no |
| MapTiler | `https://api.maptiler.com/maps/{streets-v4\|streets-v4-dark\|dataviz-v4}/style.json?key=KEY` | yes |
| Stadia Maps | `https://tiles.stadiamaps.com/styles/{alidade_smooth\|alidade_smooth_dark}.json?api_key=KEY` | keyless on `localhost` |

Live examples for each: [ng-mapcn demo → Map Styles](https://github.com/juanvieiraprado99/ng-mapcn).

## Demo

```bash
npm install
npm run build-ui-dev   # builds the lib, installs it locally and serves the demo
```

Examples: basic, markers, routes, controls, dark theme, custom style, globe fly-to, tooltips, fly-to markers, GeoJSON choropleth (hover), arcs on blank map, theme switch with layers, synced viewports.

## For LLMs

The docs site serves [`/llms.txt`](projects/demo/public/llms.txt) (index) and [`/llms-full.txt`](projects/demo/public/llms-full.txt) (every component, input, output and default in one file), following the [llmstxt.org](https://llmstxt.org) convention. Both are generated from the API reference data — run `npm run generate:llms` after changing the API.

## Credits

- **[mapcn](https://www.mapcn.dev)** ([docs](https://www.mapcn.dev/docs)) — the React + MapLibre GL library that inspired this project. ng-mapcn is an Angular port of its composition model and component API. All credit for the original design goes to its authors.
- **[Zard UI](https://zardui.com)** ([docs](https://zardui.com/docs/installation)) — the Angular component library (shadcn-style, copy-paste) used to build this project's demo & documentation site.
- **[MapLibre GL JS](https://maplibre.org)** — the rendering engine.
- **[Carto](https://carto.com)** — the default free basemaps.

## License

MIT
