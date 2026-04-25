import {
  Component,
  input,
  output,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { SidebarItem } from '../../models/sidebar/sidebar.model';
import { ChevronDownIconComponent } from '../icons/chevron-down-icon';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [RouterModule, ChevronDownIconComponent, NgTemplateOutlet],
  templateUrl: './sidebar.html',
})
export class LibSidebar implements OnInit {
  readonly items = input.required<SidebarItem[]>();
  readonly footerItems = input<SidebarItem[]>([]);
  readonly showCollapse = input<boolean>(true);
  readonly showTheme = input<boolean>(false);
  readonly sidebarClass = input<string>('');
  readonly labelDarkMode = input<string>('Dark mode');
  readonly labelLightMode = input<string>('Light mode');
  readonly labelCollapse = input<string>('Collapse');

  readonly handleAction = output<string>();
  readonly collapsed = output<boolean>();

  protected readonly isCollapsed = signal(false);

  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 1023px)').matches
    ) {
      this.isCollapsed.set(true);
    }
  }

  protected toggle(): void {
    this.isCollapsed.update((v) => !v);
    this.collapsed.emit(this.isCollapsed());
  }

  protected toggleItem(item: SidebarItem): void {
    if (item.action) {
      this.handleAction.emit(item.action);
      return;
    }
    if (item.children?.length) {
      if (this.isCollapsed()) {
        this.isCollapsed.set(false);
      }
      item.expanded = !item.expanded;
    }
  }

  protected isActive(item: SidebarItem): boolean {
    if (!item.path) return false;
    return (
      this.router.url === item.path ||
      this.router.url.startsWith(item.path + '/')
    );
  }

  protected hasActiveChild(item: SidebarItem): boolean {
    return item.children?.some((c) => this.isActive(c)) ?? false;
  }

  protected isDark(): boolean {
    return this.document.documentElement.getAttribute('data-theme') === 'dark';
  }

  protected onThemeToggle(): void {
    const root = this.document.documentElement;
    root.setAttribute('data-theme', this.isDark() ? 'light' : 'dark');
  }
}
