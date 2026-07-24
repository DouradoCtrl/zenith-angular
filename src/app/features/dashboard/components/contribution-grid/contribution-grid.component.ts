// 💡 CONCEITO ANGULAR: @Input e @Output (Comunicação Pai/Filho)
// Componente Filho que recebe a matriz de dias estudados via @Input() e emite um evento via @Output() no clique.

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ContributionDay } from '../../models/contribution.model';
import { StudyHoursPipe } from '../../../../shared/pipes/study-hours.pipe';

@Component({
  selector: 'app-contribution-grid',
  standalone: true,
  imports: [CommonModule, TooltipModule, StudyHoursPipe],
  templateUrl: './contribution-grid.component.html',
  styleUrl: './contribution-grid.component.css'
})
export class ContributionGridComponent {
  // 💡 CONCEITO ANGULAR: @Input
  // Entradas de dados enviadas do componente Pai (DashboardComponent)
  @Input() days: ContributionDay[] = [];

  // 💡 CONCEITO ANGULAR: @Output
  // Evento emitido para notificar o componente Pai quando o usuário clica num dia
  @Output() daySelect = new EventEmitter<ContributionDay>();

  onCellClick(day: ContributionDay): void {
    this.daySelect.emit(day);
  }
}
