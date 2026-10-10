import { afterNextRender, ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';
import { GITHUB_REPO_API, GITHUB_URL } from '@/shared/site-navigation';

const CACHE_KEY = 'ng-mapcn-demo:stars';

/**
 * mapcn `GitHubButton`: repo link with the live star count. mapcn fetches on
 * the server with ISR; here the count is fetched once per session in the
 * browser (the prerendered HTML ships the skeleton).
 */
@Component({
  selector: 'app-github-button',
  standalone: true,
  imports: [ZardButtonComponent, ZardSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      z-button
      zType="ghost"
      zSize="sm"
      [href]="url"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub repository"
    >
      <svg viewBox="0 0 1024 1024" fill="currentColor" class="size-4" aria-hidden="true">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
          transform="scale(64)"
        />
      </svg>
      @if (withCount()) {
        @if (stars(); as count) {
          <span class="text-muted-foreground pt-0.5 text-xs tabular-nums">{{ count }}</span>
        } @else if (loading()) {
          <z-skeleton class="block h-4 w-6 rounded" />
        }
      }
    </a>
  `,
})
export class GithubButtonComponent {
  readonly withCount = input(true);

  protected readonly url = GITHUB_URL;
  protected readonly stars = signal<string | null>(null);
  protected readonly loading = signal(true);

  constructor() {
    afterNextRender(() => {
      if (!this.withCount()) return;
      void this.loadStars();
    });
  }

  private async loadStars(): Promise<void> {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached !== null) {
        this.stars.set(cached || null);
        return;
      }
      const response = await fetch(GITHUB_REPO_API);
      if (!response.ok) throw new Error(String(response.status));
      const data = (await response.json()) as { stargazers_count?: number };
      const count = data.stargazers_count ?? 0;
      const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
      this.stars.set(formatted);
      sessionStorage.setItem(CACHE_KEY, formatted);
    } catch {
      // Rate-limited or offline: just show the icon.
      this.stars.set(null);
    } finally {
      this.loading.set(false);
    }
  }
}
