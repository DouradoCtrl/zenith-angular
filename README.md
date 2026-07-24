# Zenith - Produtividade e Estudos

Zenith e uma aplicacao web de produtividade construida com Angular 20 e PrimeNG 20, estruturada seguindo arquitetura Feature-Core-Shared (FDA), gerenciamento de estado reativo com Signals, consumo de APIs via HttpClient e formularios Template-Driven e Reativos.

---

## Funcionalidades Principais

- Pomodoro Timer: Cronometro de estudo reativo com alternancia entre foco, pausa curta e pausa longa.
- Grafico de Contribuicao: Matriz de habitos de estudo no estilo GitHub para acompanhamento de frequencia anual.
- Configuracoes Personalizadas: Formularios para ajuste dos tempos do Pomodoro e gerenciamento de metas diarias.
- Player de Musica Lo-Fi: Player para foco durante sessoes de estudo.
- Citacoes Motivacionais: Integracao HTTP para exibicao de frases diarias.
- Tema Claro / Escuro: Alternancia de temas utilizando variaveis CSS do PrimeNG.

---

## Tecnologias Utilizadas

- Angular 20 (Standalone Components, Signals, Lazy Loading, Control Flow)
- PrimeNG 20 + PrimeIcons
- RxJS e HttpClient
- TypeScript e CSS3

---

## Estrutura do Projeto

```text
src/app/
├── core/       # Servicos globais, estado central e layout shell
├── shared/     # Componentes, pipes e diretivas reutilizaveis
└── features/   # Modulos de negocio (Dashboard, Pomodoro, Settings, Music)
```

---

## Documentacao e Comandos CLI

Para comandos do Angular CLI (ng serve, ng build, ng test) e especificacao das fases do projeto, consulte a [documentacao de comandos](file:///home/dourado-dev/Documentos/git-projects/zenith-primeng/docs/commands.md).
