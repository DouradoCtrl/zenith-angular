// 💡 CONCEITO ANGULAR: Componentização & Models
// Interfaces e tipos desacoplados específicos da feature de Player de Música Lo-Fi.

export type MusicCategory = 'lofi' | 'nature' | 'piano';

export interface Track {
  id: string;
  title: string;
  artist: string;
  category: MusicCategory;
  url: string;
  durationStr: string;
}
