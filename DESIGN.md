---
name: Portfólio Matheus Bezerra
description: Base grafite, laranja raro e deliberado, tipografia Sora + Inter; engenharia de software com proximidade.
colors:
  graphite-bg: "#141414"
  surface: "#202020"
  surface-2: "#2a2a2a"
  surface-deep: "#1c1c1c"
  surface-sunk: "#1a1a1a"
  surface-raised: "#262626"
  warm-white: "#f5f2ed"
  text-secondary: "#b7b3ad"
  text-tertiary: "#8e8a84"
  ember-orange: "#ff853d"
  ember-orange-hover: "#ff9a5c"
  ember-orange-pressed: "#e8732f"
  ember-orange-disabled: "#3a3330"
  line: "#393939"
  line-soft: "#262626"
  line-strong: "#4a4741"
  separator: "#5a5650"
  control: "#7a766f"
  error: "#ff6b6b"
  success: "#7bd69b"
typography:
  h1:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(34px, 4vw + 1rem, 56px)"
    fontWeight: 600
    lineHeight: "calc(1em + 8px)"
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(30px, 2.4vw + 1rem, 44px)"
    fontWeight: 600
    lineHeight: "calc(1.1em + 5.6px)"
    letterSpacing: "-0.02em"
  h2-compact:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(28px, 2.4vw + 1rem, 40px)"
    fontWeight: 600
    lineHeight: "calc(1.1em + 5.6px)"
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: "30px"
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  project-title:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: "34px"
    letterSpacing: "-0.015em"
  project-title-sm:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: "26px"
  step-number:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "27px"
    fontWeight: 600
    lineHeight: "29px"
  cta:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
  stage-number:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(88px, 8vw, 132px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "Sora, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(30px, 2.6vw + 1rem, 48px)"
    fontWeight: 600
    lineHeight: "calc(1em + 8px)"
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "30px"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "26px"
  small:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22px"
  lead-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: "26px"
  field:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "24px"
  meta:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "20px"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.16em"
  micro:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: "14px"
    letterSpacing: "0.16em"
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.14em"
rounded:
  media: "6px"
  card: "8px"
  field: "10px"
  band: "16px"
  stage: "24px"
  pill: "9999px"
spacing:
  gutter: "24px"
  shell-mobile: "20px"
  shell-tablet: "40px"
  shell-desktop: "64px"
  shell-wide: "120px"
  section-mobile: "64px"
  section-desktop: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ember-orange}"
    textColor: "{colors.graphite-bg}"
    rounded: "{rounded.pill}"
    height: "52px"
    padding: "0 26px"
  button-primary-hover:
    backgroundColor: "{colors.ember-orange-hover}"
  button-primary-pressed:
    backgroundColor: "{colors.ember-orange-pressed}"
  button-primary-disabled:
    backgroundColor: "{colors.ember-orange-disabled}"
    textColor: "{colors.text-tertiary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.pill}"
    height: "52px"
    padding: "0 26px"
  cta-band:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.band}"
    padding: "32px 40px"
  field:
    backgroundColor: "{colors.graphite-bg}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.field}"
    padding: "0 16px"
---

# Design System: Portfólio Matheus Bezerra

## Overview

**Creative North Star: "A Órbita de Engenharia"**

Uma base grafite quieta, sobre a qual o laranja desenha anéis, halos e traços finos ao redor da pessoa e do trabalho. O sistema é tecnológico sem ser gamer, preciso sem ser frio: respiro generoso, contornos de 1px no lugar de caixas pesadas, e um único acento quente usado com rigor. A pessoa vem primeiro (retrato, assinatura "matheus bezerra."); a tecnologia aparece como atmosfera e prova, nunca como espetáculo.

O tom é confiante e próximo. Títulos em Sora 600 têm presença geométrica; o corpo em Inter é calmo e legível. Os palcos de rolagem (serviços, processo) usam números em contorno e ilustrações próprias para dar ritmo sem recorrer a cartões de código ou estatísticas decorativas.

**Key Characteristics:**
- Tema escuro único (`color-scheme: dark`), base grafite `#141414`.
- Um acento: laranja `#ff853d`, raro e deliberado.
- Superfícies tonais e contornos finos; sombra só em elementos que flutuam.
- Formas circulares e orbitais como assinatura gráfica.
- Movimento discreto, sempre com alternativa para `prefers-reduced-motion`.

