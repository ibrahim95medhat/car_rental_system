import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LibModalConfig } from '../../models/modal/modal.model';
import { LibClickOutsideDirective } from '../../directives/click-outside.directive';
import { CloseIconComponent } from '../icons/close-icon';
import { LibButton } from '../button/button';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    LibClickOutsideDirective,
    CloseIconComponent,
    LibButton,
    ReactiveFormsModule,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class LibModal {
  readonly modal = input<LibModalConfig>({
    isOpen: false,
    hasCloseIcon: true,
    title: '',
    description: '',
    customizeContent: null,
  });

  closeModal(): void {
    const cfg = this.modal();
    cfg.onClose?.();
    const fg = cfg.formGroup;
    if (fg) {
      fg.reset();
    }
  }
}
