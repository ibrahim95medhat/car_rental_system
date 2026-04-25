import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-spinner',
  standalone: true,
  template: `
    <div [class]="containerClass()" role="status" aria-label="Loading">
      <svg
        [style.width]="size()"
        [style.height]="size()"
        class="animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  `,
})
export class LibSpinner {
  readonly size = input<string>('2rem');
  readonly fullPage = input<boolean>(false);

  protected readonly containerClass = () =>
    this.fullPage()
      ? 'flex items-center justify-center py-20'
      : 'flex items-center justify-center';
}
