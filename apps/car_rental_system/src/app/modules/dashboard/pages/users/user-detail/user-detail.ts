import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminUsersService } from '../../../services/admin-users.service';
import { User } from '../../../../../core/models';
import { TranslocoPipe } from '@jsverse/transloco';
import { ArrowLeftIconComponent, LibSpinner } from '@ui-lib';

@Component({
  selector: 'app-user-detail',
  imports: [
    RouterLink,
    DatePipe,
    TranslocoPipe,
    ArrowLeftIconComponent,
    LibSpinner,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(AdminUsersService);

  protected readonly userId = this.route.snapshot.paramMap.get('id');
  protected readonly user = signal<User | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    if (!this.userId) return;
    this.usersService.getById(Number(this.userId)).subscribe({
      next: (res) => {
        this.user.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load user details.');
        this.loading.set(false);
      },
    });
  }
}
