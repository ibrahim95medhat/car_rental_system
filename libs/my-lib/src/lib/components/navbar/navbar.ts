import { Component, input, output, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { NavItem, NavbarUser } from '../../models/navbar/navbar.model';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [RouterModule, NgTemplateOutlet],
  templateUrl: './navbar.html',
})
export class LibNavbar {
  // Inputs
  readonly navItems = input<NavItem[]>([]);
  readonly user = input<NavbarUser | null>(null);
  readonly showTheme = input<boolean>(true);
  readonly showLang = input<boolean>(false);
  readonly navbarClass = input<string>('');

  // Outputs
  readonly themeToggle = output<void>();
  readonly langToggle = output<void>();
  readonly menuToggle = output<boolean>();

  protected readonly isMobileOpen = signal(false);

  private readonly document = inject(DOCUMENT);

  protected toggleMobile(): void {
    this.isMobileOpen.update((v) => !v);
    this.menuToggle.emit(this.isMobileOpen());
  }

  protected isDark(): boolean {
    return this.document.documentElement.getAttribute('data-theme') === 'dark';
  }

  protected onThemeToggle(): void {
    const root = this.document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    this.themeToggle.emit();
  }

  protected onLangToggle(): void {
    this.langToggle.emit();
  }
}
