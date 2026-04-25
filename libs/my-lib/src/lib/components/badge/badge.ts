import { Component, computed, input } from '@angular/core';

export type BadgeVariant =
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'default';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  success:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  warning:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  default: 'bg-surface-alt text-muted',
};

@Component({
  selector: 'lib-badge',
  standalone: true,
  template: `
    <span [class]="classes()">
      {{ label() }}
    </span>
  `,
})
export class LibBadge {
  readonly label = input.required<string>();
  readonly variant = input<BadgeVariant>('default');

  protected readonly classes = computed(
    () =>
      `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${VARIANT_CLASSES[this.variant()]}`,
  );
}
