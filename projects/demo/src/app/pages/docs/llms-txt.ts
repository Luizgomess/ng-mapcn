import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ZardButtonComponent } from '@/shared/components/button';
import { DocsPageComponent } from '../../shared/docs-page';

interface LlmsFile {
  readonly title: string;
  readonly path: string;
  readonly description: string;
}

const FILES: LlmsFile[] = [
  {
    title: 'llms.txt',
    path: '/llms.txt',
    description:
      'The index: what ng-mapcn is, how to install it, the component list, basemap providers and theming — in a few kB of plain markdown.',
  },
  {
    title: 'llms-full.txt',
    path: '/llms-full.txt',
    description:
      'The whole API in one file: every component with its inputs, outputs and defaults, plus MapContextService, provideMapStyles(), SSR notes and the library invariants. No links to follow.',
  },
];

const USAGE_CODE = `# Point your agent straight at the file
curl https://ng-mapcn.vercel.app/llms.txt

# Or paste it into the chat — llms-full.txt is the one that
# contains every input, output and default.
curl https://ng-mapcn.vercel.app/llms-full.txt`;

@Component({
  selector: 'app-llms-txt',
  standalone: true,
  imports: [DocsPageComponent, CodeBlockComponent, ZardButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-page
      title="llms.txt"
      description="Machine-readable docs, so an LLM can use ng-mapcn without scraping this site."
    >
      <p class="text-muted-foreground mb-8 text-sm leading-relaxed">
        <a
          href="https://llmstxt.org"
          target="_blank"
          rel="noreferrer"
          class="underline underline-offset-4"
          >llms.txt</a
        >
        is a convention: a plain-markdown file at the root of a site that gives a
        language model the whole picture in one fetch. ng-mapcn ships two of
        them, generated from the same data that renders the
        <code class="bg-muted rounded px-1.5 py-0.5 text-xs">API Reference</code>
        page — so they never drift from the real API.
      </p>

      <div class="mb-10 grid gap-4 sm:grid-cols-2">
        @for (file of files; track file.path) {
          <div class="bg-card flex flex-col gap-3 rounded-lg border p-5">
            <code class="text-sm font-medium">{{ file.title }}</code>
            <p class="text-muted-foreground flex-1 text-sm leading-relaxed">
              {{ file.description }}
            </p>
            <div class="flex items-center gap-2">
              <a
                z-button
                zType="outline"
                zSize="sm"
                [href]="file.path"
                target="_blank"
                rel="noreferrer"
                >Open raw</a
              >
              <button
                z-button
                zType="ghost"
                zSize="sm"
                type="button"
                (click)="copy(file.path)"
              >
                {{ copied() === file.path ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>
        }
      </div>

      <h2 id="usage" class="mb-3 scroll-mt-24 text-xl font-semibold">Usage</h2>
      <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
        Feed the file to your coding agent (Claude Code, Cursor, Copilot) and it
        can write ng-mapcn code without guessing at inputs or defaults.
      </p>
      <app-code-block [code]="usageCode" [collapsible]="false" lang="bash" />
    </app-docs-page>
  `,
})
export class LlmsTxtComponent {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly files = FILES;
  readonly usageCode = USAGE_CODE;
  readonly copied = signal<string | null>(null);

  async copy(path: string): Promise<void> {
    if (!this.isBrowser) return;
    try {
      const text = await fetch(path).then((r) => r.text());
      await navigator.clipboard.writeText(text);
      this.copied.set(path);
      setTimeout(() => this.copied.set(null), 1500);
    } catch {
      // Clipboard or fetch blocked — the "Open raw" link still works.
    }
  }
}
