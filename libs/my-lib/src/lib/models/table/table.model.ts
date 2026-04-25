import { TemplateRef } from '@angular/core';

export interface TableColumn<T = Record<string, unknown>> {
  field: Extract<keyof T, string> | string;
  header: string;
  headerTemplate?: TemplateRef<void>;
  type?: 'text' | 'date' | 'currency' | 'number';
  isSortable?: boolean;
  isSorted?: 'asc' | 'desc';
  isColumnHover?: boolean;
  isRequired?: boolean;
  customizeCellStyle?: boolean;
  render?: (value: unknown, row: T) => string;
  showViewIcon?: boolean | ((row: T) => boolean);
  viewIconRouterLink?: (row: T) => string[];
}

export interface TableCheckValue {
  checked: boolean;
  value: unknown[];
}
