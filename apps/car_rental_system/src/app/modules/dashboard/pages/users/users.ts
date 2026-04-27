import {
  Component,
  inject,
  viewChild,
  TemplateRef,
  AfterViewInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from './store/users.store';
import { AdminUsersService } from '../../services/admin-users.service';
import {
  LibTable,
  LibSearchInput,
  LibSpinner,
  OffcanvasService,
  TableColumn,
} from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-users',
  imports: [CommonModule, LibTable, LibSearchInput, LibSpinner, TranslocoPipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
  providers: [UsersStore],
})
export class Users implements AfterViewInit {
  protected readonly store = inject(UsersStore);
  protected readonly offcanvasService = inject(OffcanvasService);
  private readonly usersService = inject(AdminUsersService);

  private readonly tplId = viewChild.required<TemplateRef<void>>('colId');
  private readonly tplName = viewChild.required<TemplateRef<void>>('colName');
  private readonly tplEmail = viewChild.required<TemplateRef<void>>('colEmail');
  private readonly tplRole = viewChild.required<TemplateRef<void>>('colRole');
  private readonly tplCountry =
    viewChild.required<TemplateRef<void>>('colCountry');
  private readonly tplUserDetail =
    viewChild.required<TemplateRef<void>>('userDetail');

  protected readonly columns = signal<TableColumn[]>([]);
  protected readonly selectedUser = signal<User | null>(null);
  protected readonly userLoading = signal(false);
  protected readonly userError = signal<string | null>(null);

  ngAfterViewInit(): void {
    this.columns.set([
      { field: 'id', header: 'id', headerTemplate: this.tplId() },
      {
        field: 'name',
        header: 'name',
        headerTemplate: this.tplName(),
        showViewIcon: true,
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

  protected openUserDetail(row: Record<string, unknown>): void {
    this.selectedUser.set(null);
    this.userLoading.set(true);
    this.userError.set(null);

    this.offcanvasService.open(this.tplUserDetail(), {
      side: 'right',
      title: (row['name'] as string) ?? '',
      description: (row['email'] as string) ?? '',
      showCloseIcon: true,
    });

    this.usersService.getById(Number(row['id'])).subscribe({
      next: (user) => {
        this.selectedUser.set(user);
        this.userLoading.set(false);
      },
      error: () => {
        this.userError.set('Failed to load user details.');
        this.userLoading.set(false);
      },
    });
  }
}
