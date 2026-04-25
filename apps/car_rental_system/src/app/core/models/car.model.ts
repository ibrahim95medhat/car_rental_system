export interface Car {
  [key: string]: unknown;
  id: number;
  name: string;
  brand: string;
  model: string;
  kilometers: number;
  price_per_day: number;
  created_at?: string;
  updated_at?: string;
}

export interface CarPayload {
  name: string;
  brand: string;
  model: string;
  kilometers: number;
  price_per_day: number;
}

export interface CarFilters {
  search?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  per_page?: number;
  page?: number;
}
