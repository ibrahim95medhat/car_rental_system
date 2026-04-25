import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { API_ENDPOINTS } from '../../../core/config/api.config';
import { PaginatedResponse } from '@ui-lib';
import { Car, CarFilters } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class CustomerCarsService {
  private readonly api = inject(ApiService);

  getAll(filters?: CarFilters): Observable<PaginatedResponse<Car>> {
    return this.api.get<PaginatedResponse<Car>>(
      API_ENDPOINTS.customerCars,
      filters as Record<string, string | number | boolean | undefined>,
    );
  }

  getById(id: number): Observable<Car> {
    return this.api.get<Car>(`${API_ENDPOINTS.customerCars}/${id}`);
  }
}
