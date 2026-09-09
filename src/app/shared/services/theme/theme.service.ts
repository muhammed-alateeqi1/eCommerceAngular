import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

/**
 * Owns the light/dark preference.
 *
 * The preference is one of three values; `system` follows the OS and keeps
 * following it if the user changes it while the tab is open. The resolved
 * result is written to <html> as the `dark` class, which is what Tailwind's
 * `darkMode: 'class'` strategy reads.
 *
 * The same class is also applied by a small inline script in index.html so the
 * correct theme is painted on first frame; this service only has to keep it in
 * sync afterwards.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _preference = signal<ThemePreference>(this.readStoredPreference());

  /** What the user chose: 'light' | 'dark' | 'system'. */
  readonly preference = this._preference.asReadonly();

  /** What is actually on screen once 'system' is resolved. */
  readonly resolved = computed<'light' | 'dark'>(() => {
    const pref = this._preference();
    return pref === 'system' ? this.systemPrefersDark() : pref;
  });

  readonly isDark = computed(() => this.resolved() === 'dark');

  constructor() {
    if (!this.isBrowser) return;

    this.apply();

    // Keep 'system' live if the OS theme changes while the tab is open.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this._preference() === 'system') this.apply();
    });

    // Reflect the choice made in another tab.
    window.addEventListener('storage', (event) => {
      if (event.key !== STORAGE_KEY) return;
      this._preference.set(this.readStoredPreference());
      this.apply();
    });
  }

  setPreference(preference: ThemePreference): void {
    this._preference.set(preference);
    if (!this.isBrowser) return;
    try {
      if (preference === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Private mode / blocked storage: the theme still applies for this page view.
    }
    this.apply();
  }

  /** Flip between light and dark, resolving 'system' to its opposite first. */
  toggle(): void {
    this.setPreference(this.isDark() ? 'light' : 'dark');
  }

  private apply(): void {
    if (!this.isBrowser) return;
    const dark = this.resolved() === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#0b1120' : '#ffffff');
  }

  private systemPrefersDark(): 'light' | 'dark' {
    if (!this.isBrowser) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private readStoredPreference(): ThemePreference {
    if (!this.isBrowser) return 'system';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : 'system';
    } catch {
      return 'system';
    }
  }
}
