// 💡 CONCEITO ANGULAR: Componentização & Directives
// Componente desacoplado que gerencia a interface do Pomodoro Timer consumindo o PomodoroService.

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { PomodoroService } from '../../services/pomodoro.service';
import { PomodoroMode } from '../../models/pomodoro.model';
import { TimerDisplay } from '../timer-display/timer-display';

@Component({
  selector: 'app-pomodoro-timer',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, DatePipe, TimerDisplay],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.css'
})
export class PomodoroTimerComponent implements OnInit {
  // Injeção do serviço reativo do Pomodoro
  pomodoroService = inject(PomodoroService);

  ngOnInit() {
    // Garante que ao entrar na tela, se não estiver rodando, pega os tempos atualizados
    if (!this.pomodoroService.isRunning()) {
      this.pomodoroService.resetTimer();
    }
  }

  get isBreak(): boolean {
    return this.pomodoroService.mode() !== 'focus';
  }

  get accentColor(): string {
    return this.isBreak ? '#22c55e' : '#3b82f6';
  }

  setMode(mode: PomodoroMode): void {
    this.pomodoroService.switchMode(mode);
  }

  togglePlayPause(): void {
    if (this.pomodoroService.isRunning()) {
      this.pomodoroService.pauseTimer();
    } else {
      this.pomodoroService.startTimer();
    }
  }

  next(): void {
    this.pomodoroService.skipNext();
  }

  reset(): void {
    this.pomodoroService.resetTimer();
  }
}
