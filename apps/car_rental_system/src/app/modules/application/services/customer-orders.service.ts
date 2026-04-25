import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { PaginatedResponse } from '@ui-lib';
import { Order, OrderFilters, CreateOrderPayload } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class CustomerOrdersService {
  private readonly api = inject(ApiService);

  getAll(filters?: OrderFilters): Observable<PaginatedResponse<Order>> {
    return this.api.get<PaginatedResponse<Order>>(
      API_ENDPOINTS.customerOrders,
      filters as Record<string, string | number | boolean | undefined>,
    );
  }

  getById(id: number): Observable<Order> {
    return this.api.get<Order>(`${API_ENDPOINTS.customerOrders}/${id}`);
  }

  create(payload: CreateOrderPayload): Observable<Order> {
    return this.api.post<Order>(API_ENDPOINTS.customerOrders, payload);
  }
}
