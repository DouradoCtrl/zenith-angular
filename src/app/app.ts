// 💡 CONCEITO ANGULAR: Componentização (Componente Raiz App)
// Componente principal que carrega o ShellComponent e as features Pomodoro, Dashboard e Music.

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellComponent } from './core/layout/shell.component';
import { MusicPlayerComponent } from './features/music/components/music-player/music-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ShellComponent, 
    MusicPlayerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
