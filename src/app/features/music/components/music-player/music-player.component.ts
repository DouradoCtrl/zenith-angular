// 💡 CONCEITO ANGULAR: Componentização & RxJS Observables
// Componente desacoplado de Player de Música que consome o MusicService via Observables e Signals.

import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MusicService } from '../../services/music.service';
import { MusicCategory, Track } from '../../models/music.model';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CardModule, 
    ButtonModule, 
    TagModule, 
    SliderModule, 
    SelectButtonModule
  ],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css'
})
export class MusicPlayerComponent implements OnInit {
  musicService = inject(MusicService);

  tracks = signal<Track[]>([]);
  selectedCategory = signal<MusicCategory | 'all'>('all');
  volumeValue = signal<number>(70);

  categoryOptions = [
    { label: 'Todas', value: 'all', icon: 'pi pi-list' },
    { label: 'Lo-Fi', value: 'lofi', icon: 'pi pi-headphones' },
    { label: 'Natureza', value: 'nature', icon: 'pi pi-cloud' },
    { label: 'Piano', value: 'piano', icon: 'pi pi-volume-down' }
  ];

  ngOnInit(): void {
    this.loadTracks();
  }

  // 💡 CONCEITO ANGULAR: Requisições HTTP & RxJS Observables
  // Inscrição na chamada do serviço que retorna um Observable de faixas
  loadTracks(): void {
    this.musicService.getTracksByCategory(this.selectedCategory()).subscribe(list => {
      this.tracks.set(list);
    });
  }

  onCategoryChange(category: MusicCategory | 'all'): void {
    this.selectedCategory.set(category);
    this.loadTracks();
  }

  playTrack(track: Track): void {
    this.musicService.playTrack(track);
  }

  togglePlay(): void {
    this.musicService.togglePlay();
  }

  prev(): void {
    this.musicService.prevTrack();
  }

  next(): void {
    this.musicService.nextTrack();
  }

  onVolumeChange(val: number): void {
    this.volumeValue.set(val);
    this.musicService.setVolume(val);
  }
}
