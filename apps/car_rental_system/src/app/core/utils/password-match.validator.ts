import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmCtrl = group.get('password_confirmation');
  const confirm = confirmCtrl?.value;

  if (password && confirm && password !== confirm) {
    confirmCtrl?.setErrors({ ...confirmCtrl.errors, passwordMismatch: true });
  } else if (confirmCtrl?.hasError('passwordMismatch')) {
    const rest = { ...confirmCtrl.errors };
    delete rest['passwordMismatch'];
    confirmCtrl?.setErrors(Object.keys(rest).length ? rest : null);
  }
  return null;
};
