# Comandos e Recursos do Angular CLI

Documentacao dos comandos padrao do Angular CLI e resumo das fases de desenvolvimento do projeto.

---

## Development Server

Iniciar servidor de desenvolvimento local:

```bash
ng serve
```

Acesse `http://localhost:4200/`.

---

## Scaffolding de Codigo

Gerar novo componente:

```bash
ng generate component nome-do-componente
```

Ajuda de schematics:

```bash
ng generate --help
```

---

## Build de Producao

Compilar projeto para producao:

```bash
ng build
```

Artefatos gerados em `dist/`.

---

## Testes Automatizados

- Testes unitarios:
  ```bash
  ng test
  ```

- Testes end-to-end:
  ```bash
  ng e2e
  ```

---

## Fases de Desenvolvimento

### Fase 1: Fundacao, Arquitetura Base e Tema (`setup-core-shared-layout`)
- PrimeNG 20 + PrimeIcons configurados em `app.config.ts`.
- Estrutura FDA (`core/`, `shared/`, `features/`).
- `ThemeService` para alternancia Dark/Light mode.
- `ShellComponent` com navbar responsivo.

### Fase 2: Feature Pomodoro Timer (`feature-pomodoro-timer`)
- `PomodoroService` e `PomodoroTimerComponent`.
- Formatacao de tempo (`25:00`), controles de timer.
- Dynamic binding de classe e estilo conforme o modo.

### Fase 3: Grafico de Contribuicao e Comunicacao (`feature-contribution-grid`)
- Componente `ContributionGridComponent`.
- `StudyHoursPipe` para formatacao de horas.
- Comunicacao via `@Input()` e `@Output()` com modal de detalhes.

### Fase 4: Configuracoes e Formularios (`feature-settings-forms`)
- Template-Driven Form (`[(ngModel)]`) para metas diarias.
- Reactive Form (`FormBuilder` + `Validators`) para tempos de foco e pausa.

### Fase 5: Player de Musica e Consumo de API (`feature-music-player`)
- Injecao de `HttpClient` via `provideHttpClient()`.
- Player de audio Lo-Fi integrando faixas para estudo.

### Fase 6: Navegacao Completa e Roteamento (`feature-routes-navigation`)
- Roteamento em `app.routes.ts` com Lazy Loading (`loadComponent`).
- Indicadores de rota ativa com `routerLinkActive`.
