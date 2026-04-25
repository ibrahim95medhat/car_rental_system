import { CarsListState, initialCarsListState } from './list/list.state';
import {
  CarsFiltersState,
  initialCarsFiltersState,
} from './filters/filters.state';
import { CarsModalState, initialCarsModalState } from './modal/modal.state';

export type CarsState = CarsListState & CarsFiltersState & CarsModalState;

export const initialCarsState: CarsState = {
  ...initialCarsListState,
  ...initialCarsFiltersState,
  ...initialCarsModalState,
};
