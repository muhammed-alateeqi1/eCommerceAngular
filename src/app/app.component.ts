import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { FooterComponent } from './layout/additions/footer/footer.component';
import { NavbarComponent } from './layout/additions/navbar/navbar.component';
import { ThemeService } from './shared/services/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'eCommerceSession';

  /**
   * Injected so the service is constructed at startup and begins tracking the
   * OS theme; the template does not need it.
   *
   * The component used to show the global spinner for a fixed 5 seconds in
   * ngOnInit, which blocked the UI on every page load regardless of whether
   * anything was actually loading. `spinnerInterceptor` already shows the
   * spinner for the duration of real HTTP requests, so that timer is gone.
   */
  constructor() {
    inject(ThemeService);
  }
}
