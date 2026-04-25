export const BUTTON_BASE = [
  'inline-flex items-center justify-center gap-1.5',
  'font-medium transition-all duration-150',
  'focus:outline-none focus:ring-2 focus:ring-offset-1',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'cursor-pointer',
].join(' ');

export const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-base rounded-lg',
} as const;

export const BUTTON_VARIANTS = {
  primary:   'bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-primary/40',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover focus:ring-secondary/40',
  outlined:  'bg-transparent border border-primary text-primary hover:bg-primary/10 focus:ring-primary/30',
  ghost:     'bg-transparent text-foreground hover:bg-surface focus:ring-border',
  danger:    'bg-error text-white hover:opacity-90 focus:ring-error/40',
  link:      'bg-transparent text-primary underline-offset-4 hover:underline p-0 focus:ring-transparent',
} as const;

export type ButtonSize    = keyof typeof BUTTON_SIZES;
export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
