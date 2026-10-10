import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';
import { BasemapId, BasemapService } from '@/shared/basemap.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputComponent } from '@/shared/components/input';
import { ZardSelectImports } from '@/shared/components/select';

/**
 * Basemap provider switcher — an ng-mapcn demo extra (mapcn has none), styled
 * with the same small controls as the rest of the header.
 */
@Component({
  selector: 'app-basemap-picker',
  standalone: true,
  imports: [NgIcon, ZardButtonComponent, ZardInputComponent, ZardSelectImports],
  viewProviders: [provideIcons({ lucideInfo })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-1.5">
      <z-select
        class="w-40"
        [zValue]="basemap.providerId()"
        (zSelectionChange)="select($event)"
      >
        @for (provider of basemap.providers; track provider.id) {
          <z-select-item [zValue]="provider.id">{{ provider.label }}</z-select-item>
        }
      </z-select>

      @if (basemap.provider().needsKey) {
        <input
          z-input
          type="password"
          autocomplete="off"
          spellcheck="false"
          class="w-44"
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
            rel="noopener noreferrer"
            [attr.aria-label]="'Get a ' + basemap.provider().label + ' API key'"
            [title]="keyHint()"
          >
            <ng-icon name="lucideInfo" size="16" />
          </a>
        }
      }
    </div>
  `,
})
export class BasemapPickerComponent {
  protected readonly basemap = inject(BasemapService);

  protected readonly keyPlaceholder = computed(() =>
    this.basemap.provider().id === 'stadia' ? 'API key (optional here)' : 'Paste API key',
  );

  /** The key never leaves the browser — it is only kept in localStorage. */
  protected readonly keyHint = computed(() => {
    const provider = this.basemap.provider();
    const note = provider.note ? ` ${provider.note}` : '';
    return `${provider.label} API key — stored only in your browser (localStorage).${note}`;
  });

  protected select(value: string | string[]): void {
    if (typeof value === 'string') this.basemap.select(value as BasemapId);
  }

  protected setKey(key: string): void {
    this.basemap.setKey(this.basemap.provider().id, key);
  }
}
