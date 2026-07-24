// 💡 CONCEITO ANGULAR: Pipes (Shared)
// Transformador de dados reutilizável que converte minutos brutos em formato de horas e minutos legível (ex: 135 -> 2h 15m).

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studyHours',
  standalone: true
})
export class StudyHoursPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value) || value <= 0) {
      return '0 min';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours === 0) {
      return `${minutes} min`;
    }

    if (minutes === 0) {
      return `${hours}h`;
    }

    const minStr = String(minutes).padStart(2, '0');
    return `${hours}h ${minStr}m`;
  }
}
