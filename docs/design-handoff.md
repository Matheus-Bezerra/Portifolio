# Design handoff — Portfólio Matheus Bezerra

**Versão:** alta fidelidade v1 · 11/11/2026
**Base:** última versão aprovada do wireframe (V2). Onde algum documento anterior diverge, vale o wireframe aprovado.
**Canvas:** quadros “Alta fidelidade · …” no artefato de design do portfólio (desktop 1440, mobile 390, menu mobile, estados, palcos de rolagem e espaços de imagem). Os quadros do wireframe continuam na linha de baixo como referência.

---

## 1. Estrutura da página

Página única com âncoras, nesta ordem:

| # | Seção | Âncora | Observação |
|---|---|---|---|
| 01 | Início | `#inicio` | Header flutuante sobre a abertura |
| 02 | Sobre | `#sobre` | Currículo como link discreto |
| 03 | Serviços | `#servicos` | Palco fixo com 4 serviços |
| 04 | Como trabalho | `#como-trabalho` | Logo depois de Serviços; palco fixo com ciclo orbital; fecha com CTA |
| 05 | Experiência | `#experiencia` | Linha do tempo |
| 06 | Tecnologias | `#tecnologias` | Lista por área, em texto |
| 07 | Trabalhos selecionados | `#trabalhos` | Copa Manager → FiscalFlow → complementares |
| 08 | Contato | `#contato` | Texto + contato direto + formulário |
| — | Rodapé | — | Assinatura, navegação, links, currículo, topo |

Navegação principal (7 itens): Início, Sobre, Serviços, Experiência, Tecnologias, Trabalhos, Contato. Enquanto “Como trabalho” estiver na tela, o item ativo continua sendo **Serviços**.

---

## 2. Tokens

### Cores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#141414` | Fundo principal |
| `--surface` | `#202020` | Cards, palcos, formulário, rodapé, CTABand |
| `--surface-2` (derivado) | `#2A2A2A` / `#1C1C1C` / `#1A1A1A` | Só dentro das ilustrações e dos gradientes dos palcos |
| `--text` | `#F5F2ED` | Títulos e texto principal |
| `--text-2` | `#B7B3AD` | Parágrafos e descrições (8,8:1 no fundo) |
| `--text-3` (derivado) | `#8E8A84` | Metadados, legendas e rótulos pequenos (5,4:1 no fundo; 4,75:1 na superfície) |
| `--accent` | `#FF853D` | Ações primárias, destaques, indicador ativo, sublinhados de link |
| `--border` | `#393939` | Filetes e bordas decorativas |
| `--control` (derivado) | `#7A766F` | Borda de campos e de botões de contorno (3,6:1 na superfície, 4,1:1 no fundo) |
| `--error` (derivado) | `#FF6B6B` | Erros de formulário, sempre com ícone e texto |
| `--success` (derivado) | `#7BD69B` | Confirmação de envio e campo válido |
| Separador `/` | `#5A5650` | Barras das listas de tecnologias (decorativo, `aria-hidden`) |

Regras:

- Nunca usar texto `#F5F2ED` sobre laranja (2,17:1). No laranja vai sempre texto `#141414` (7,61:1).
- O laranja cheio é exclusivo das ações “Conversar sobre um projeto”, “Conversar sobre isso” e “Enviar mensagem”. Os outros destaques em laranja são texto, filetes ou pontos.
- `#393939` é decorativo. Controles e foco nunca dependem só dele.

### Tipografia

| Estilo | Fonte | Desktop | Mobile |
|---|---|---|---|
| H1 (abertura) | Sora 600, −0,025em | 56/64 | 34/42 |
| Frase do Sobre | Sora 600, −0,02em | 48/60 | 30/38 |
| H2 de seção | Sora 600, −0,02em | 44/54 (40/50 em Experiência, Tecnologias e Contato) | 30/38 (28/36 em Tecnologias) |
| Título de palco | Sora 600 | 34/42 (Serviços), 36/44 (Como trabalho) | 24/32, 26/34 |
| Número do palco | Sora 600, contorno 1 px `#4A4741`, sem preenchimento | 96/96 | — |
| H3 / card | Sora 600 | 30/38 (Copa), 26/34 (FiscalFlow), 22/30 (Experiência), 19/26 (complementares) | 24/32, 20/28, 20/28, 16/22 |
| Lead | Inter 400 | 18/30 | 16/26 |
| Corpo | Inter 400 | 16/26 (17/28 em destaques) | 15/24 ou 16/26 |
| Pequeno | Inter 400 | 14/22 | 13/20 a 14/22 |
| Eyebrow | Inter 600, 12/16, caixa alta, +0,16em, com traço laranja de 24×2 px antes | igual | igual |
| Rótulo / tag de texto | Inter 600, 11/16, caixa alta, +0,14em, `#8E8A84` | igual | 10 px nos fatos do Sobre |
| Ações | Inter 600, 15 px (16 no hero, 14 no header) | igual | igual |
| Links e navegação | Inter 500, 14–15 px | igual | igual |

