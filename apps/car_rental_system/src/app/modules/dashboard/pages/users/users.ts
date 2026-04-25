import {
  Component,
  inject,
  viewChild,
  TemplateRef,
  AfterViewInit,
  signal,
} from '@angular/core';
import { UsersStore } from './store/users.store';
import { LibTable, LibSearchInput, TableColumn } from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-users',
  imports: [LibTable, LibSearchInput, TranslocoPipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
  providers: [UsersStore],
})
export class Users implements AfterViewInit {
  protected readonly store = inject(UsersStore);

  private readonly tplId = viewChild.required<TemplateRef<void>>('colId');
  private readonly tplName = viewChild.required<TemplateRef<void>>('colName');
  private readonly tplEmail = viewChild.required<TemplateRef<void>>('colEmail');
  private readonly tplRole = viewChild.required<TemplateRef<void>>('colRole');
  private readonly tplCountry =
    viewChild.required<TemplateRef<void>>('colCountry');

  protected readonly columns = signal<TableColumn[]>([]);

  ngAfterViewInit(): void {
    this.columns.set([
      { field: 'id', header: 'id', headerTemplate: this.tplId() },
      {
        field: 'name',
        header: 'name',
        headerTemplate: this.tplName(),
        showViewIcon: true,
        viewIconRouterLink: (row) => ['/admin/users', String(row['id'])],
      },
      { field: 'email', header: 'email', headerTemplate: this.tplEmail() },
      { field: 'role', header: 'role', headerTemplate: this.tplRole() },
      {
        field: 'country',
        header: 'country',
        headerTemplate: this.tplCountry(),
      },
    ]);
  }
}
