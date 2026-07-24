// 💡 CONCEITO ANGULAR: Componentização & Models
// Interfaces e tipos desacoplados específicos da feature de Pomodoro.

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

export interface PomodoroSession {
  id: string;
  durationMinutes: number;
  completedAt: Date;
  mode: PomodoroMode;
}
