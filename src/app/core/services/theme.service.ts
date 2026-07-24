// 💡 CONCEITO ANGULAR: Services (Singleton no Core)
// Este serviço gerencia o estado global do tema (Escuro/Claro) da aplicação
// utilizando a anotação @Injectable com providedIn: 'root'.

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Estado reativo simples usando Signals do Angular
  isDarkMode = signal<boolean>(true);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('app-dark-mode');
      const isDark = savedTheme ? savedTheme === 'true' : true;
      this.isDarkMode.set(isDark);
      this.applyTheme(isDark);
    }
  }

  toggleTheme(): void {
    const nextTheme = !this.isDarkMode();
    this.isDarkMode.set(nextTheme);
    this.applyTheme(nextTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-dark-mode', String(nextTheme));
    }
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document !== 'undefined') {
      const element = document.querySelector('html');
      if (element) {
        if (isDark) {
          element.classList.add('app-dark-mode');
        } else {
          element.classList.remove('app-dark-mode');
        }
      }
    }
  }
}
