import { Component, input } from '@angular/core';
import { DocumentIconComponent } from '../icons/index';

@Component({
  selector: 'lib-empty-state',
  standalone: true,
  imports: [DocumentIconComponent],
  template: `
    <div
      class="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-border bg-surface"
    >
      <lib-document-icon iconClass="mb-4 text-muted" />
      <p class="text-sm font-semibold text-foreground">{{ title() }}</p>
      @if (subtitle()) {
        <p class="mt-1 text-xs text-muted">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class LibEmptyState {
  readonly title = input<string>('No data available');
  readonly subtitle = input<string>('');
}
