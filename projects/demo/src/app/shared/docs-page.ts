import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-docs-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="animate-fade-up">
      <h1 class="text-3xl font-bold tracking-tight">{{ title() }}</h1>
      <p class="text-muted-foreground mt-2 mb-10 text-base">
        {{ description() }}
      </p>
      <ng-content />
    </div>
  `,
})
export class DocsPageComponent {
  readonly title = input.required<string>();
  readonly description = input('');
}
