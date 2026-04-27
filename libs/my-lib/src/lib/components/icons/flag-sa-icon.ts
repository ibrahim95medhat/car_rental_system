import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-flag-sa-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 20 20"
      [class]="iconClass()"
    >
      <circle cx="10" cy="10" r="10" fill="#006C35" />
      <!-- Simplified white sword (horizontal blade) -->
      <rect x="3" y="11.5" width="14" height="1.2" rx="0.6" fill="#fff" />
      <!-- Sword hilt -->
      <rect x="14.5" y="10.2" width="1.2" height="3.8" rx="0.6" fill="#fff" />
      <!-- Simplified Arabic text representation (three lines) -->
      <rect x="4" y="7" width="12" height="1" rx="0.5" fill="#fff" />
      <rect x="5" y="9" width="10" height="1" rx="0.5" fill="#fff" />
    </svg>
  `,
})
export class FlagSaIconComponent {
  readonly size = input<string>('20');
  readonly iconClass = input<string>('');
}
