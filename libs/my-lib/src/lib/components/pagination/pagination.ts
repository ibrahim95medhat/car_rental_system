import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { PaginationLink } from '../../models/pagination/pagination.model';
import {
  ArrowLeftIconComponent,
  ArrowRightIconComponent,
} from '../icons/index';

@Component({
  selector: 'lib-pagination',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
    ArrowLeftIconComponent,
    ArrowRightIconComponent,
  ],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class LibPagination {
  readonly currentPage = input.required<number>();
  readonly lastPage = input.required<number>();
  readonly from = input.required<number>();
  readonly to = input.required<number>();
  readonly total = input.required<number>();
  readonly links = input<PaginationLink[]>([]);
  readonly perPage = input<number>(25);
  readonly perPageOptions = input<number[]>([10, 25, 50]);

  readonly pageChange = output<number>();
  readonly perPageChange = output<number>();

  protected readonly pageLinks = computed(() =>
    this.links().filter(
      (l) => l.page !== null && !Number.isNaN(Number(l.label)),
    ),
  );

  protected readonly hasPrev = computed(() => this.currentPage() > 1);
  protected readonly hasNext = computed(
    () => this.currentPage() < this.lastPage(),
  );

  protected goTo(page: number | null): void {
    if (page === null || page === this.currentPage()) return;
    if (page < 1 || page > this.lastPage()) return;
    this.pageChange.emit(page);
  }

  protected onPerPageChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.perPageChange.emit(value);
  }
}
