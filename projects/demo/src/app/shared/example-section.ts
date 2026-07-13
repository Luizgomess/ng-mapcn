import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CodeBlockComponent } from './code-block';
import type { CodeLang } from './highlighter';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';

@Component({
  selector: 'app-example-section',
  standalone: true,
  imports: [CodeBlockComponent, ZardTabGroupComponent, ZardTabComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-12">
      <h2 class="mb-2 scroll-mt-24 text-xl font-semibold" [id]="sectionId()">
        {{ title() }}
      </h2>
      <div class="text-muted-foreground mb-4 text-sm leading-relaxed">
        <ng-content select="[description]" />
      </div>
      <z-tab-group>
        <z-tab label="Preview">
          <div class="mt-4 h-[420px] overflow-hidden rounded-xl border">
            <ng-content />
          </div>
        </z-tab>
        @if (code()) {
          <z-tab label="Code">
            <app-code-block
              class="mt-4 block"
              [code]="code()"
              [lang]="lang()"
              [collapsible]="false"
            />
          </z-tab>
        }
      </z-tab-group>
    </section>
  `,
})
export class ExampleSectionComponent {
  readonly title = input.required<string>();
  readonly sectionId = input.required<string>();
  readonly code = input('');
  /** Defaults to a guess based on the snippet (see `detectLang`). */
  readonly lang = input<CodeLang>();
}
