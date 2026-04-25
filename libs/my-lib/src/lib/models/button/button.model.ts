import { ButtonSize, ButtonVariant } from '../../constants/button-style.const';

export interface ButtonConfig {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  btnClass?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
