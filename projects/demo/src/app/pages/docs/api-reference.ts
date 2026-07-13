import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { DocsPageComponent } from '../../shared/docs-page';
import { PropRow, PropTableComponent } from '../../shared/prop-table';
// Single source of truth: `scripts/generate-llms-txt.mjs` reads this same file
// to build /llms.txt and /llms-full.txt.
import apiData from './api-reference.data.json';

interface ApiSection {
  id: string;
  title: string;
  selector: string;
  description: string;
  inputs: PropRow[];
  outputs: PropRow[];
}

@Component({
  selector: 'app-api-reference',
  standalone: true,
  imports: [DocsPageComponent, PropTableComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-page
      title="API Reference"
      description="Complete reference for all map components and their inputs and outputs."
    >
      <h2 id="component-anatomy" class="mb-3 scroll-mt-24 text-xl font-semibold">
        Component Anatomy
      </h2>
      <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
        All parts of the component set you can use and combine to build your
        map:
      </p>
      <div class="mb-12">
        <app-code-block [code]="anatomyCode" />
      </div>

      @for (section of sections; track section.id) {
        <section class="mb-12">
          <h2
            [id]="section.id"
            class="mb-1 scroll-mt-24 text-xl font-semibold"
          >
            {{ section.title }}
          </h2>
          <div class="mb-3">
            <code class="bg-muted rounded px-1.5 py-0.5 text-xs">{{
              section.selector
            }}</code>
          </div>
          <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
            {{ section.description }}
          </p>
          @if (section.inputs.length > 0) {
            <div class="mb-2 text-sm font-medium">Inputs</div>
            <app-prop-table [rows]="section.inputs" />
          }
          @if (section.outputs.length > 0) {
            <div class="mb-2 text-sm font-medium">Outputs</div>
            <app-prop-table [rows]="section.outputs" />
          }
        </section>
      }

      <section class="mb-12">
        <h2
          id="mapcontextservice"
          class="mb-1 scroll-mt-24 text-xl font-semibold"
        >
          MapContextService
        </h2>
        <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
          Component-scoped service provided by ng-map — the Angular equivalent
          of mapcn's useMap() hook. Inject it in any component projected inside
          ng-map to access the raw map.
        </p>
        <app-prop-table [rows]="contextRows" />
      </section>

      <section class="mb-12">
        <h2 id="providemapstyles" class="mb-1 scroll-mt-24 text-xl font-semibold">
          provideMapStyles()
        </h2>
        <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
          Sets the app-wide default basemap through the MAP_DEFAULT_STYLES
          token. Every ng-map without its own styles input (and without blank)
          uses it; pass a signal to swap the basemap at runtime. Precedence:
          styles → blank → provideMapStyles() → Carto default.
        </p>
        <div class="mb-4">
          <app-code-block [code]="provideStylesCode" />
        </div>
        <app-prop-table [rows]="provideStylesRows" />
      </section>
    </app-docs-page>
  `,
})
export class ApiReferenceComponent {
  readonly anatomyCode = apiData.anatomyCode;
  readonly provideStylesCode = apiData.provideStylesCode;

  readonly provideStylesRows: PropRow[] = apiData.provideStylesRows;
  readonly contextRows: PropRow[] = apiData.contextRows;
  readonly sections: ApiSection[] = apiData.sections;
}
