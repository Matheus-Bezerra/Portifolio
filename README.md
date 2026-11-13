# Portfólio — Matheus Bezerra

Site de portfólio de **Matheus Bezerra**, engenheiro de software com forte especialidade em front-end e experiência full stack. O objetivo é apresentar o que ele constrói, como trabalha e como começar uma conversa sobre um projeto, atendendo dois públicos na mesma página:

- **Clientes** que precisam de sites, sistemas, aplicativos ou APIs (público principal);
- **Recrutadores e lideranças técnicas**, que encontram a trajetória, a stack e os projetos em camadas mais técnicas.

> Capturas de tela serão adicionadas em breve.

## O que o site tem

Uma página única, em português (pt-BR), com estas seções:

| Seção | Conteúdo |
|---|---|
| **Abertura** | Posicionamento, proposta de valor, retrato e a chamada principal "Conversar sobre um projeto" |
| **Sobre** | Apresentação, formação e acesso discreto ao currículo |
| **Serviços** | Sites e landing pages, sistemas e plataformas, aplicativos, APIs e integrações |
| **Como trabalho** | Entendimento, definição, construção e evolução |
| **Experiência** | Trajetória profissional em linha do tempo |
| **Tecnologias** | Stack agrupada por finalidade |
| **Trabalhos** | Projetos selecionados, com Copa Manager em destaque, FiscalFlow, DashGo e Marketplace App |
| **Contato** | Formulário e canais diretos (e-mail, WhatsApp, LinkedIn e GitHub) |

O botão fixo de WhatsApp acompanha o visitante e some quando o contato já está na tela.

## Movimento e interação

O site é animado, mas com critério. Tudo respeita `prefers-reduced-motion` e nada se move sozinho por mais de alguns segundos.

- **Abertura** com o monograma MB que se desenha, pulável por clique ou tecla;
- **Títulos** que sobem palavra a palavra de trás de uma máscara, e frase do Sobre que é "escrita" ao chegar na seção;
- **Órbita do hero** que se traça na entrada, gira com a rolagem e reage ao mouse;
- **Palcos de rolagem** em Serviços e Como trabalho, com navegação por teclado e anúncio para leitores de tela;
- **Rolagem suave** com inércia (só para mouse e trackpad), cursor da marca e linha do tempo que se preenche ao rolar.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, geração estática) e [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) para animações e [Lenis](https://lenis.darkroom.engineering/) para a rolagem suave
- [Zod](https://zod.dev/) para validar o formulário de contato (carregado só quando o formulário se aproxima da tela)
- Fontes **Sora** (títulos) e **Inter** (texto), hospedadas pelo `next/font`

## Qualidade

- **Acessibilidade:** navegação por teclado, foco visível, link para pular ao conteúdo, nomes acessíveis, contraste conferido e alternativas para movimento reduzido;
- **Responsivo:** conferido de 320 px a 1440 px, com layouts próprios para celular, tablet e desktop;
- **SEO técnico:** metadados, Open Graph, dados estruturados (JSON-LD), `sitemap.xml`, `robots.txt` e manifesto;
- **Desempenho:** página totalmente estática, imagens otimizadas pelo Next, validação do formulário carregada sob demanda e apenas os subconjuntos de fonte necessários.

## Como rodar

Requisitos: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

O site abre em `http://localhost:3000`.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | Verifica o código com o ESLint |
| `npm run typecheck` | Verifica os tipos com o TypeScript |
| `npm run format` | Formata o código com o Prettier |

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste:

| Variável | Para que serve |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (canonical, Open Graph e sitemap). Em desenvolvimento, `http://localhost:3000` |

## Estrutura

```
app/            Páginas, metadados, sitemap, robots, manifesto e imagem de compartilhamento
components/     layout, seções, palcos de rolagem, movimento, abertura, formulário e UI
content/        Textos e dados do site, em arquivos TypeScript (um por seção)
lib/            Tokens de movimento, utilitários, validação e envio do formulário
types/          Tipos do conteúdo
public/assets/  Logo, retrato, currículo e capas dos projetos
docs/           Estratégia de conteúdo, identidade visual e handoff de design
```

Os textos ficam em `content/`, separados dos componentes. Para mudar uma frase ou adicionar um projeto, basta editar o arquivo correspondente, sem tocar na interface.

## Documentos do projeto

- [`docs/estrategia_conteudo_portifolio.md`](docs/estrategia_conteudo_portifolio.md): posicionamento, textos aprovados e estrutura da página;
- [`docs/identidade_visual.md`](docs/identidade_visual.md): marca, paleta, tipografia e fotografia;
- [`docs/design-handoff.md`](docs/design-handoff.md): medidas, componentes, estados e interações;
- [`PRODUCT.md`](PRODUCT.md) e [`DESIGN.md`](DESIGN.md): contexto do produto e sistema de design extraído do código.

Esses documentos são a fonte de verdade da versão 1. Textos aprovados não são alterados sem autorização, e o site não inventa métricas, clientes nem depoimentos.

## Estado atual e próximos passos

- O **envio do formulário de contato ainda não está configurado**: a interface avisa isso com honestidade e orienta o uso dos canais diretos (e-mail e WhatsApp).
- Não há painel administrativo na versão 1, por decisão do projeto.
- A seção de Trabalhos foi pensada para crescer: novos projetos entram como novos cards, sem refazer a página.

## Créditos

Projeto pessoal de Matheus Bezerra. A marca, os textos e as fotografias pertencem ao autor. As fontes Sora e Inter são distribuídas sob a licença SIL Open Font License.