## Colors

Paleta quente-sobre-grafite: neutros levemente aquecidos e um laranja único como voz.

### Primary
- **Laranja Brasa** (#ff853d): ações principais, traço do eyebrow, sublinhado de links, foco, seleção, destaque da experiência atual e elementos orbitais. Hover `#ff9a5c`, pressed `#e8732f`, desabilitado `#3a3330`.

### Neutral
- **Grafite Base** (#141414): fundo da página e fundo dos campos.
- **Superfície** (#202020): cartões, faixas de chamada. Variações tonais: `#2a2a2a` (superfície 2), `#1c1c1c` (profunda), `#1a1a1a` (rebaixada), `#262626` (elevada).
- **Branco Quente** (#f5f2ed): texto principal e títulos.
- **Cinza Quente Secundário** (#b7b3ad): descrições e corpo. **Terciário** (#8e8a84): metadados e placeholders.
- **Linhas:** `#393939` (padrão), `#262626` (suave), `#4a4741` (forte, usado no número em contorno), `#5a5650` (separadores), `#7a766f` (contorno de controles).
- **Estados:** erro `#ff6b6b`, sucesso `#7bd69b`.

### Named Rules
**The One Voice Rule.** O laranja é a única cor de destaque. Preenchimento laranja sólido é exclusivo das chamadas de conversa ("Conversar sobre um projeto", "Conversar sobre isso", "Enviar mensagem").
**The Dark Ink Rule.** Texto sobre laranja é sempre grafite (7,61:1). Branco quente sobre laranja (2,17:1) é proibido.
**The Border Is Not Enough Rule.** O contorno decorativo `#393939` nunca é a única indicação de um controle; controles usam `#7a766f` e estados de foco visíveis.

## Typography

**Display Font:** Sora 600 (fallback Inter, sans-serif)
**Body Font:** Inter 400/500/600 (fallback system-ui)

**Character:** Sora dá presença geométrica e caráter técnico aos títulos; Inter mantém a leitura calma. Nada de fonte de terminal como linguagem principal.

### Hierarchy
- **H1** (600, clamp 34–56px, entrelinha 1em+8px, -0.025em): abertura.
- **H2** (600, clamp 30–44px, -0.02em): títulos de seção; versão compacta 28–40px em Experiência, Tecnologias e Contato.
- **Statement** (600, clamp 30–48px): frases de posicionamento (Sobre).
- **Title** (Sora 600, 20→22px/28→30px, -0.01em): nomes de empresa na Experiência e títulos de card.
- **Title SM** (Sora 600, 20px/28px): título do projeto em destaque no mobile e faixas de chamada compactas.
- **Project title** (Sora 600, 26px/34px; 19px/26px nos cards pequenos): nome dos projetos em Trabalhos.
- **Step number** (Sora 600, 27px/29px): numeração do ciclo de Como trabalho.
- **CTA** (Sora 600, 20→24px/28→32px): a pergunta das faixas de chamada.
- **Lead SM** (Inter 500, 17px/26px): subtítulo dos projetos.
- **Lead** (400, 16→18px, 26→30px, cor secundária): texto de apoio.
- **Body** (400, 16px/26px, cor secundária). Medida de leitura confortável.
- **Field** (Inter 400, 15px/24px): campos de formulário e canais de contato.
- **Small / Meta** (14px/22px; 13px/20px peso 500, cor terciária): descrições curtas, períodos, tecnologias.
- **Micro** (Inter 600, 10px, +0.16em, caixa alta): rótulos mínimos no mobile (dados do Sobre, centro do ciclo).
- **Label / Caption** (600, 12px +0.16em / 11px +0.14em, caixa alta): eyebrows, etiquetas e o rótulo "Atual".
- **Stage Number** (Sora 600, clamp 88–132px, só contorno 1px `#4a4741`): numeração dos palcos.

### Named Rules
**The Signature Rule.** O nome aparece como "matheus bezerra." em caixa baixa, com ponto laranja, nas fontes do sistema.
**The Eyebrow Rule.** Eyebrows levam um traço laranja de 24×2px antes do texto, em caixa alta espaçada.

## Layout

Contêiner `shell` de 1440px máximo com margens laterais 20 → 40 → 64 → 120px (mobile, ≥768, ≥1024, ≥1280). Grade de 12 colunas com gutter de 24px. Ritmo vertical de seção: 64px no mobile e 96px no desktop. Âncoras respeitam o header fixo (offset de 96px). Cada passo dos palcos de Serviços e Como trabalho consome 38vh de rolagem (o design original previa 60vh; reduzido a pedido para trocar mais depressa). Os palcos de rolagem escalam ilustrações por variáveis (`--is`, `--ps`) conforme largura e altura da janela, e ocultam o número em contorno em janelas baixas. A largura de referência do design é 1440px.

## Elevation & Depth

Sistema tonal e plano. A profundidade vem de camadas de grafite (`#141414` → `#202020` → `#2a2a2a`) e contornos de 1px. Sombras existem apenas em elementos que flutuam.

### Shadow Vocabulary
- **Header** (`0 12px 32px rgba(0,0,0,.35)`): header ao rolar além de 24px.
- **Ícone** (`0 8px 24px rgba(0,0,0,.35)`): ícones/selos flutuantes.
- **Palco** (`0 30px 60px rgba(0,0,0,.45)`): ilustrações dos palcos.
- **Foco de campo** (`0 0 0 3px rgba(255,133,61,.22)`): anel de foco em inputs.

### Named Rules
**The Flat-At-Rest Rule.** Superfícies de conteúdo ficam planas em repouso. Sombra só em elementos que flutuam sobre outros.

## Shapes

Botões em pílula (9999px). Campos 10px, cartões 8px, mídia 6px, faixas de chamada 16px, palcos 24px. Formas circulares e anéis finos são a assinatura gráfica; diagonais e arcos discretos compõem o fundo. Traços de 1–2px, nunca blocos pesados.

## Components

### Buttons
- **Shape:** pílula; alturas 44 (header), 48 (case), 52 (md), 56 (lg).
- **Primary:** fundo laranja, texto grafite, seta à direita (18px). Hover `#ff9a5c`, pressed `#e8732f`, leve `translateY(1px)` ao pressionar, foco com contorno branco quente.
- **Secondary:** contorno `#7a766f`, texto branco quente; hover troca o contorno para branco quente e adiciona fundo `white/6`.
- Transição de 200ms com `--ease-standard`; sem transição sob `prefers-reduced-motion`.

### Links de texto
Sublinhado laranja de 1px (offset 6px) que engrossa para 2px no hover.

### CTA Band
Faixa `#202020` com contorno `#393939`, raio 16px, pergunta em Sora 20→24px e botão primário; empilhada no mobile.

### Inputs / Fields
- **Style:** fundo grafite, contorno `#7a766f`, raio 10px, texto 15px, placeholder terciário.
- **Focus:** contorno laranja + anel `rgba(255,133,61,.22)`.
- **Error / Valid:** contorno e ícone em `#ff6b6b` / `#7bd69b` com mensagem de 13px; desabilitado em superfície rebaixada.

### Navigation
Header fixo com assinatura, links por âncora com seção ativa e botão primário compacto; ganha sombra e fundo após 24px de rolagem. No mobile, menu em overlay com foco preso, `inert` no restante e fechamento por Esc.

### Palcos de rolagem (signature)
Serviços e Processo usam um palco com número em contorno, ilustração própria e ciclo orbital, com snap leve de rolagem (`proximity`) apenas com movimento permitido.

### Abertura (intro)
Tela grafite cheia a cada carregamento: o monograma MB (vetor oficial) se desenha em traço laranja (~0,9 s), preenche, um anel fino nasce ao redor e a cortina sobe por `clip-path` enquanto o hero entra. Dura cerca de 2 s, trava a rolagem com a barra reservada (`scrollbar-gutter: stable`, para nada se deslocar), pode ser pulada com clique ou tecla e some sozinha após 4,5 s se o JavaScript falhar. Não existe com movimento reduzido.

### Títulos e textos
Títulos sobem palavra a palavra de trás de uma máscara (`SplitWords`, 0,85 s, intervalo de 55 ms, `--ease-expressive`); o texto fica em um trecho `sr-only` e as palavras animadas são decorativas. Frases de apoio entram do desfoque para o nítido (`RevealText`). A frase do Sobre é "escrita" letra a letra com um cursor laranja que pisca. Sem JavaScript, tudo aparece (regra `<noscript>` em `app/page.tsx`).

### Cursor da marca
Ponto laranja de 8 px na ponta do ponteiro e um anel de 36 px que o segue com mola; sobre links e botões o anel cresce 1,45× com fundo laranja suave, ao clicar encolhe. Escala e opacidade são do Motion (nunca da propriedade CSS `scale`, que desloca a posição). O cursor do sistema só some depois que o mouse realmente se move; campos de texto, `forced-colors` e `prefers-contrast: more` mantêm o cursor nativo. Só com mouse ou trackpad.

### Rolagem suave
Inércia de rolagem com Lenis só para mouse e trackpad (lerp 0,1); o toque continua nativo e, com movimento reduzido, nada é instalado. Os links `#seção` rolam suavemente já descontando o cabeçalho (96 px), atualizam o endereço e levam o foco ao destino. A rolagem não se move enquanto a abertura ou o menu mobile a travam. O encaixe nativo (`scroll-snap`) dos palcos fica desligado sob o Lenis, porque os passos dos palcos já são discretos.

### Botão fixo de WhatsApp
Bola laranja de 56 px (64 px em telas grandes) com ícone de mensagem em grafite, no canto inferior direito. Entra depois da intro, dá dois pulsos (4 s no total, abaixo do limite de 5 s do WCAG 2.2.2) e não repete; no desktop mostra o rótulo ao passar o mouse. Abre `wa.me` em nova aba. Some (sem foco nem clique) enquanto o Contato ou o rodapé estão na tela, onde o WhatsApp já é um canal direto e a bola cobriria os campos.

### Anéis do hero (a órbita)
Três momentos, nada em loop. **Entrada** (uma vez, ~2,5 s, quando a intro libera): o anel laranja se traça a partir do topo (1,6 s), os três pontos percorrem a órbita até a posição final e o anel tracejado surge girando. **Rolagem:** os anéis giram com a página (120° o laranja, -90° o tracejado, ao longo de 900 px). **Mouse** (só com mouse ou trackpad): anéis, pontos e ícones se deslocam alguns graus e pixels (laranja ±10° e 6 px, tracejado ±14° e 10 px, ícones 16 px), cada camada com uma profundidade, e voltam ao centro quando o mouse sai. Parado, nada se move. Com movimento reduzido tudo fica parado e o anel já aparece completo.

### Linha do tempo da Experiência
No desktop, um traço laranja cresce sobre a linha cinza conforme a rolagem e os pontos acendem; no mobile, a borda esquerda de cada card se preenche da mesma forma. Com movimento reduzido, só o card atual mantém o traço fixo.

### Tecnologias
Listas em texto separadas por barras decorativas (`aria-hidden`) e faixa contínua de logos em cor reduzida que ganham laranja na interação; sem barras de porcentagem.

## Do's and Don'ts

### Do:
- **Do** usar o laranja `#ff853d` como único acento e reservar o botão laranja sólido às chamadas de conversa.
- **Do** manter texto grafite sobre laranja e verificar contraste de foco e estados.
- **Do** usar Sora 600 nos títulos e Inter no restante.
- **Do** respeitar `prefers-reduced-motion` com alternativas estáticas; pausa para qualquer movimento contínuo.
- **Do** reutilizar os arquivos vetoriais da logo e o retrato aprovado, sem recriá-los.

- **Do** limitar movimento automático a 5 s ou ligá-lo à rolagem; nada gira ou pulsa em loop.
- **Do** manter o conteúdo visível sem JavaScript e com movimento reduzido; a animação é um acréscimo, não um pré-requisito.

### Don't:
- **Don't** parecer gamer, nem básico demais.
- **Don't** usar cartões grandes de código, estatísticas sobre a fotografia ou objetos 3D dominantes na abertura.
- **Don't** usar barras de porcentagem ou classificações de domínio em tecnologias.
- **Don't** usar sombras em superfícies de conteúdo em repouso.
- **Don't** usar branco quente como texto sobre laranja.
- **Don't** destacar IA na comunicação pública.
- **Don't** esconder o cursor do sistema globalmente nem aplicar `scale` por CSS em elementos movidos pelo Motion.
