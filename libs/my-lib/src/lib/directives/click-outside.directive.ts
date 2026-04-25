import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  output,
  DOCUMENT,
  inject,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[libClickOutside]',
  standalone: true,
})
export class LibClickOutsideDirective implements AfterViewInit, OnDestroy {
  readonly clickOutside = output<void>();

  private readonly element = inject(ElementRef);
  private readonly document = inject(DOCUMENT);
  private subscription: Subscription | undefined;

  ngAfterViewInit(): void {
    this.subscription = fromEvent(this.document, 'click')
      .pipe(filter((event) => !this.isInside(event.target as HTMLElement)))
      .subscribe(() => this.clickOutside.emit());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private isInside(el: HTMLElement): boolean {
    return (
      el === this.element.nativeElement ||
      this.element.nativeElement.contains(el)
    );
  }
}
