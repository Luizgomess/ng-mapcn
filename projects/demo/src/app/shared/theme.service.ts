import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

/** localStorage key shared with the pre-paint script in `index.html`. */
const STORAGE_KEY = 'theme';

/**
 * Site theme toggle. Deliberately a demo-local copy of the library's
 * ThemeService: importing anything from `ng-mapcn` in the app shell drags
 * maplibre-gl (CommonJS, not tree-shakeable) into the initial bundle.
 *
 * The library's own ThemeService watches the same `dark`/`light` class on
 * <html>, so the maps still follow this toggle — it just loads with the map
 * chunk instead of the shell.
 *
 * Mirrors mapcn's next-themes setup: follows the system scheme until the user
 * picks one (persisted), and the `t` key toggles it.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly themeSignal = signal<'light' | 'dark'>(this.detect());

  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    if (!this.isBrowser) return;

    const observer = new MutationObserver(() => this.themeSignal.set(this.detect()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Follow the OS scheme only while the user has not picked a theme.
    let mq: MediaQueryList | null = null;
    const onSchemeChange = (event: MediaQueryListEvent) => {
      if (this.stored()) return;
      this.apply(event.matches ? 'dark' : 'light');
    };
    if (window.matchMedia) {
      mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', onSchemeChange);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() !== 't' || isTypingTarget(event.target)) return;
      this.toggleTheme();
    };
    window.addEventListener('keydown', onKeyDown);

    inject(DestroyRef).onDestroy(() => {
      observer.disconnect();
      mq?.removeEventListener('change', onSchemeChange);
      window.removeEventListener('keydown', onKeyDown);
    });
  }

  setTheme(theme: 'light' | 'dark'): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    this.apply(theme);
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private apply(theme: 'light' | 'dark'): void {
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    html.classList.toggle('light', theme === 'light');
    html.style.colorScheme = theme;
    // MutationObserver picks up the class change
  }

  private stored(): 'light' | 'dark' | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  private detect(): 'light' | 'dark' {
    if (!this.isBrowser) return 'light';
    const html = document.documentElement;
    if (html.classList.contains('dark')) return 'dark';
    if (html.classList.contains('light')) return 'light';
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}
