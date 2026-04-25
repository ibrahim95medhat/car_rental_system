export type { CarsListState } from '../../models/list.model';
import { CarsListState } from '../../models/list.model';

export const initialCarsListState: CarsListState = {
  cars: [],
  carsMeta: null,
  carsLoading: false,
};
