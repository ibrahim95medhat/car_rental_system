import {
  Component,
  OnInit,
  input,
  output,
  signal,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'lib-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoPipe],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class LibSearchInput implements OnInit, OnDestroy {
  readonly placeholder = input<string>('');
  readonly debounceMs = input<number>(400);

  readonly searchChange = output<string>();

  protected readonly value = signal('');

  private readonly inputSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.inputSubject
      .pipe(
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((val) => this.searchChange.emit(val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.inputSubject.next(val);
  }
}
