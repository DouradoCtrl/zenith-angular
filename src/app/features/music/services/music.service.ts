// 💡 CONCEITO ANGULAR: Requisições HTTP & RxJS Observables
// Serviço desacoplado que utiliza HttpClient e Observables do RxJS para buscar e transmitir playlists de estudo.

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { MusicCategory, Track } from '../models/music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private http = inject(HttpClient);

  // Estado do Player
  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);
  volume = signal<number>(70); // 0 a 100

  private audioElement: HTMLAudioElement = new Audio();

  // Playlists recomendadas para foco e estudo
  private mockPlaylists: Track[] = [
    {
      id: '1',
      title: 'Midnight Focus Chill',
      artist: 'Lo-Fi Chill Beats',
      category: 'lofi',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      durationStr: '3:20'
    },
    {
      id: '2',
      title: 'Study Session Beats',
      artist: 'Ambient Lo-Fi',
      category: 'lofi',
      url: 'https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3',
      durationStr: '4:15'
    },
    {
      id: '3',
      title: 'Soft Piano Melodies',
      artist: 'Classical Study',
      category: 'piano',
      url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
      durationStr: '4:30'
    },
    {
      id: '4',
      title: 'Gentle Rain',
      artist: 'Nature Sounds',
      category: 'nature',
      url: 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg',
      durationStr: '5:00'
    }
  ];

  constructor() {
    this.audioElement.volume = this.volume() / 100;
    this.audioElement.onended = () => this.nextTrack();
  }

  // 💡 CONCEITO ANGULAR: Requisições HTTP & RxJS Observables
  // Retorna um Observable de faixas simulando requisição HTTP assíncrona
  getTracksByCategory(category: MusicCategory | 'all'): Observable<Track[]> {
    return of(this.mockPlaylists).pipe(
      delay(300), // Simula latência de rede HTTP
      map(tracks => {
        if (category === 'all') return tracks;
        return tracks.filter(t => t.category === category);
      }),
      catchError(err => {
        console.error('Erro ao carregar faixas de música:', err);
        return of([]);
      })
    );
  }

  playTrack(track: Track): void {
    if (this.currentTrack()?.id === track.id) {
      this.togglePlay();
      return;
    }

    this.currentTrack.set(track);
    this.audioElement.src = track.url;
    this.audioElement.load();
    this.audioElement.play()
      .then(() => this.isPlaying.set(true))
      .catch(err => console.warn('Erro na reprodução de áudio:', err));
  }

  togglePlay(): void {
    if (!this.currentTrack()) {
      if (this.mockPlaylists.length > 0) {
        this.playTrack(this.mockPlaylists[0]);
      }
      return;
    }

    if (this.isPlaying()) {
      this.audioElement.pause();
      this.isPlaying.set(false);
    } else {
      this.audioElement.play()
        .then(() => this.isPlaying.set(true))
        .catch(err => console.warn('Erro ao retomar áudio:', err));
    }
  }

  setVolume(vol: number): void {
    this.volume.set(vol);
    this.audioElement.volume = vol / 100;
  }

  nextTrack(): void {
    const list = this.mockPlaylists;
    if (list.length === 0) return;

    const currentId = this.currentTrack()?.id;
    const currentIndex = list.findIndex(t => t.id === currentId);
    const nextIndex = (currentIndex + 1) % list.length;
    this.playTrack(list[nextIndex]);
  }

  prevTrack(): void {
    const list = this.mockPlaylists;
    if (list.length === 0) return;

    const currentId = this.currentTrack()?.id;
    const currentIndex = list.findIndex(t => t.id === currentId);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    this.playTrack(list[prevIndex]);
  }
}
