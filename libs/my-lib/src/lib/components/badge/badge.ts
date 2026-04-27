import { Component, computed, input } from '@angular/core';

export type BadgeVariant =
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'default';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  success: 'bg-green-500 text-white dark:bg-green-600',
  danger: 'bg-red-500 text-white dark:bg-red-600',
  warning: 'bg-amber-400 text-white dark:bg-amber-500',
  info: 'bg-blue-500 text-white dark:bg-blue-600',
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
      `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${VARIANT_CLASSES[this.variant()]}`,
  );
}
