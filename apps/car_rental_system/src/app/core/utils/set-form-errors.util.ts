import { FormGroup } from '@angular/forms';

/**
 * Maps backend validation errors to their matching form controls.
 * Each matched control gets the error set directly so LibValidationError
 * picks it up as an inline message.
 *
 * @param form   The reactive FormGroup to set errors on.
 * @param errors Backend errors object, e.g. { email: ['The email has already been taken.'] }
 */
export function setFormErrors(
  form: FormGroup,
  errors: Record<string, string[]>,
): void {
  Object.entries(errors).forEach(([field, messages]) => {
    const control = form.get(field);
    if (control && messages.length) {
      control.setErrors({ ...control.errors, serverError: messages[0] });
      control.markAsTouched();
    }
  });
}
