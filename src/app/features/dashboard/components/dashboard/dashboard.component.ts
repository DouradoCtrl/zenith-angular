// 💡 CONCEITO ANGULAR: Componentização & Services (Consumo Reativo)
// Componente Pai que consome os dados do Gráfico de Contribuições do PomodoroService e escuta o @Output() do filho.

import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ContributionGridComponent } from '../contribution-grid/contribution-grid.component';
import { ContributionDay } from '../../models/contribution.model';
import { StudyHoursPipe } from '../../../../shared/pipes/study-hours.pipe';
import { PomodoroService } from '../../../pomodoro/services/pomodoro.service';
import { QuoteService, Quote } from '../../../../core/services/quote.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    DialogModule, 
    ButtonModule, 
    TagModule, 
    ContributionGridComponent,
    StudyHoursPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Injeção do serviço reativo do Pomodoro
  pomodoroService = inject(PomodoroService);
  quoteService = inject(QuoteService);

  selectedDay = signal<ContributionDay | null>(null);
  detailsModalVisible = signal<boolean>(false);
  dailyQuote = signal<Quote | null>(null);

  ngOnInit() {
    this.quoteService.getRandomQuote().subscribe(quote => {
      this.dailyQuote.set(quote);
    });
  }

  // Expor a lista reativa do PomodoroService diretamente
  studyHistory = computed(() => this.pomodoroService.dailyContributions());

  // Estatísticas calculadas reativamente a partir dos dados reais do serviço
  totalMinutes = computed(() => {
    return this.pomodoroService.dailyContributions().reduce((acc, day) => acc + day.minutesStudied, 0);
  });

  activeDaysCount = computed(() => {
    return this.pomodoroService.dailyContributions().filter(day => day.minutesStudied > 0).length;
  });

  // Event handler acionado pelo @Output() do filho ContributionGridComponent
  onDaySelected(day: ContributionDay): void {
    this.selectedDay.set(day);
    this.detailsModalVisible.set(true);
  }

  closeModal(): void {
    this.detailsModalVisible.set(false);
  }
}
