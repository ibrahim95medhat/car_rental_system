import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { PaginatedResponse } from '@ui-lib';
import { User } from '../../../core/models';

export interface UserFilters {
  search?: string;
  role?: string;
  country?: string;
  per_page?: number;
  page?: number;
}

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private readonly api = inject(ApiService);

  getAll(filters?: UserFilters): Observable<PaginatedResponse<User>> {
    return this.api.get<PaginatedResponse<User>>(
      API_ENDPOINTS.adminUsers,
      filters as Record<string, string | number | boolean | undefined>,
    );
  }

  getById(id: number): Observable<User> {
    return this.api.get<User>(`${API_ENDPOINTS.adminUsers}/${id}`);
  }
}
