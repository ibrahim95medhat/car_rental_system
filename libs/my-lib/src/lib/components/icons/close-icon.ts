import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-close-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width()"
      [attr.height]="height()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="iconClass()"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  `,
})
export class CloseIconComponent {
  readonly width = input<string>('20');
  readonly height = input<string>('20');
  readonly strokeWidth = input<string>('2');
  readonly iconClass = input<string>('');
}
