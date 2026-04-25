import { Component, computed, input } from '@angular/core';
import {
  BUTTON_BASE,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonSize,
  ButtonVariant,
} from '../../constants/button-style.const';

@Component({
  selector: 'lib-button',
  standalone: true,
  templateUrl: './button.html',
})
export class LibButton {
  readonly id = input<string>('');
  readonly label = input<string>('');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly isLoading = input<boolean>(false);
  readonly btnClass = input<string>('');

  protected readonly computedClasses = computed(() =>
    [
      BUTTON_BASE,
      BUTTON_SIZES[this.size()],
      BUTTON_VARIANTS[this.variant()],
      this.btnClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
