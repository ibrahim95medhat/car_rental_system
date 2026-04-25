import { Car } from '../../../../../../core/models';
import { PaginatedResponse } from '@ui-lib';

export interface CarsListState {
  cars: Car[];
  carsMeta: Omit<PaginatedResponse<Car>, 'data'> | null;
  carsLoading: boolean;
}
