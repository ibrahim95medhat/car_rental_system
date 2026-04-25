import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { PaginatedResponse } from '@ui-lib';
import { Car, CarFilters, CarPayload } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class AdminCarsService {
  private readonly api = inject(ApiService);

  getAll(filters?: CarFilters): Observable<PaginatedResponse<Car>> {
    return this.api.get<PaginatedResponse<Car>>(
      API_ENDPOINTS.adminCars,
      filters as Record<string, string | number | boolean | undefined>,
    );
  }

  getById(id: number): Observable<{ data: Car }> {
    return this.api.get<{ data: Car }>(`${API_ENDPOINTS.adminCars}/${id}`);
  }

  create(payload: CarPayload): Observable<Car> {
    return this.api.post<Car>(API_ENDPOINTS.adminCars, payload);
  }

  update(id: number, payload: CarPayload): Observable<Car> {
    return this.api.put<Car>(`${API_ENDPOINTS.adminCars}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${API_ENDPOINTS.adminCars}/${id}`);
  }
}
