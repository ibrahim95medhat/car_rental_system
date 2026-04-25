import { TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface LibModalConfig {
  isOpen: boolean;
  title?: string;
  description?: string;
  hasCloseIcon?: boolean;
  customizeContent: TemplateRef<unknown> | null;
  formGroup?: FormGroup;
  data?: unknown;
  onClose?: () => void;
}
