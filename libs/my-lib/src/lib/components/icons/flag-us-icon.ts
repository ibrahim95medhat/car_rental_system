import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-flag-us-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 20 20"
      [class]="iconClass()"
    >
      <clipPath id="us-circle"><circle cx="10" cy="10" r="10" /></clipPath>
      <g clip-path="url(#us-circle)">
        <!-- Red base -->
        <rect width="20" height="20" fill="#B22234" />
        <!-- White stripes -->
        <rect y="1.54" width="20" height="1.54" fill="#fff" />
        <rect y="4.62" width="20" height="1.54" fill="#fff" />
        <rect y="7.69" width="20" height="1.54" fill="#fff" />
        <rect y="10.77" width="20" height="1.54" fill="#fff" />
        <rect y="13.85" width="20" height="1.54" fill="#fff" />
        <rect y="16.92" width="20" height="1.54" fill="#fff" />
        <!-- Blue canton -->
        <rect width="9" height="10.77" fill="#3C3B6E" />
        <!-- Stars (simplified dots) -->
        <g fill="#fff">
          <circle cx="1.5" cy="1.5" r="0.6" />
          <circle cx="3" cy="1.5" r="0.6" />
          <circle cx="4.5" cy="1.5" r="0.6" />
          <circle cx="6" cy="1.5" r="0.6" />
          <circle cx="7.5" cy="1.5" r="0.6" />
          <circle cx="2.25" cy="2.8" r="0.6" />
          <circle cx="3.75" cy="2.8" r="0.6" />
          <circle cx="5.25" cy="2.8" r="0.6" />
          <circle cx="6.75" cy="2.8" r="0.6" />
          <circle cx="1.5" cy="4.1" r="0.6" />
          <circle cx="3" cy="4.1" r="0.6" />
          <circle cx="4.5" cy="4.1" r="0.6" />
          <circle cx="6" cy="4.1" r="0.6" />
          <circle cx="7.5" cy="4.1" r="0.6" />
          <circle cx="2.25" cy="5.4" r="0.6" />
          <circle cx="3.75" cy="5.4" r="0.6" />
          <circle cx="5.25" cy="5.4" r="0.6" />
          <circle cx="6.75" cy="5.4" r="0.6" />
          <circle cx="1.5" cy="6.7" r="0.6" />
          <circle cx="3" cy="6.7" r="0.6" />
          <circle cx="4.5" cy="6.7" r="0.6" />
          <circle cx="6" cy="6.7" r="0.6" />
          <circle cx="7.5" cy="6.7" r="0.6" />
          <circle cx="2.25" cy="8" r="0.6" />
          <circle cx="3.75" cy="8" r="0.6" />
          <circle cx="5.25" cy="8" r="0.6" />
          <circle cx="6.75" cy="8" r="0.6" />
        </g>
      </g>
    </svg>
  `,
})
export class FlagUsIconComponent {
  readonly size = input<string>('20');
  readonly iconClass = input<string>('');
}
