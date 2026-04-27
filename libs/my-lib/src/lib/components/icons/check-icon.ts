import { Component, input } from '@angular/core';
import { BaseIconComponent } from './base-icon';

@Component({
  selector: 'lib-check-icon',
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
        d="M2.66663 8.00001L5.33329 10.6667L11.3333 4.66667"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class CheckIconComponent extends BaseIconComponent {
  override readonly width = input<string>('1rem');
  override readonly height = input<string>('1rem');
  override readonly viewBox = input<string>('0 0 16 16');
  override readonly fill = input<string>('none');
}
