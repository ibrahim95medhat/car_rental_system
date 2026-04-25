import { Car } from '../../../../../../core/models';
import { PaginatedResponse } from '@ui-lib';

export interface CustomerCarsListState {
  cars: Car[];
  carsMeta: Omit<PaginatedResponse<Car>, 'data'> | null;
  carsLoading: boolean;
}
