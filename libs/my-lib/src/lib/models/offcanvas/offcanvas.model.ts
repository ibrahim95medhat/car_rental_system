import { TemplateRef } from '@angular/core';

export interface LibOffcanvasConfig {
  isOpen: boolean;
  side: 'left' | 'right';
  title: string;
  description: string;
  showCloseIcon: boolean;
  customizeContent: TemplateRef<unknown> | null;
  data?: unknown;
  onClose?: () => void;
}
