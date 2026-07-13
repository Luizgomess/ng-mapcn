import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsSidebarComponent } from './docs-sidebar';
import { DocsTocComponent, TocHeading } from './docs-toc';

@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [RouterOutlet, DocsSidebarComponent, DocsTocComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="container grid gap-10 py-10 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_200px]"
    >
      <aside class="hidden lg:block">
        <div class="sticky top-24">
          <app-docs-sidebar />
        </div>
      </aside>

      <main class="min-w-0" #main>
        <router-outlet (activate)="onActivate()" />
      </main>

      <aside class="hidden xl:block">
        <div class="sticky top-24">
          <app-docs-toc [headings]="headings()" />
        </div>
      </aside>
    </div>
  `,
})
export class DocsLayoutComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly headings = signal<TocHeading[]>([]);

  onActivate(): void {
    // Page component just rendered; collect its h2[id] anchors for the TOC.
    setTimeout(() => {
      const nodes =
        this.host.nativeElement.querySelectorAll<HTMLElement>('main h2[id]');
      this.headings.set(
        Array.from(nodes).map((node) => ({
          id: node.id,
          text: node.textContent?.trim() ?? '',
        }))
      );
    });
  }
}
