import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LibButton, LibInput } from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';
import { LoginStore } from './store/login.store';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LibButton,
    LibInput,
    TranslocoPipe,
  ],
  templateUrl: './login.html',
  providers: [LoginStore],
})
export class Login {
  protected readonly store = inject(LoginStore);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        
      ],
    ],
  });

  protected onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    this.store.submit({ email, password });
  }
}
