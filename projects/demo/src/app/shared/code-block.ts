import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ZardButtonComponent } from '@/shared/components/button';
import type { CodeLang } from '@/shared/highlighter';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [ZardButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-muted/40 relative overflow-hidden rounded-lg border">
      <button
        z-button
        zType="outline"
        zSize="icon-sm"
        type="button"
        (click)="copy()"
        aria-label="Copy code"
        class="bg-background/60 absolute top-2 right-2 z-10 backdrop-blur"
      >
        @if (copied()) {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-3.5"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        } @else {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-3.5"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        }
      </button>

      <div
        [class.max-h-32]="collapsible() && !expanded()"
        [class.overflow-y-hidden]="collapsible() && !expanded()"
      >
        @if (html(); as highlighted) {
          <div [innerHTML]="highlighted"></div>
        } @else {
          <pre
            class="overflow-x-auto p-4 text-[13px] leading-relaxed"
          ><code>{{ code() }}</code></pre>
        }
      </div>

      @if (collapsible() && !expanded()) {
        <div
          class="from-background/95 absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t to-transparent pb-3"
        >
          <button
            z-button
            zType="outline"
            zSize="sm"
            type="button"
            (click)="expanded.set(true)"
            class="shadow-sm"
          >
            View Code
          </button>
        </div>
      }
    </div>
  `,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly collapsible = input(true);
  /** Defaults to a guess based on the snippet (see `detectLang`). */
  readonly lang = input<CodeLang>();

  readonly expanded = signal(false);
  readonly copied = signal(false);
  readonly html = signal<SafeHtml | null>(null);

  private readonly sanitizer = inject(DomSanitizer);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    // Browser-only: the server renders the plain <pre>, which is exactly what
    // the client renders before hydration — no mismatch, and the prerender
    // never waits on the highlighter's dynamic import.
    effect(() => {
      const code = this.code();
      const lang = this.lang();
      if (!this.isBrowser) return;

      void (async () => {
        const { detectLang, highlight } = await import('@/shared/highlighter');
        const highlighted = await highlight(code, lang ?? detectLang(code));
        // Shiki emits inline `style="color:…"` on every span, which Angular's
        // HTML sanitizer would strip. The snippets are static, authored here.
        this.html.set(this.sanitizer.bypassSecurityTrustHtml(highlighted));
      })();
    });
  }

  copy(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    });
  }
}