Fontes: Google Fonts, Sora 600 e Inter 400/500/600, com `display=swap`. Pré-carregar Sora 600 e Inter 400.

### Espaçamento e grade

- Desktop 1440: 12 colunas, margem 120 px, gutter 24 px (coluna ≈ 78 px).
- Mobile 390: coluna única, margem 20 px.
- Seções: 128 px de padding vertical no desktop e 80 px no mobile. “Como trabalho” começa com 24 px (desktop) e 16 px (mobile), porque continua Serviços.
- Escala base de 4 px: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 80 · 128.
- Separação entre seções: filete superior 1 px `#393939`.

### Raios, sombras e efeitos

| Elemento | Raio |
|---|---|
| Header, botões, navegação ativa, escolha segmentada | 999 px (pílula) |
| Campos | 10 px |
| Cards de projeto e experiência | 8 px (imagens internas 6 px) |
| CTABand, formulário | 16 px |
| Palcos de Serviços e Como trabalho | 24 px (mobile 20 px) |

- Sombra só em elementos que flutuam: header rolado `0 12px 32px rgba(0,0,0,.35)`, ícones do hero `0 8px 24px rgba(0,0,0,.35)` e ilustrações dos palcos `0 30px 60px rgba(0,0,0,.45)`.
- Brilho laranja discreto, sempre radial com opacidade de 10–24%: atrás do retrato, no centro do ciclo e no card do site ilustrado. Nada de glow em textos ou botões.

---

## 3. Componentes

