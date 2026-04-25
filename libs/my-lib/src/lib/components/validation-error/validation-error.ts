import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { resolveErrorMessage } from '../../utils/error-handler';

@Component({
  selector: 'lib-validation-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-error.html',
})
export class LibValidationError {
  readonly control = input.required<AbstractControl | null>();

  get errors(): { key: string; message: string }[] {
    const errs = this.control()?.errors;
    if (!errs) return [];
    return Object.keys(errs).map((key) => ({
      key,
      message: resolveErrorMessage(key, errs[key]),
    }));
  }

  get show(): boolean {
    const ctrl = this.control();
    return !!ctrl && ctrl.invalid && ctrl.touched;
  }
}
