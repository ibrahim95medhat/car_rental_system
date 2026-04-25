import { Component, input } from '@angular/core';
import { BaseIconComponent } from './base-icon';

@Component({
  selector: 'lib-chevron-down-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width()"
      [attr.height]="height()"
      [attr.viewBox]="viewBox()"
      [attr.fill]="fill()"
      [style.color]="color()"
      [class]="iconClass()"
    >
      <path
        d="M14.6004 1.46094L9.16706 6.89427C8.52539 7.53594 7.47539 7.53594 6.83372 6.89427L1.40039 1.46094"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class ChevronDownIconComponent extends BaseIconComponent {
  override readonly width = input<string>('1rem');
  override readonly height = input<string>('0.5625rem');
  override readonly viewBox = input<string>('0 0 16 9');
  override readonly fill = input<string>('none');
}
