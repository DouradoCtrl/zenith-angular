import { Injectable, signal, computed } from '@angular/core';

export interface PomodoroSettings {
  focusTime: number; // in minutes
  shortBreak: number;
  longBreak: number;
}

@Injectable({
  providedIn: 'root'
})
export class PomodoroStateService {
  // Signals para as configurações de tempo
  private settingsSignal = signal<PomodoroSettings>({
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15
  });

  // Signal para as metas de estudo do dia
  private studyGoalsSignal = signal<string[]>([]);

  // Computed signals para leitura pública (readonly)
  readonly settings = this.settingsSignal.asReadonly();
  readonly studyGoals = this.studyGoalsSignal.asReadonly();
  
  // Atalhos práticos
  readonly focusTime = computed(() => this.settingsSignal().focusTime);
  readonly shortBreak = computed(() => this.settingsSignal().shortBreak);
  readonly longBreak = computed(() => this.settingsSignal().longBreak);

  /**
   * Atualiza as configurações de tempo do Pomodoro
   */
  updateSettings(newSettings: PomodoroSettings) {
    console.log('PomodoroStateService: Recebeu novas configurações', newSettings);
    this.settingsSignal.set(newSettings);
  }

  /**
   * Adiciona uma nova meta à lista
   */
  addGoal(goal: string) {
    this.studyGoalsSignal.update(goals => [...goals, goal]);
  }
}
