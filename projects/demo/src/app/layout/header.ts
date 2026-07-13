import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BasemapId, BasemapService } from '@/shared/basemap.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ThemeService } from '@/shared/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ZardButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md"
    >
      <div class="container flex h-14 items-center gap-6">
        <a routerLink="/" class="flex items-center gap-1.5 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          ng-mapcn
        </a>

        <nav class="flex items-center gap-5 text-sm">
          <a
            routerLink="/docs"
            routerLinkActive="text-foreground"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-muted-foreground hover:text-foreground transition-colors"
            >Docs</a
          >
          <a
            routerLink="/docs/components/map"
            class="text-muted-foreground hover:text-foreground transition-colors"
            >Components</a
          >
        </nav>

        <div class="ml-auto flex items-center gap-1">
          <div class="mr-2 hidden items-center gap-1.5 md:flex">
            <select
              class="bg-background text-foreground h-8 rounded-md border px-2 text-sm"
              aria-label="Basemap provider"
              [value]="basemap.providerId()"
              (change)="basemap.select($any($event.target).value)"
            >
              @for (provider of basemap.providers; track provider.id) {
                <option [value]="provider.id">{{ provider.label }}</option>
              }
            </select>

            @if (basemap.provider().needsKey) {
              <input
                type="password"
                autocomplete="off"
                spellcheck="false"
                class="bg-background text-foreground placeholder:text-muted-foreground h-8 w-44 rounded-md border px-2 text-sm"
                [placeholder]="keyPlaceholder()"
                [value]="basemap.key()"
                (input)="setKey($any($event.target).value)"
                [attr.aria-label]="basemap.provider().label + ' API key'"
                [title]="keyHint()"
              />
              @if (basemap.provider().keyUrl; as keyUrl) {
                <a
                  z-button
                  zType="ghost"
                  zSize="icon-sm"
                  [href]="keyUrl"
                  target="_blank"
                  rel="noreferrer"
                  [attr.aria-label]="'Get a ' + basemap.provider().label + ' API key'"
                  [title]="keyHint()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="size-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </a>
              }
            }
          </div>

          <a
            z-button
            zType="ghost"
            zSize="icon"
            href="https://github.com/juanvieiraprado99/ng-mapcn"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="size-4">
              <path
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
              />
            </svg>
          </a>
          <button
            z-button
            zType="ghost"
            zSize="icon"
            type="button"
            (click)="toggleTheme()"
            aria-label="Toggle theme"
          >
            @if (theme() === 'dark') {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="size-4"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
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
                class="size-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            }
          </button>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  readonly theme = this.themeService.theme;
  readonly basemap = inject(BasemapService);

  readonly keyPlaceholder = computed(() =>
    this.basemap.provider().id === 'stadia'
      ? 'API key (optional here)'
      : 'Paste API key',
  );

  /** The key never leaves the browser — it is only kept in localStorage. */
  readonly keyHint = computed(() => {
    const provider = this.basemap.provider();
    const note = provider.note ? ` ${provider.note}` : '';
    return `${provider.label} API key — stored only in your browser (localStorage).${note}`;
  });

  setKey(key: string): void {
    this.basemap.setKey(this.basemap.provider().id as BasemapId, key);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
