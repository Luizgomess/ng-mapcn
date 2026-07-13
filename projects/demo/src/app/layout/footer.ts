import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t">
      <div class="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-3">
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
          <p class="text-muted-foreground max-w-xs text-sm">
            Free &amp; open-source, ready-to-use, customizable map components
            for Angular.
          </p>
          <p class="text-muted-foreground text-sm">
            Angular port of
            <a
              href="https://mapcn.dev"
              target="_blank"
              rel="noreferrer"
              class="hover:text-foreground underline underline-offset-4"
              >mapcn</a
            >
          </p>
        </div>

        <div class="space-y-3">
          <div class="text-sm font-medium">Product</div>
          <ul class="text-muted-foreground space-y-2 text-sm">
            <li>
              <a routerLink="/docs" class="hover:text-foreground transition-colors"
                >Documentation</a
              >
            </li>
            <li>
              <a
                routerLink="/docs/components/map"
                class="hover:text-foreground transition-colors"
                >Components</a
              >
            </li>
            <li>
              <a
                routerLink="/docs/api-reference"
                class="hover:text-foreground transition-colors"
                >API Reference</a
              >
            </li>
            <li>
              <a
                routerLink="/credits"
                class="hover:text-foreground transition-colors"
                >Credits</a
              >
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <div class="text-sm font-medium">Community</div>
          <ul class="text-muted-foreground space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/juanvieiraprado99/ng-mapcn"
                target="_blank"
                rel="noreferrer"
                class="hover:text-foreground transition-colors"
                >GitHub</a
              >
            </li>
            <li>
              <a
                href="https://github.com/juanvieiraprado99/ng-mapcn/issues"
                target="_blank"
                rel="noreferrer"
                class="hover:text-foreground transition-colors"
                >Issues</a
              >
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <div class="text-sm font-medium">Resources</div>
          <ul class="text-muted-foreground space-y-2 text-sm">
            <li>
              <a
                href="https://maplibre.org"
                target="_blank"
                rel="noreferrer"
                class="hover:text-foreground transition-colors"
                >MapLibre GL</a
              >
            </li>
            <li>
              <a
                href="https://mapcn.dev"
                target="_blank"
                rel="noreferrer"
                class="hover:text-foreground transition-colors"
                >mapcn</a
              >
            </li>
            <li>
              <a
                href="https://zardui.com"
                target="_blank"
                rel="noreferrer"
                class="hover:text-foreground transition-colors"
                >Zard UI</a
              >
            </li>
            <li>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                class="hover:text-foreground transition-colors"
                >Tailwind CSS</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
