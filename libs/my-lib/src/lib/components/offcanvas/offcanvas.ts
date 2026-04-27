import { Component, computed, input, output } from '@angular/core';
import { LibButton } from '../button/button';
import { LibClickOutsideDirective } from '../../directives/click-outside.directive';
import { CloseIconComponent } from '../icons/close-icon';

@Component({
  selector: 'lib-offcanvas',
  standalone: true,
  imports: [LibButton, LibClickOutsideDirective, CloseIconComponent],
  templateUrl: './offcanvas.html',
})
export class LibOffcanvas {
  readonly isOpen = input<boolean>(false);
  readonly side = input<'right' | 'left'>('right');
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly showCloseIcon = input<boolean>(true);
  readonly panelClass = input<string>('');
  readonly overlayClass = input<string>('bg-black/40 backdrop-blur-sm');

  readonly closed = output<void>();

  protected readonly panelClasses = computed(() => {
    const sideClass = this.side() === 'left' ? 'left-0' : 'right-0';
    const borderClass = this.side() === 'left' ? 'border-r' : 'border-l';

    return [
      'absolute inset-y-0',
      sideClass,
      'flex w-full max-w-[26rem] flex-col overflow-y-auto bg-background shadow-2xl',
      borderClass,
      'border-border',
      this.panelClass(),
    ]
      .filter(Boolean)
      .join(' ');
  });
}
