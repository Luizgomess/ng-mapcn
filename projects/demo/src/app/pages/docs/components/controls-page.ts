import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent, MapControlsComponent } from 'ng-mapcn';
import { DocsPageComponent } from '../../../shared/docs-page';
import { ExampleSectionComponent } from '../../../shared/example-section';

const CONTROLS_CODE = `import { Component } from '@angular/core';
import { MapComponent, MapControlsComponent } from 'ng-mapcn';

@Component({
  selector: 'app-controls-map',
  standalone: true,
  imports: [MapComponent, MapControlsComponent],
  template: \`
    <div class="h-[420px]">
      <ng-map [center]="[2.3522, 48.8566]" [zoom]="12">
        <ng-map-controls
          position="top-right"
          [showZoom]="true"
          [showCompass]="true"
          [showLocate]="true"
          [showFullscreen]="true"
        />
      </ng-map>
    </div>
  \`,
})
export class ControlsMapComponent {}`;

@Component({
  selector: 'app-controls-page',
  standalone: true,
  imports: [
    DocsPageComponent,
    ExampleSectionComponent,
    MapComponent,
    MapControlsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-page
      title="Controls"
      description="Map control buttons: zoom, compass, locate, and fullscreen."
    >
      <app-example-section
        title="Basic Usage"
        sectionId="basic-usage"
        [code]="controlsCode"
      >
        <span description>
          The
          <code class="bg-muted rounded px-1.5 py-0.5 text-xs">ng-map-controls</code>
          component renders map control buttons. Choose a corner with
          <code class="bg-muted rounded px-1.5 py-0.5 text-xs">position</code>
          and toggle individual controls with the
          <code class="bg-muted rounded px-1.5 py-0.5 text-xs">show*</code>
          inputs.
        </span>
        <ng-map [center]="[2.3522, 48.8566]" [zoom]="12">
          <ng-map-controls
            position="top-right"
            [showZoom]="true"
            [showCompass]="true"
            [showLocate]="true"
            [showFullscreen]="true"
          />
        </ng-map>
      </app-example-section>
    </app-docs-page>
  `,
})
export class ControlsPageComponent {
  readonly controlsCode = CONTROLS_CODE;
}
