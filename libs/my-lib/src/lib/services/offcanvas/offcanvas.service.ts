import { Injectable, inject, signal, TemplateRef } from '@angular/core';
import { LibOffcanvasConfig } from '../../models/offcanvas/offcanvas.model';
import { ModalService } from '../modal/modal.service';

@Injectable({ providedIn: 'root' })
export class OffcanvasService {
  private readonly modalService = inject(ModalService);
  readonly config = signal<LibOffcanvasConfig>({
    isOpen: false,
    side: 'right',
    title: '',
    description: '',
    showCloseIcon: true,
    customizeContent: null,
  });

  open(
    customizeContent: TemplateRef<unknown>,
    config: Partial<
      Omit<LibOffcanvasConfig, 'isOpen' | 'customizeContent'>
    > = {},
  ): void {
    this.config.set({
      side: 'right',
      title: '',
      description: '',
      showCloseIcon: true,
      ...config,
      customizeContent,
      isOpen: true,
    });
  }

  close(): void {
    this.modalService.close();
    this.config.update((c) => ({
      ...c,
      isOpen: false,
      customizeContent: null,
    }));
  }
}
