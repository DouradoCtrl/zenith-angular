import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { PomodoroStateService } from '../../../../core/services/pomodoro-state.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ToastModule,
    CardModule
  ],
  providers: [MessageService],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  // Parte A: Template Driven Form
  studyGoal: string = '';

  // Parte B: Reactive Forms
  pomodoroForm!: FormGroup;
  
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private pomodoroState = inject(PomodoroStateService);

  ngOnInit() {
    this.initPomodoroForm();
  }

  // --- PARTE A ---
  addGoal() {
    if (this.studyGoal.trim()) {
      this.pomodoroState.addGoal(this.studyGoal.trim());
      
      this.messageService.add({
        severity: 'success',
        summary: 'Meta Adicionada',
        detail: `Nova meta de estudo: "${this.studyGoal}" definida com sucesso!`,
        life: 3000
      });
      this.studyGoal = ''; // Reseta o campo
    }
  }

  // --- PARTE B ---
  private initPomodoroForm() {
    // Inicializa o form com os valores atuais do state service
    const currentSettings = this.pomodoroState.settings();
    
    this.pomodoroForm = this.fb.group({
      focusTime: [currentSettings.focusTime, [Validators.required, Validators.min(1), Validators.max(60)]],
      shortBreak: [currentSettings.shortBreak, [Validators.required, Validators.min(1), Validators.max(30)]],
      longBreak: [currentSettings.longBreak, [Validators.required, Validators.min(1), Validators.max(45)]]
    });
  }

  savePomodoroSettings() {
    if (this.pomodoroForm.valid) {
      const settings = this.pomodoroForm.value;
      this.pomodoroState.updateSettings(settings);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Configurações Salvas',
        detail: `Pomodoro ajustado: ${settings.focusTime}m / ${settings.shortBreak}m / ${settings.longBreak}m`,
        life: 3000
      });
    }
  }
}
