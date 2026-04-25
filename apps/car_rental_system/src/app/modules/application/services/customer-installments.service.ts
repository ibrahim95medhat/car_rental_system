import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { PaginatedResponse } from '@ui-lib';
import { Installment, InstallmentFilters } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class CustomerInstallmentsService {
  private readonly api = inject(ApiService);

  getAll(
    filters?: InstallmentFilters,
  ): Observable<PaginatedResponse<Installment>> {
    return this.api.get<PaginatedResponse<Installment>>(
      API_ENDPOINTS.customerInstallments,
      filters as Record<string, string | number | boolean | undefined>,
    );
  }

  pay(id: number): Observable<{ data: Installment }> {
    return this.api.post<{ data: Installment }>(
      `${API_ENDPOINTS.customerInstallments}/${id}/pay`,
    );
  }
}
