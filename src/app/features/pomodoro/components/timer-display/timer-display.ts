import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PomodoroMode } from '../../../models/pomodoro.model';

@Component({
  selector: 'app-timer-display',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './timer-display.html',
  styleUrl: './timer-display.css'
})
export class TimerDisplay {
  @Input({ required: true }) formattedTime: string = '25:00';
  @Input({ required: true }) currentMode: PomodoroMode = 'focus';
  @Input({ required: true }) isRunning: boolean = false;
  @Input({ required: true }) accentColor: string = '#3b82f6';
  @Input({ required: true }) progressPercentage: number = 0;

  @Output() toggleTimer = new EventEmitter<void>();
  @Output() resetTimer = new EventEmitter<void>();
  @Output() nextTimer = new EventEmitter<void>();

  onToggle() {
    this.toggleTimer.emit();
  }

  onReset() {
    this.resetTimer.emit();
  }

  onNext() {
    this.nextTimer.emit();
  }
}
