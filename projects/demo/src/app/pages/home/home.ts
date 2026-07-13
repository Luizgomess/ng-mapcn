import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { AnalyticsExampleComponent } from './examples/analytics-example';
import { ArcExampleComponent } from './examples/arc-example';
import { DeliveryExampleComponent } from './examples/delivery-example';
import { EvChargingExampleComponent } from './examples/ev-charging-example';
import { FlytoExampleComponent } from './examples/flyto-example';
import { TrailExampleComponent } from './examples/trail-example';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ZardButtonComponent,
    AnalyticsExampleComponent,
    TrailExampleComponent,
    ArcExampleComponent,
    EvChargingExampleComponent,
    FlytoExampleComponent,
    DeliveryExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container pb-20">
      <section class="animate-fade-up py-20 text-center">
        <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
          Beautiful maps, made simple
        </h1>
        <p class="text-muted-foreground mx-auto mt-5 max-w-xl text-base sm:text-lg">
          Ready to use, customizable map components for Angular.<br />
          Built on MapLibre. Styled with Tailwind.
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <a z-button zSize="lg" routerLink="/docs">Get Started</a>
          <a z-button zType="outline" zSize="lg" routerLink="/docs/components/map"
            >View Components</a
          >
        </div>
      </section>

      <!-- Each example boots its own WebGL map. Deferring on viewport keeps the
           maplibre-gl chunk (and six map instances) out of the initial load. -->
      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @defer (on viewport) {
          <app-analytics-example />
        } @placeholder {
          <div [class]="widePlaceholder"></div>
        }

        @defer (on viewport) {
          <app-trail-example />
        } @placeholder {
          <div [class]="squarePlaceholder"></div>
        }

        @defer (on viewport) {
          <app-arc-example />
        } @placeholder {
          <div [class]="squarePlaceholder"></div>
        }

        @defer (on viewport) {
          <app-ev-charging-example />
        } @placeholder {
          <div [class]="squarePlaceholder"></div>
        }

        @defer (on viewport) {
          <app-flyto-example />
        } @placeholder {
          <div [class]="squarePlaceholder"></div>
        }

        @defer (on viewport) {
          <app-delivery-example />
        } @placeholder {
          <div [class]="widePlaceholder"></div>
        }
      </section>
    </div>
  `,
})
export class HomeComponent {
  // Same grid footprint as the cards they stand in for, so nothing shifts when
  // the real example loads.
  private readonly placeholderBase =
    'bg-muted/50 animate-pulse rounded-xl border';
  readonly squarePlaceholder = `${this.placeholderBase} aspect-square`;
  readonly widePlaceholder = `${this.placeholderBase} aspect-square sm:col-span-2 sm:aspect-video lg:aspect-auto`;
}
