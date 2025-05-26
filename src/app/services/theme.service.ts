import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeKey = 'dark-mode';

  constructor() {
    this.loadTheme();
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  toggleTheme(): void {
    const isDark = this.isDarkMode();
    if (isDark) {
      this.setLightMode();
    } else {
      this.setDarkMode();
    }
  }

  setDarkMode(): void {
    document.documentElement.classList.add('dark');
    localStorage.setItem(this.darkModeKey, 'true');
  }

  setLightMode(): void {
    document.documentElement.classList.remove('dark');
    localStorage.setItem(this.darkModeKey, 'false');
  }

  private loadTheme(): void {
    const stored = localStorage.getItem(this.darkModeKey);
    if (stored === 'true') {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
  }
}
