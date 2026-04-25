import { Component, input } from '@angular/core';
import { BaseIconComponent } from './base-icon';

@Component({
  selector: 'lib-view-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width()"
      [attr.height]="height()"
      [attr.viewBox]="viewBox()"
      [attr.fill]="fill()"
      [class]="iconClass()"
    >
      <path
        d="M10.39 8a2.39 2.39 0 1 1-4.78 0 2.39 2.39 0 0 1 4.78 0Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 13.51c2.35 0 4.55-1.39 6.07-3.79a2.65 2.65 0 0 0 0-3.46C12.55 3.86 10.35 2.48 8 2.48S3.45 3.86 1.93 6.26a2.65 2.65 0 0 0 0 3.46C3.45 12.12 5.65 13.51 8 13.51Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class ViewIconComponent extends BaseIconComponent {
  override readonly width = input<string>('0.875rem');
  override readonly height = input<string>('0.875rem');
  override readonly viewBox = input<string>('0 0 16 16');
  override readonly fill = input<string>('none');
}
