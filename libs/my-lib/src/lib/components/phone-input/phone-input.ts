import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';
import { controlContainerViewProvider } from '../input/input';

@Component({
  selector: 'lib-phone-input',
  standalone: true,
  imports: [NgxMaterialIntlTelInputComponent, ReactiveFormsModule],
  viewProviders: [controlContainerViewProvider],
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      <ngx-material-intl-tel-input
        [fieldControl]="control"
        [mainLabel]="label()"
        [autoIpLookup]="false"
        [autoSelectCountry]="false"
        autoSelectedCountry="sa"
        [preferredCountries]="preferredCountries()"
        [numberValidation]="true"
        [enableSearch]="true"
        [emojiFlags]="true"
        [localizeCountryNames]="false"
        appearance="outline"
        (currentCountryISO)="countryChanged.emit($event)"
      />
    </div>
  `,
})
export class LibPhoneInput implements AfterViewInit {
  readonly controlName = input.required<string>();
  readonly label = input<string>('Phone');
  readonly preferredCountries = input<string[]>(['sa', 'ae', 'us']);
  readonly countryChanged = output<string>();

  private readonly container = inject(ControlContainer);
  private readonly elRef = inject(ElementRef);

  ngAfterViewInit(): void {
    // Remove native browser tooltips from the flag button
    this.elRef.nativeElement
      .querySelectorAll('[title]')
      .forEach((el: HTMLElement) => el.removeAttribute('title'));
  }

  get control(): FormControl {
    return (this.container.control as FormGroup).get(
      this.controlName(),
    ) as FormControl;
  }
}
