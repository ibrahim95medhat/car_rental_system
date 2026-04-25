import { Component, input } from '@angular/core';
import { BaseIconComponent } from './base-icon';

@Component({
  selector: 'lib-arrow-right-icon',
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
        d="M20.0237 12.9414L25.082 17.9997L20.0237 23.0581"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.9164 18H24.9414"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class ArrowRightIconComponent extends BaseIconComponent {
  override readonly width = input<string>('1rem');
  override readonly height = input<string>('1rem');
  override readonly viewBox = input<string>('11 13 14 10');
  override readonly fill = input<string>('none');
}
