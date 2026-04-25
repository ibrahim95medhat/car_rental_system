import { Car } from './car.model';
import { User } from './user.model';

export type PaymentType = 'cash' | 'visa' | 'tamara';
export type OrderType = 'full' | 'installments';
export type PaymentStatus = 'pending' | 'success' | 'failed';

export interface Order {
  [key: string]: unknown;
  id: number;
  car_id: number;
  user_id: number;
  delivery_date: string;
  receiving_date: string;
  days: number;
  total_price: number;
  payment_type: PaymentType;
  order_type: OrderType;
  payment_status: PaymentStatus;
  down_payment?: number;
  number_of_installments?: number;
  car?: Car;
  user?: User;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderPayload {
  car_id: number;
  delivery_date: string;
  receiving_date: string;
  payment_type: PaymentType;
  order_type: OrderType;
  down_payment?: number;
  number_of_installments?: number;
}

export interface UpdateOrderPayload {
  payment_status: PaymentStatus;
}

export interface OrderFilters {
  search?: string;
  user_id?: number;
  car_id?: number;
  payment_type?: PaymentType;
  payment_status?: PaymentStatus;
  order_type?: OrderType;
  per_page?: number;
  page?: number;
}
