import { Injectable, signal } from '@angular/core';
import { LibModalConfig } from '../../models/modal/modal.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly config = signal<LibModalConfig>({
    isOpen: false,
    customizeContent: null,
  });

  open(config: Omit<LibModalConfig, 'isOpen'>): void {
    this.config.set({ ...config, isOpen: true });
  }

  close(): void {
    this.config.update((c) => ({ ...c, isOpen: false, customizeContent: null }));
  }
}
