import { Component, input, inject } from '@angular/core';
import {
  ControlContainer,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibValidationError } from '../validation-error/validation-error';

export const controlContainerViewProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LibValidationError],
  viewProviders: [controlContainerViewProvider],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class LibInput {
  readonly controlName = input.required<string>();
  readonly label = input<string>('');
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly min = input<string>('');
  readonly max = input<string>('');

  private readonly container = inject(ControlContainer);

  get control(): FormControl {
    return (this.container.control as FormGroup).get(
      this.controlName(),
    ) as FormControl;
  }

  get hasError(): boolean {
    return this.control?.invalid && this.control?.touched;
  }
}
