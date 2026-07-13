import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ZardTableImports } from '@/shared/components/table';
import { ZardBadgeComponent } from '@/shared/components/badge';

export interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-prop-table',
  standalone: true,
  imports: [ZardTableImports, ZardBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-10 overflow-x-auto rounded-lg border">
      <table z-table class="text-left text-sm">
        <thead z-table-header>
          <tr z-table-row>
            <th z-table-head>Prop</th>
            <th z-table-head>Type</th>
            <th z-table-head>Default</th>
            <th z-table-head>Description</th>
          </tr>
        </thead>
        <tbody z-table-body>
          @for (row of rows(); track row.name) {
            <tr z-table-row class="align-top">
              <td z-table-cell>
                <z-badge zType="secondary" class="font-mono">{{ row.name }}</z-badge>
              </td>
              <td z-table-cell>
                <z-badge zType="outline" class="font-mono">{{ row.type }}</z-badge>
              </td>
              <td z-table-cell>
                @if (row.default) {
                  <z-badge zType="outline" class="font-mono">{{ row.default }}</z-badge>
                } @else {
                  <span class="text-muted-foreground text-xs">—</span>
                }
              </td>
              <td z-table-cell class="text-muted-foreground text-xs leading-relaxed">
                {{ row.description }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class PropTableComponent {
  readonly rows = input.required<PropRow[]>();
}
