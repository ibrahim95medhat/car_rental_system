import { Component, input } from '@angular/core';
import { BaseIconComponent } from './base-icon';

@Component({
  selector: 'lib-chevron-up-icon',
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
        d="M1.3996 7.53906L6.83294 2.10573C7.47461 1.46406 8.52461 1.46406 9.16628 2.10573L14.5996 7.53906"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class ChevronUpIconComponent extends BaseIconComponent {
  override readonly width = input<string>('1rem');
  override readonly height = input<string>('0.5625rem');
  override readonly viewBox = input<string>('0 0 16 9');
  override readonly fill = input<string>('none');
}
