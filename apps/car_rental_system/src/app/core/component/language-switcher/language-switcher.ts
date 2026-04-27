import {
  Component,
  inject,
  OnInit,
  signal,
  computed,
  Type,
} from '@angular/core';
import { DOCUMENT, NgComponentOutlet } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import {
  LibClickOutsideDirective,
  CheckIconComponent,
  FlagUsIconComponent,
  FlagSaIconComponent,
} from '@ui-lib';

interface LangOption {
  value: string;
  label: string;
  flagComponent: Type<unknown>;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [LibClickOutsideDirective, CheckIconComponent, NgComponentOutlet],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcherComponent implements OnInit {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);

  protected readonly isOpen = signal(false);
  protected readonly currentLang = signal<string>('en');

  readonly langOptions: LangOption[] = [
    { value: 'en', label: 'English', flagComponent: FlagUsIconComponent },
    { value: 'ar', label: 'العربية', flagComponent: FlagSaIconComponent },
  ];

  protected readonly currentFlagComponent = computed(
    () =>
      this.langOptions.find((o) => o.value === this.currentLang())
        ?.flagComponent ?? FlagUsIconComponent,
  );

  protected readonly currentLabel = computed(
    () =>
      this.langOptions.find((o) => o.value === this.currentLang())?.label ?? '',
  );

  ngOnInit(): void {
    this.currentLang.set(this.transloco.getActiveLang());
  }

  protected toggle(): void {
    this.isOpen.update((v) => !v);
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected onSelect(option: LangOption): void {
    const lang = option.value;
    this.currentLang.set(lang);
    this.transloco.setActiveLang(lang);
    this.document.documentElement.setAttribute(
      'dir',
      lang === 'ar' ? 'rtl' : 'ltr',
    );
    this.document.documentElement.setAttribute('lang', lang);
    this.close();
  }
}
