import {
  Component,
  input,
  output,
  signal,
  effect,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  CommonModule,
  NgTemplateOutlet,
  DatePipe,
  CurrencyPipe,
} from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableColumn, TableCheckValue } from '../../models/table/table.model';
import { PaginationLink } from '../../models/pagination/pagination.model';
import { LibPagination } from '../pagination/pagination';
import { LibEmptyState } from '../empty-state/empty-state';
import {
  ViewIconComponent,
  ChevronUpIconComponent,
  ChevronDownIconComponent,
} from '../icons/index';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    RouterModule,
    LibPagination,
    LibEmptyState,
    ViewIconComponent,
    ChevronUpIconComponent,
    ChevronDownIconComponent,
  ],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class LibTable<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  // Core
  readonly id = input<string>('lib-table');
  readonly dataSource = input.required<T[]>();
  readonly columns = input.required<TableColumn<T>[]>();

  // Custom cell templates — match by identifier === column.field
  readonly bodyTabTemplateRef = input<
    { identifier?: string; template: TemplateRef<unknown> }[]
  >([]);

  // Table config
  readonly selectable = input<boolean>(false);
  readonly stickyHeader = input<boolean>(false);
  readonly tableClass = input<string>('');
  readonly cellStyle = input<string>('');
  readonly rowStyle = input<string>('');
  readonly headerClass = input<string>('bg-surface-alt');
  readonly bodyClass = input<string>('bg-background');
  readonly hoverClass = input<string>('bg-primary/5');
  readonly tableTitle = input<string>('');
  readonly listCount = input<number>(0);
  readonly loading = input<boolean>(false);
  readonly emptyMessage = input<string>('No data available.');
  readonly disableHover = input<boolean>(false);
  readonly stickyFirstColumn = input<boolean>(false);

  // Pagination
  readonly enablePagination = input<boolean>(false);
  readonly currentPage = input<number>(1);
  readonly lastPage = input<number>(1);
  readonly from = input<number>(0);
  readonly to = input<number>(0);
  readonly total = input<number>(0);
  readonly paginationLinks = input<PaginationLink[]>([]);
  readonly perPage = input<number>(25);
  readonly perPageOptions = input<number[]>([10, 25, 50]);

  // Outputs
  readonly sortChange = output<TableColumn<T>>();
  readonly pageChange = output<number>();
  readonly perPageChange = output<number>();
  readonly handleMasterSelect = output<TableCheckValue>();
  readonly handleSelectItem = output<TableCheckValue>();
  readonly handleViewIconClick = output<T>();

  protected displayedColumns = signal<TableColumn<T>[]>([]);
  protected isAllSelected = false;
  protected selectionItems: T[] = [];
  protected hoveredRowIndex = signal<number | null>(null);

  private readonly datePipe = inject(DatePipe);
  private readonly currencyPipe = inject(CurrencyPipe);
  constructor() {
    effect(() => {
      this.displayedColumns.set(this.columns());
    });
  }

  protected sortColumn(column: TableColumn<T>): void {
    if (!column.isSortable) return;
    if (!column.isSorted) {
      column.isSorted = 'asc';
    } else if (column.isSorted === 'asc') {
      column.isSorted = 'desc';
    } else {
      column.isSorted = undefined;
    }
    this.displayedColumns.set(
      this.columns().map((col) => {
        if (col.field !== column.field) {
          col.isSorted = undefined;
          col.isColumnHover = false;
        }
        return col;
      }),
    );
    this.sortChange.emit(column);
  }

  protected renderCell(col: TableColumn<T>, row: T): string {
    const value = row[col.field];
    if (col.render) return col.render(value, row);
    if (value == null || value === '') return '—';
    if (col.type === 'date') {
      return this.datePipe.transform(String(value), 'mediumDate') ?? '—';
    }
    if (col.type === 'currency') {
      return (
        this.currencyPipe.transform(Number(value), 'USD', 'symbol', '1.2-2') ??
        '—'
      );
    }
    return String(value);
  }

  protected getTemplateForColumn(field: string): TemplateRef<unknown> | null {
    return (
      this.bodyTabTemplateRef().find((t) => t.identifier === field)?.template ??
      null
    );
  }

  protected toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.isAllSelected = checked;
    this.selectionItems = checked ? [...this.dataSource()] : [];
    this.handleMasterSelect.emit({ checked, value: this.selectionItems });
  }

  protected toggleElement(event: Event, row: T): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectionItems.push(row);
      this.isAllSelected =
        this.selectionItems.length === this.dataSource().length;
    } else {
      this.selectionItems = this.selectionItems.filter((r) => r !== row);
      this.isAllSelected = false;
    }
    this.handleSelectItem.emit({ checked, value: this.selectionItems });
  }

  protected isSelected(row: T): boolean {
    return this.selectionItems.includes(row);
  }

  protected shouldShowViewIcon(column: TableColumn<T>, row: T): boolean {
    if (typeof column.showViewIcon === 'function')
      return column.showViewIcon(row);
    return !!column.showViewIcon;
  }

  protected getViewIconRouterLink(
    column: TableColumn<T>,
    row: T,
  ): string[] | null {
    return column.viewIconRouterLink ? column.viewIconRouterLink(row) : null;
  }

  protected getRowViewIconRouterLink(row: T): string[] | null {
    const col = this.displayedColumns().find((c) => c.viewIconRouterLink);
    return col?.viewIconRouterLink ? col.viewIconRouterLink(row) : null;
  }

  protected onViewIconClick(row: T): void {
    this.handleViewIconClick.emit(row);
  }
}
