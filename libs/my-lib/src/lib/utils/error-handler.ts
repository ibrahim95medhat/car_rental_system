import { ERROR_MESSAGES } from '../constants/error-messages';

export function resolveErrorMessage(key: string, params: unknown): string {
  // If the error value is a plain string, use it directly as the message (backend errors)
  if (typeof params === 'string' && params.trim().length > 0) {
    return params;
  }
  const msg = ERROR_MESSAGES[key];
  if (!msg) return 'Invalid value.';
  return typeof msg === 'function' ? msg(params) : msg;
}

