// 💡 CONCEITO ANGULAR: Componentização & Models
// Interfaces e tipos desacoplados da feature de Dashboard e Gráfico de Contribuições.

export interface ContributionDay {
  date: string; // Formato YYYY-MM-DD
  minutesStudied: number;
  level: 0 | 1 | 2 | 3 | 4; // Tonalidade da cor de 0 (vazio) a 4 (estudo intenso)
  sessionsCount: number;
  isPlaceholder?: boolean; // Para alinhamento de dias da semana
}