| Componente | Especificação |
|---|---|
| **Header** | Pílula a 16 px do topo, 64 px de altura (mobile: 52 px dentro de 64), com margem lateral igual ao conteúdo (120 px no desktop, 12 px no mobile). **Topo da página:** fundo `rgba(20,20,20,.35)` e borda `#393939` a 70%. **Depois de 24 px de rolagem:** fundo `rgba(32,32,32,.78)`, `backdrop-filter: blur(16px)`, borda `#393939` e sombra. Barra de progresso de leitura laranja de 3 px no topo da janela. |
| **NavLink** | 40 px de altura. **Padrão:** `#B7B3AD`. **Hover:** texto `#F5F2ED` e fundo branco a 5%. **Ativo:** pílula com fundo branco a 8% e ponto laranja de 6 px, que desliza entre itens (scroll-spy + `aria-current`). **Foco:** contorno 2 px laranja, deslocado 3 px. |
| **Botão primário** | Fundo laranja, texto `#141414`, ícone de seta, altura 52 (56 no hero e no mobile, 44 no header). **Hover:** `#FF9A5C`. **Pressionado:** `#E8732F` e desce 1 px. **Foco:** contorno 2 px `#F5F2ED`, deslocado 3 px. **Enviando:** spinner e `aria-busy`. **Desabilitado:** `#3A3330` com texto `#8E8A84`. |
| **Botão secundário / case** | Contorno 1 px `#7A766F`, texto `#F5F2ED`. **Hover:** borda `#F5F2ED` e fundo branco a 6%. **Foco:** contorno laranja. Usado em “Conhecer meu trabalho” e “Ver case completo” (este com seta). |
| **Link de texto** | Inter 500, sublinhado laranja de 1 px, deslocado 6 px. **Hover:** sublinhado de 2 px. **Foco:** contorno laranja. Os links externos levam ↗. |
| **ServiceStage** | Palco fixo: rótulo “Serviço X de 4”, número em contorno, título, descrição, botão “Conversar sobre isso”, dica “Role para avançar”, ilustração à direita e 4 indicadores de segmento abaixo. |
| **ProcessCycle** | Mesmo palco, com anel de 440 px (mobile: 220 px), arco laranja de progresso (25/50/75/100%), 4 nós de 56 px (mobile: 48 px), centro com “Ciclo · X / 4 · nome da etapa” e rótulos das etapas ao redor. A etapa ativa é o nó laranja no topo. |
| **SegmentIndicator** | 4 traços de 3 px: ativo laranja, demais `#393939`. Rótulos em 12 px, `aria-hidden`; não são clicáveis. |
| **CTABand** | Superfície `#202020` com borda, pergunta em Sora 24 (mobile 20) e botão primário. Aparece no fim de Como trabalho e no fim de Trabalhos. |
| **TimelineItem** | Período (coluna de 170 px) e conteúdo: empresa, cargo, descrição e tecnologias em texto separado por barras. **Atual:** ponto laranja com halo e rótulo “Atual” em laranja. **Anteriores:** ponto vazado `#7A766F`. A linha vertical é de 1 px `#393939`. No mobile, vira card; o atual tem um filete laranja de 2 px à esquerda. |
| **TechList** | Abas por área. Desktop: à esquerda, lista de áreas (número 01–05, nome em Sora 17 e contador); a ativa fica em `#F5F2ED` com traço laranja de 24×2 px, troca por clique, hover ou setas ↑/↓. À direita, as tecnologias da área em Sora 30/40, em 2 colunas, com filetes `#393939`. Mobile: acordeão com a primeira área aberta e itens em texto separado por barras. Sem destaque de principais, pílulas, logos ou faixa animada. |
| **ProjectCard L** | Copa Manager. Superfície, borda `#4A4741` e filete laranja interno de 2 px no topo. Imagem com 7 colunas e texto com 5. Ações: case (contorno), demonstração e código (links). |
| **ProjectCard M** | FiscalFlow. Mesma grade 7+5, imagem mais baixa, sem filete laranja. |
| **ProjectCard S** | Complementares, 4 colunas (mobile: card horizontal com miniatura 1:1). Ao adicionar projetos, entram novos cards S na mesma grade. **Hover dos cards:** borda `#5A5650` e o card sobe 2 px. |
| **ContactLink** | Linha de 56 px: ícone genérico em círculo, rótulo e seta, filete inferior. O número de telefone nunca aparece. |
| **FormField** | Campo de 52 px, fundo `#141414`, borda `#7A766F`. **Hover:** borda `#B7B3AD`. **Foco:** borda laranja e halo `0 0 0 3px rgba(255,133,61,.22)`. **Válido:** check verde. **Erro:** borda e texto `#FF6B6B` com ícone. **Desabilitado:** fundo `#1A1A1A` e borda `#393939`. |
| **SegmentedChoice** | Motivo do contato: pílula com 2 opções. A selecionada tem fundo `#F5F2ED`, texto `#141414` e check. |
| **MobileMenu** | Tela cheia sobre o fundo. O botão do header vira X (fundo claro). Links em Sora 24 com numeração, o ativo com ponto laranja. Abaixo, o CTA primário e LinkedIn/GitHub. Foco preso no menu, Esc fecha e o foco volta ao botão. |
| **Footer** | Superfície `#202020`. Assinatura (40 px de altura), frase curta, Navegação, Links, “Ver currículo (PDF)”, © e “Voltar ao topo”. |

---

## 4. Seções — detalhes de acabamento

**Início.** Mesma composição do wireframe: o texto ocupa as colunas 1–6 e o retrato as 7–12. Atrás do retrato:

- anel laranja de 540 px (1,5 px) com 3 pontos laranja;
- anel tracejado de 460 px em branco a 16%;
- disco de 320 px com brilho laranja radial;
- 4 ícones genéricos de código em círculos de 48 px: `</>` (laranja), terminal, chaves e versionamento.

Um degradê inferior de 120 px funde a abertura com a seção seguinte. No mobile, texto e CTAs vêm primeiro, seguidos de um anel de 330 px, disco de 210 px, retrato e 3 ícones de 40 px.

**Sobre.** A frase de destaque tem as palavras “visão técnica”, “produto” e “negócio” em laranja. Os 4 fatos ficam numa linha com filetes verticais (no mobile, em lista). No desktop, o 3º parágrafo aparece; no mobile, fica em “Ler mais”.

**Serviços + Como trabalho.** Ver o item 6 (Interações).

**Experiência.** No desktop, a coluna esquerda (título e texto) fica `sticky` a 120 px do topo enquanto a linha do tempo rola. No mobile, a descrição é a versão resumida já aprovada, e as tecnologias mostram até 4 itens e “+N”.

**Tecnologias.** Título “Tecnologias que uso” e 5 áreas em abas (desktop) ou acordeão (mobile), sem legenda nem destaque de principais.

