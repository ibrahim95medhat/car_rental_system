import {
  Component,
  input,
  output,
  signal,
  inject,
  computed,
  OnInit,
  DestroyRef,
} from '@angular/core';
import {
  ControlContainer,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { LibValidationError } from '../validation-error/validation-error';
import { LibClickOutsideDirective } from '../../directives/click-outside.directive';
import { DropdownOption } from '../../models/dropdown/dropdown.model';
import { ChevronDownIconComponent, CheckIconComponent } from '../icons/index';
import { LibButton } from '../button/button';

export const controlContainerViewProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Component({
  selector: 'lib-dropdown',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LibValidationError,
    LibClickOutsideDirective,
    ChevronDownIconComponent,
    CheckIconComponent,
    LibButton,
  ],
  viewProviders: [controlContainerViewProvider],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class LibDropdown implements OnInit {
  readonly controlName = input.required<string>();
  readonly label = input<string>('');
  readonly placeholder = input<string>('Select an option');
  readonly options = input<DropdownOption[]>([]);
  readonly optionSelected = output<DropdownOption>();
  readonly showChevron = input<boolean>(true);

  protected readonly isOpen = signal(false);

  private readonly container = inject(ControlContainer);
  private readonly destroyRef = inject(DestroyRef);

  get control(): FormControl {
    return (this.container.control as FormGroup).get(
      this.controlName(),
    ) as FormControl;
  }

  get hasError(): boolean {
    return this.control?.invalid && this.control?.touched;
  }

  protected readonly controlValue = signal<unknown>(null);

  ngOnInit(): void {
    this.controlValue.set(this.control?.value ?? null);
    this.control?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.controlValue.set(v);
      });
  }

  protected readonly selectedLabel = computed(() => {
    const val = this.controlValue();
    if (val === null || val === undefined || val === '') return null;
    return this.options().find((o) => o.value === val)?.label ?? null;
  });

  protected toggle(): void {
    this.isOpen.update((v) => !v);
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected select(option: DropdownOption): void {
    this.control?.setValue(option.value);
    this.control?.markAsTouched();
    this.optionSelected.emit(option);
    this.close();
  }
}
