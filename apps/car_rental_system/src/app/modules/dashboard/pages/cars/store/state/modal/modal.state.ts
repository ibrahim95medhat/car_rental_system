export type { CarsModalState, ModalMode } from '../../models/modal.model';
import { CarsModalState } from '../../models/modal.model';

export const initialCarsModalState: CarsModalState = {
  modalOpen: false,
  modalMode: 'create',
  selectedCar: null,
  submitting: false,
  confirmDeleteId: null,
};
