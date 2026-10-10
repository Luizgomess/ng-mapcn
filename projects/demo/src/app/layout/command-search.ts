import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowDown,
  lucideArrowUp,
  lucideBookOpen,
  lucideCornerDownLeft,
  lucideCornerDownRight,
  lucideFileText,
  lucideLayers2,
  lucideSearch,
} from '@ng-icons/lucide';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCommandImports, type ZardCommandOption } from '@/shared/components/command';
import { ZardDialogImports } from '@/shared/components/dialog';
import { ZardKbdComponent } from '@/shared/components/kbd';
import { siteNavigation } from '@/shared/site-navigation';

/** mapcn `CommandSearch`: ⌘K / Ctrl+K palette over every page of the site. */
@Component({
  selector: 'app-command-search',
  standalone: true,
  imports: [NgIcon, ZardButtonComponent, ZardKbdComponent, ZardCommandImports, ZardDialogImports],
  viewProviders: [
    provideIcons({
      lucideArrowDown,
      lucideArrowUp,
      lucideBookOpen,
      lucideCornerDownLeft,
      lucideCornerDownRight,
      lucideFileText,
      lucideLayers2,
      lucideSearch,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'contents',
    '(document:keydown)': 'onKeydown($event)',
  },
  template: `
    <button
      z-button
      zType="outline"
      zSize="sm"
      type="button"
      aria-label="Jump to pages, components, and docs"
      class="text-muted-foreground hover:text-foreground mr-2.5 hidden w-48 justify-start bg-transparent font-normal md:flex dark:bg-transparent"
      (click)="open.set(true)"
    >
      <ng-icon name="lucideSearch" size="14" />
      <span>Search...</span>
      <kbd z-kbd class="text-muted-foreground/70 ml-auto bg-transparent">⌘K</kbd>
    </button>

    <z-dialog
      [(zVisible)]="open"
      [zClosable]="false"
      class="gap-0 overflow-hidden p-0 sm:max-w-lg"
    >
      <z-dialog-title class="sr-only">Search...</z-dialog-title>
      <z-dialog-description class="sr-only">Jump to pages, components, and docs</z-dialog-description>
      <z-command
        #command="zCommand"
        class="rounded-none border-0 shadow-none"
        (zCommandSelected)="select($event)"
      >
        <z-command-input placeholder="Search..." />
        <z-command-list class="max-h-[300px]">
          @if (command.isEmpty()) {
            <div class="text-muted-foreground flex flex-col items-center gap-1.5 py-8 text-sm">
              <ng-icon name="lucideFileText" size="20" class="opacity-40" />
              <span>No results found</span>
            </div>
          }
          @for (group of groups; track group.title) {
            <z-command-option-group [zLabel]="group.title">
              @for (item of group.items; track item.href) {
                <z-command-option [zValue]="item.href" [zLabel]="item.title" [zIcon]="item.icon" />
              }
            </z-command-option-group>
          }
        </z-command-list>
      </z-command>
      <div class="text-muted-foreground/80 flex items-center justify-between border-t p-3 text-xs">
        <div class="flex items-center gap-2.5">
          <span class="flex items-center gap-1.5">
            <kbd z-kbd><ng-icon name="lucideArrowUp" size="12" /></kbd>
            <kbd z-kbd><ng-icon name="lucideArrowDown" size="12" /></kbd>
            <span>navigate</span>
          </span>
          <span class="flex items-center gap-1.5">
            <kbd z-kbd><ng-icon name="lucideCornerDownLeft" size="12" /></kbd>
            <span>select</span>
          </span>
        </div>
        <span class="flex items-baseline gap-1.5">
          <kbd z-kbd>esc</kbd>
          <span>close</span>
        </span>
      </div>
    </z-dialog>
  `,
})
export class CommandSearchComponent {
  private readonly router = inject(Router);

  protected readonly open = signal(false);
  protected readonly groups = siteNavigation;

  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.open.update((open) => !open);
    }
  }

  protected select(option: ZardCommandOption): void {
    this.open.set(false);
    void this.router.navigateByUrl(String(option.value));
  }
}
