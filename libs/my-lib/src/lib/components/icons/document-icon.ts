import { Component, input } from '@angular/core';
import { BaseIconComponent } from './base-icon';

@Component({
  selector: 'lib-document-icon',
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
        d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class DocumentIconComponent extends BaseIconComponent {
  override readonly width = input<string>('3rem');
  override readonly height = input<string>('3rem');
  override readonly viewBox = input<string>('0 0 24 24');
  override readonly fill = input<string>('none');
}
