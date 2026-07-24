import { Routes } from '@angular/router';

// 💡 CONCEITO ANGULAR: Rotas & Lazy Loading
// Carregamento sob demanda usando `loadComponent`. Isso otimiza o bundle inicial da aplicação.
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'pomodoro',
    loadComponent: () => import('./features/pomodoro/components/pomodoro-timer/pomodoro-timer.component').then(m => m.PomodoroTimerComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/components/settings/settings').then(m => m.Settings)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
