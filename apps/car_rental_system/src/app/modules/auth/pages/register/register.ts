import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LibButton, LibInput } from '@ui-lib';
import { LibPhoneInput } from '@ui-lib/lib/components/phone-input/phone-input';
import { TranslocoPipe } from '@jsverse/transloco';
import { RegisterStore } from './store/register.store';
import { passwordMatchValidator } from '../../../../core/utils/password-match.validator';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LibButton,
    LibInput,
    LibPhoneInput,
    TranslocoPipe,
  ],
  templateUrl: './register.html',
  providers: [RegisterStore],
})
export class Register {
  protected readonly store = inject(RegisterStore);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', Validators.required],
      phone: [null as unknown, Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  serverErrorEffect = effect(() =>
    this.store.applyServerErrors(this.form as FormGroup),
  );

  protected onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    this.store.submit({
      name: raw.name ?? '',
      email: raw.email ?? '',
      password: raw.password ?? '',
      password_confirmation: raw.password_confirmation ?? '',
      phone: raw.phone ? JSON.stringify(raw.phone) : undefined,
      country: this.store.country(),
    });
  }
}
