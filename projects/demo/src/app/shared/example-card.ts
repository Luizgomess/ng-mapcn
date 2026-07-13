import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cardVariants } from '@/shared/components/card';
import { mergeClasses } from '@/shared/utils/merge-classes';

@Component({
  selector: 'app-example-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[style.--stagger]': 'stagger()',
  },
  template: `<ng-content />`,
})
export class ExampleCardComponent {
  readonly stagger = input(5);

  protected readonly classes = computed(() =>
    mergeClasses(
      cardVariants(),
      'relative block gap-0 overflow-hidden py-0 animate-scale-in animate-stagger',
    ),
  );
}