**Trabalhos selecionados.** Título sem rótulo acima. O destaque do Copa Manager é moderado. O espaço “Próximo projeto” é só referência da grade e **não é renderizado** no site.

**Contato.** Desktop: 5 colunas de texto e links + 7 colunas de formulário. Mobile: o formulário vem antes dos contatos diretos. Placeholders pendentes: [E-MAIL PROFISSIONAL], link do LinkedIn, aviso de privacidade/LGPD e o texto de confirmação de envio.

---

## 5. Responsividade

| Faixa | Comportamento |
|---|---|
| ≥ 1280 | Layout de referência (1440): margem 120, 12 colunas |
| 1024–1279 | Margem 64. Navegação completa com padding dos links reduzido a 10 px (o texto do CTA não muda). Palcos mantêm 5+7 colunas, com ilustração em escala 1.0 |
| 768–1023 | Menu hambúrguer. Hero em 2 colunas estreitas, retrato de 300 × 467. Palcos com ilustração em cima e texto embaixo. Projetos L e M empilham imagem e texto; complementares em 2 colunas |
| < 768 | Coluna única (390 de referência), margem 20, botões em largura total, alvos ≥ 44 px |

O H1 escala com `clamp(34px, 4vw + 1rem, 56px)`, e os H2 com `clamp(28px, 2.4vw + 1rem, 44px)`.

---

## 6. Interações e movimento

### Palcos de Serviços e Como trabalho (aprovados)

1. O palco trava quando o topo dele encosta no topo da janela, abaixo do header (`position: sticky` dentro de um contêiner com altura de 100vh + 4 × 60vh).
2. Cada passo consome ≈ 60vh de rolagem. A troca leva ≈ 0,6 s com `cubic-bezier(.2,.7,.2,1)`:
   - **Serviços:** o texto sobe e some enquanto a ilustração se transforma (site → painel → celular → conexões de API).
   - **Como trabalho:** o anel gira 90° por etapa e a ativa sobe ao topo. O arco laranja avança 25% a cada etapa.
3. Um snap leve evita parar entre dois estados. Rolar para cima volta ao estado anterior. Depois do 4º estado, o palco se solta.
4. Acessibilidade:
   - o palco é uma região com `aria-live="polite"` que anuncia “Serviço X de 4” ou “Etapa X de 4”;
   - ↑ ↓ / PageUp / PageDown avançam;
   - os traços são indicadores, não botões.
5. “Conversar sobre isso” leva a `#contato` e pré-seleciona o tipo de projeto correspondente no formulário.

### Atualizações de movimento (v1.1, aprovadas por Matheus)

- **Palcos:** cada passo consome ≈ 38vh de rolagem (antes 60vh). O encaixe nativo foi retirado porque a rolagem suave (Lenis) o substitui.
- **Rolagem suave (Lenis):** só com mouse/trackpad; links `#seção` rolam com suavidade.
- **Abertura:** o monograma MB se desenha a cada carregamento (~2 s, pulável por clique ou tecla).
- **Sobre:** a frase é "escrita" letra a letra ao chegar na seção (substitui o acender das 3 expressões).
- **Hero:** os anéis não giram sozinhos; a órbita se traça na entrada, gira com a rolagem e reage ao mouse. Os ícones continuam sem flutuação própria e só se deslocam com o mouse.
- **Cursor da marca** (ponto e anel laranja, só com mouse) e **botão fixo de WhatsApp** (some no Contato e no rodapé).
- Regra geral: movimento automático dura no máximo 5 s ou depende da rolagem do visitante.

### Microinterações (v1.2, aprovadas por Matheus)

- **Cards de trabalhos:** no hover/foco, traço laranja se desenha sob o nome do projeto (300 ms), a capa dá zoom a 1.03 e o ↗ dos links desliza 2 px.
- **TechList:** um único traço laranja desliza verticalmente (300 ms) para a área ativa.
- **Formulário:** o rótulo do campo em foco fica laranja, a mensagem de erro entra deslizando de cima (200 ms) e a seta do botão avança no hover.
- Todas ficam estáticas com `prefers-reduced-motion`. A entrada dos blocos ao rolar já existia (`Reveal`).

### Alternativa para movimento reduzido

Com `prefers-reduced-motion: reduce`, ou com a janela abaixo de 640 px de altura, não há palco fixo:

