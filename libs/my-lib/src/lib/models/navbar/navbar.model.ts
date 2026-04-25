import { TemplateRef } from '@angular/core';

export interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
  labelTemplate?: TemplateRef<void>;
}

export interface NavbarUser {
  name: string;
  subtitle?: string;
  avatarUrl?: string;
}
