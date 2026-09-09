import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { loginService } from '../../../shared/services/authorization/login-service.service';
import { LogoutService } from '../../../shared/services/authorization/logout.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _CartService = inject(CartService);

  readonly _loginService = inject(loginService);
  readonly _LogoutService = inject(LogoutService);

  /**
   * Mobile menu state. This used to be handled by Flowbite's
   * `data-collapse-toggle`, but both menu panels shared the id `navbar-default`,
   * so the toggle only ever reached the first one and the account links stayed
   * hidden on small screens. Driving it from Angular keeps the two panels in
   * one place and fixes that.
   */
  readonly isMenuOpen = signal(false);

  isLogin = false;
  cartCount = 0;

  ngOnInit(): void {
    this._loginService.userData.subscribe({
      next: (user) => (this.isLogin = user != null),
    });

    this._CartService.cartItems$.subscribe((items) => {
      this.cartCount = items.reduce((sum, item) => sum + (item?.count ?? 0), 0);
    });

    // Collapse the mobile menu after navigating, otherwise it covers the page
    // the user just asked for.
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.isMenuOpen.set(false));
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  logOut(): void {
    this.closeMenu();
    this._LogoutService.logOut();
  }
}
