import { Component, inject, input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { BaseIconComponent } from '../icons/base-icon';
import { ToastType } from '../../models/toast/toast.model';

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [BaseIconComponent],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './toast.html',
})
export class LibToast {
  readonly position = input<
    'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'
  >('top-right');

  protected readonly toastService = inject(ToastService);
  protected readonly toast = this.toastService.toast;

  protected readonly STYLES: Record<
    ToastType,
    { wrapper: string; icon: string }
  > = {
    success: {
      wrapper: 'bg-success/10 border-success/30 text-success',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    },
    error: {
      wrapper: 'bg-error/10 border-error/30 text-error',
      icon: 'M10 14l2-2m0 0 2-2m-2 2-2-2m2 2 2 2m7-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    },
    warning: {
      wrapper: 'bg-warning/10 border-warning/30 text-warning',
      icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
    },
    info: {
      wrapper: 'bg-info/10 border-info/30 text-info',
      icon: 'M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
    },
  } as const;

  protected readonly POSITIONS = {
    'top-right': 'top-4 end-4',
    'top-left': 'top-4 start-4',
    'bottom-right': 'bottom-4 end-4',
    'bottom-left': 'bottom-4 start-4',
    'top-center': 'top-4 start-1/2 -translate-x-1/2',
  } as const;

  protected styleFor(type: ToastType): { wrapper: string; icon: string } {
    return this.STYLES[type];
  }
}
