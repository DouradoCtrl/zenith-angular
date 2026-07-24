// 💡 CONCEITO ANGULAR: Services (Injeção de Dependência & Reatividade Global)
// Este serviço gerencia o cronômetro do Pomodoro e desacopla a comunicação com o Gráfico de Contribuições através de Signals.

import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { PomodoroMode, PomodoroSession } from '../models/pomodoro.model';
import { ContributionDay } from '../../dashboard/models/contribution.model';
import { PomodoroStateService } from '../../../core/services/pomodoro-state.service';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {
  private stateService = inject(PomodoroStateService);

  // Estado reativo do Timer usando Signals
  mode = signal<PomodoroMode>('focus');
  secondsLeft = signal<number>(25 * 60);
  isRunning = signal<boolean>(false);
  sessionsHistory = signal<PomodoroSession[]>([]);

  // Estado reativo compartilhado do Gráfico de Contribuição
  dailyContributions = signal<ContributionDay[]>([]);

  private timerInterval?: any;

  private getDefaultTimeForMode(mode: PomodoroMode): number {
    switch (mode) {
      case 'focus': return this.stateService.focusTime() * 60;
      case 'shortBreak': return this.stateService.shortBreak() * 60;
      case 'longBreak': return this.stateService.longBreak() * 60;
      default: return 25 * 60;
    }
  }

  constructor() {
    this.initContributionHistory();
    // Initialize default time based on state
    this.secondsLeft.set(this.getDefaultTimeForMode(this.mode()));

    // When settings change, if we are not running, we can update the time
    effect(() => {
      const mode = this.mode();
      const defaultTime = this.getDefaultTimeForMode(mode);
      console.log('PomodoroService effect disparado:', { mode, defaultTime, isRunning: this.isRunning() });
      if (!this.isRunning()) {
        this.secondsLeft.set(defaultTime);
      }
    }, { allowSignalWrites: true });
  }

  // Signal Computado para calcular o percentual de progresso (0 a 100)
  progressPercentage = computed(() => {
    const total = this.getDefaultTimeForMode(this.mode());
    const current = this.secondsLeft();
    if (total === 0) return 0;
    return Math.round(((total - current) / total) * 100);
  });

  // Signal Computado para formatar o tempo em mm:ss
  formattedTime = computed(() => {
    const totalSeconds = this.secondsLeft();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minStr = String(minutes).padStart(2, '0');
    const secStr = String(seconds).padStart(2, '0');
    return `${minStr}:${secStr}`;
  });

  startTimer(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);

    this.timerInterval = setInterval(() => {
      if (this.secondsLeft() > 0) {
        this.secondsLeft.update(sec => sec - 1);
      } else {
        this.onTimerCompleted();
      }
    }, 1000);
  }

  pauseTimer(): void {
    this.isRunning.set(false);
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resetTimer(): void {
    this.pauseTimer();
    this.secondsLeft.set(this.getDefaultTimeForMode(this.mode()));
  }

  switchMode(newMode: PomodoroMode): void {
    this.pauseTimer();
    this.mode.set(newMode);
    this.secondsLeft.set(this.getDefaultTimeForMode(newMode));
  }

  skipNext(): void {
    const nextMode: PomodoroMode = this.mode() === 'focus' ? 'shortBreak' : 'focus';
    this.switchMode(nextMode);
  }

  private onTimerCompleted(): void {
    this.pauseTimer();
    
    // Registrar sessão finalizada e atualizar gráfico de contribuição em tempo real!
    if (this.mode() === 'focus') {
      const newSession: PomodoroSession = {
        id: String(Date.now()),
        durationMinutes: 25,
        completedAt: new Date(),
        mode: 'focus'
      };
      this.sessionsHistory.update(list => [newSession, ...list]);
      
      // Adiciona 25 minutos estudados ao dia de hoje no gráfico de contribuição
      this.recordStudyMinutes(25);

      // Alternar para pausa
      this.switchMode('shortBreak');
    } else {
      // Alternar para foco
      this.switchMode('focus');
    }
  }

  recordStudyMinutes(minutes: number): void {
    const todayStr = new Date().toISOString().split('T')[0];

    this.dailyContributions.update(list => {
      return list.map(day => {
        if (day.date === todayStr) {
          const updatedMins = day.minutesStudied + minutes;
          const updatedSessions = day.sessionsCount + 1;
          let level: 0 | 1 | 2 | 3 | 4 = 0;

          if (updatedMins > 180) level = 4;
          else if (updatedMins > 90) level = 3;
          else if (updatedMins > 45) level = 2;
          else if (updatedMins > 0) level = 1;

          return {
            ...day,
            minutesStudied: updatedMins,
            sessionsCount: updatedSessions,
            level
          };
        }
        return day;
      });
    });
  }

  private initContributionHistory(): void {
    const list: ContributionDay[] = [];
    const today = new Date();

    // Data inicial (364 dias atrás -> 365 dias no total incluindo hoje)
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);

    // Padding inicial para alinhar com o Domingo da primeira semana (0 = Domingo)
    const startDayOfWeek = startDate.getDay();
    for (let p = 0; p < startDayOfWeek; p++) {
      const padDate = new Date(startDate);
      padDate.setDate(padDate.getDate() - (startDayOfWeek - p));
      list.push({
        date: padDate.toISOString().split('T')[0],
        minutesStudied: 0,
        level: 0,
        sessionsCount: 0,
        isPlaceholder: true
      });
    }

    // Inicializa os 365 dias ZERADOS — sem dados mockados, hoje é o último dia.
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      list.push({
        date: dateStr,
        minutesStudied: 0,
        level: 0,
        sessionsCount: 0,
        isPlaceholder: false
      });
    }

    this.dailyContributions.set(list);
  }

}
