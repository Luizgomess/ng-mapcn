import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface TocHeading {
  id: string;
  text: string;
}

@Component({
  selector: 'app-docs-toc',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (headings().length > 0) {
      <div class="text-muted-foreground mb-3 text-xs tracking-wider uppercase">
        On this page
      </div>
      <ul class="space-y-2">
        @for (heading of headings(); track heading.id) {
          <li>
            <a
              [routerLink]="[]"
              [fragment]="heading.id"
              class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >{{ heading.text }}</a
            >
          </li>
        }
      </ul>
    }
  `,
})
export class DocsTocComponent {
  readonly headings = input.required<TocHeading[]>();
}
