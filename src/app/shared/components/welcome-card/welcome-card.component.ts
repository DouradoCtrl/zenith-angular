// 💡 CONCEITO ANGULAR: Componentização (Shared Component)
// Componente reutilizável sem estado de negócio específico, pertencente à camada Shared.

import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [CardModule, TagModule],
  template: `
    <!-- 💡 CONCEITO ANGULAR: Template Binding -> Interpolação & Flow Control -->
    <p-card header="Bem-vindo ao Zenith Study Hub" subheader="Fase 1: Fundação & Arquitetura Core/Shared Concluída">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
        <p-tag value="Angular 20" severity="info" icon="pi pi-bolt"></p-tag>
        <p-tag value="PrimeNG 20" severity="success" icon="pi pi-check"></p-tag>
        <p-tag value="PrimeIcons" severity="warn" icon="pi pi-star"></p-tag>
        <p-tag value="Feature-Core-Shared Architecture" severity="secondary" icon="pi pi-sitemap"></p-tag>
      </div>
      <p style="margin-top: 1rem; color: var(--p-text-muted-color);">
        Seu ambiente de estudo minimalista e desacoplado está pronto. Avance para as próximas fases para implementar o Pomodoro, Grid de Contribuição e Músicas!
      </p>
    </p-card>
  `
})
export class WelcomeCardComponent {}
