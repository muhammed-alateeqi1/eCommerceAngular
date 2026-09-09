import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme/theme.service';

/**
 * Single-button light/dark switch for the navbar.
 *
 * The icon crossfades rather than swapping, so the control does not reflow the
 * navbar as it changes.
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="theme.toggle()"
      [attr.aria-label]="theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
      [attr.aria-pressed]="theme.isDark()"
      title="Toggle theme"
      class="relative grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white
             text-gray-600 transition-colors hover:bg-gray-100
             dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
      <i
        class="fa-solid fa-sun absolute text-sm transition-all duration-300"
        [class.opacity-0]="theme.isDark()"
        [class.rotate-90]="theme.isDark()"
        [class.scale-50]="theme.isDark()"
        aria-hidden="true"></i>
      <i
        class="fa-solid fa-moon absolute text-sm transition-all duration-300"
        [class.opacity-0]="!theme.isDark()"
        [class.-rotate-90]="!theme.isDark()"
        [class.scale-50]="!theme.isDark()"
        aria-hidden="true"></i>
    </button>
  `,
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
}