- **Serviços:** lista empilhada com número, título, texto e o link “Conversar sobre isso”.
- **Como trabalho:** 4 etapas estáticas; o anel fica parado na etapa 1 ou é omitido.
- Scroll suave e barra de progresso animada também são desligados.

O quadro “Palcos de rolagem” mostra essa alternativa.

### Outros movimentos (já aprovados)

- Scroll suave entre âncoras. A pílula ativa da navegação desliza, e a barra de progresso acompanha a rolagem.
- Header: transição de fundo e borda em 200 ms ao passar de 24 px.
- Sobre: as 3 expressões em laranja acendem uma a uma (opacidade 0,4 → 1, 300 ms, intervalo de 120 ms) ao entrar na tela.
- Hover de cards, botões e links: 150–200 ms.
- Os anéis do hero podem ter rotação muito lenta (≥ 60 s por volta) e ficam parados com movimento reduzido. Os ícones não flutuam.

---

## 7. Espaços de imagem e logotipo

| ID | Onde | Arquivo | Desktop 1440 | Mobile 390 | Ajuste |
|---|---|---|---|---|---|
| LOGO-01 | Header | Assinatura horizontal, versão fundo escuro (SVG oficial) | Altura 26 px (≈ 188 px) | Altura 20 px | Não recriar em texto. Margem de proteção = 1/4 da altura do símbolo |
| LOGO-02 | Rodapé | Mesma assinatura | Altura 40 px (≈ 290 px) | Altura 28 px | — |
| IMG-01 | Início | Retrato aprovado, PNG transparente | Caixa 360 × 560 ancorada na base, centrada nas colunas 7–12 | Caixa 240 × 370 abaixo dos CTAs | `object-fit: contain; object-position: bottom center`. Rosto e relógio sempre visíveis; pixels intocados |
| IMG-02 | Copa Manager | Capa/mockup (admin + página pública) | 7 col. × 460 px (≈ 16:10) | IMG-02M: largura total × 210 (≈ 4:3, recorte próprio) | `cover`, exportar em 2× |
| IMG-03 | FiscalFlow | Arte própria do fluxo | 7 col. × 260 px (≈ 2,6:1) | IMG-03M: largura total × 160 (≈ 2:1) | `cover`, foco central |
| IMG-04 | DashGo | Capa/mockup atualizado | 4 col. × 170 px (≈ 16:10) | Miniatura 96 × 96 (1:1) | `cover`, recorte quadrado próprio |
| IMG-05 | Marketplace App | Mockup mobile | 4 col. × 170 px (≈ 16:10) | Miniatura 96 × 96 (1:1) | `cover`, recorte quadrado próprio |
| FAV | Aba do navegador | Favicon oficial (pacote da marca) | 16/32/180/192/512 + SVG + ICO | — | — |

- No design, a assinatura aparece com o PNG oficial (fundo escuro) apenas como referência temporária; na implementação entra o SVG oficial.
- Anéis, brilhos, ícones de código e ilustrações dos palcos são CSS/SVG, não imagens.
- Imagens de projeto: WebP/AVIF com fallback, `loading="lazy"` (exceto o retrato) e `width`/`height` declarados.

---

## 8. Acessibilidade

- Skip-link “Ir para o conteúdo”. Um H1; um H2 por seção; landmarks `header`, `nav`, `main` e `footer`.
- Foco visível em todos os controles: contorno 2 px laranja, deslocado 3 px (no botão laranja, o contorno é claro).
- Alvos ≥ 44 × 44 px no mobile.
- Formulário:
  - rótulos visíveis e obrigatórios marcados com `*` e `aria-required`;
  - erros ligados ao campo por `aria-describedby`;
  - resumo de erros recebe o foco no envio;
  - sucesso anunciado por `role="status"`.
- Listas de tecnologias: separadores `aria-hidden`.
- Retrato: `alt="Matheus Bezerra"`. Ícones decorativos com `aria-hidden`.

---

## 9. Pendências para a implementação

1. SVGs oficiais da marca, retrato final e capas dos projetos (inseridos manualmente).
2. E-mail profissional, link do LinkedIn, destino do formulário e texto de LGPD/confirmação.
3. Endereço final do repositório do FiscalFlow.
4. Atualizar `identidade_visual.md`: o hero usa ícones genéricos de código, não selos de React/TypeScript/Java. Atualizar também `estrategia_conteudo_portifolio.md`: FiscalFlow finalizado, com nova assinatura “Processamento assíncrono de notas fiscais”, e Tecnologias sem faixa de logos.
