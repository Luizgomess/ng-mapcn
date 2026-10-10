import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { filter } from 'rxjs';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardSheetImports } from '@/shared/components/sheet';
import { siteNavigation } from '@/shared/site-navigation';
import { LogoComponent } from './logo';

/** mapcn `MobileNav`: left sheet with every page, shown below `lg`. */
@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, NgIcon, ZardButtonComponent, ZardSheetImports, LogoComponent],
  viewProviders: [provideIcons({ lucideMenu })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <button
      z-button
      zType="ghost"
      zSize="icon"
      type="button"
      aria-label="Open docs menu"
      class="shrink-0 lg:hidden"
      (click)="open.set(true)"
    >
      <ng-icon name="lucideMenu" size="20" />
    </button>

    <z-sheet [(zVisible)]="open" zSide="left" class="rounded-r-xl">
      <z-sheet-header>
        <z-sheet-title>
          <app-logo [isLink]="false" />
        </z-sheet-title>
      </z-sheet-header>
      <div class="overflow-y-auto px-2">
        <nav class="space-y-6">
          @for (group of groups; track group.title) {
            <div>
              <h3 class="text-muted-foreground mb-2 px-2 text-sm font-medium">{{ group.title }}</h3>
              <ul>
                @for (item of group.items; track item.href) {
                  <li>
                    <a
                      [routerLink]="item.href"
                      class="active:text-muted-foreground flex items-center px-3 py-2 text-lg"
                      >{{ item.title }}</a
                    >
                  </li>
                }
              </ul>
            </div>
          }
        </nav>
      </div>
    </z-sheet>
  `,
})
export class MobileNavComponent {
  protected readonly open = signal(false);
  protected readonly groups = siteNavigation;

  constructor() {
    // The overlay disposes itself on navigation; keep the model in sync so the
    // next tap opens it again.
    const sub = inject(Router)
      .events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.open.set(false));
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }
}
