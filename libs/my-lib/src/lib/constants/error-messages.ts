export const ERROR_MESSAGES: Record<
  string,
  string | ((params: unknown) => string)
> = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  minlength: (p: unknown) =>
    `Minimum ${(p as { requiredLength: number }).requiredLength} characters required.`,
  maxlength: (p: unknown) =>
    `Maximum ${(p as { requiredLength: number }).requiredLength} characters allowed.`,
  min: (p: unknown) => `Value must be at least ${(p as { min: number }).min}.`,
  max: (p: unknown) => `Value must be at most ${(p as { max: number }).max}.`,
  pattern: 'Invalid format.',
  validatePhoneNumber: 'Please enter a valid phone number.',
  passwordMismatch: 'Passwords do not match.',
  pastDate: 'Date cannot be in the past.',
  receivingBeforeDelivery: 'Return date must be after delivery date.',
  serverError: (p: unknown) => p as string,
};
