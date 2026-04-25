import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-base-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="width()"
      [attr.height]="height()"
      [attr.viewBox]="viewBox()"
      [attr.fill]="fill()"
      [style.color]="color()"
      [class]="iconClass()"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ng-content />
    </svg>
  `,
})
export class BaseIconComponent {
  readonly width = input<string>('1.5rem');
  readonly height = input<string>('1.5rem');
  readonly viewBox = input<string>('0 0 20 20');
  readonly fill = input<string>('none');
  readonly color = input<string>('currentColor');
  readonly iconClass = input<string>('');
}
