import { Car } from '../../../../../../core/models';

export type ModalMode = 'create' | 'edit';

export interface CarsModalState {
  modalOpen: boolean;
  modalMode: ModalMode;
  selectedCar: Car | null;
  submitting: boolean;
  confirmDeleteId: number | null;
}
