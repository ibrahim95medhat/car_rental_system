import { TemplateRef } from '@angular/core';

export interface SidebarItem {
  label: string;
  labelTemplate?: TemplateRef<void>;
  path?: string;
  icon?: string;
  action?: string;
  children?: SidebarItem[];
  sectionTitle?: string;
  expanded?: boolean;
}
