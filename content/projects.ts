import type { Project } from "@/types/content";

export const workIntro = {
  title: "Trabalhos selecionados",
  featuredLabel: "Projeto em destaque",
  complementaryTitle: "Trabalhos complementares",
  /** Quantas tecnologias aparecem antes do "+N" no card principal. */
  techPreview: 5,
  cta: {
    question: "Quer construir uma solução como essas?",
    label: "Conversar sobre um projeto",
    href: "#contato",
  },
} as const;

/**
 * Projetos exibidos em Trabalhos selecionados.
 * As capas ficam em public/assets/projects. Um projeto sem `image` mostra
 * uma moldura neutra nas mesmas proporções (sem conteúdo inventado).
 */
export const projects: Project[] = [
  {
    slug: "copa-manager",
    name: "Copa Manager",
    tier: "featured",
    order: 1,
    category: "Plataforma web full stack",
    image: {
      src: "/assets/projects/copaManager.png",
      alt: "Capa do Copa Manager: painel administrativo de um campeonato e página pública com classificação e partidas.",
      width: 1585,
      height: 992,
    },
    headline: "Gestão completa de campeonatos em uma única plataforma",
    summary:
      "Plataforma para organizar campeonatos, equipes, jogadores, partidas e classificações, com área administrativa completa e páginas públicas para acompanhamento da competição.",
    summaryShort:
      "Campeonatos, equipes, jogadores, partidas e classificações, com área administrativa e páginas públicas.",
    problem: "Controle sem planilhas desconectadas",
    role: "Concepção e desenvolvimento full stack",
    technologies: [
      "React 19",
      "TypeScript",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Vite",
      "TanStack",
      "Zustand",
      "Tailwind",
      "shadcn/ui",
      "React Hook Form",
      "Zod",
      "Node.js",
      "JWT",
    ],
    links: [
      {
        kind: "case",
        label: "Ver case completo",
        href: "https://github.com/Matheus-Bezerra/copa-manager",
      },
      {
        kind: "demo",
        label: "Acessar demonstração",
        shortLabel: "Demonstração",
        href: "https://copa-manager.vercel.app/",
      },
      { kind: "code", label: "Código", href: "https://github.com/Matheus-Bezerra/copa-manager" },
    ],
  },
  {
    slug: "fiscalflow",
    name: "FiscalFlow",
    tier: "secondary",
    order: 2,
    category: "Processamento assíncrono e mensageria",
    image: {
      src: "/assets/projects/fiscalFlow.png",
      alt: "Diagrama do FiscalFlow: documentos fiscais entram em uma fila, passam por validação e processamento e saem confirmados, com um caminho de reprocessamento para falhas.",
      width: 2021,
      height: 778,
    },
    headline: "Processamento assíncrono de notas fiscais",
    technologies: [
      "Java 25",
      "Spring Boot 4",
      "RabbitMQ",
      "PostgreSQL",
      "Flyway",
      "Testcontainers",
      "Docker Compose",
    ],
    summary: "Validação, filas, idempotência e rastreabilidade.",
    links: [
      {
        kind: "code",
        label: "Ver código",
        href: "https://github.com/Matheus-Bezerra/invoice-processing-pipeline",
      },
    ],
  },
  {
    slug: "dashgo",
    name: "DashGo",
    tier: "complementary",
    order: 3,
    category: "Dashboard e interface administrativa",
    image: {
      src: "/assets/projects/dashGo.png",
      alt: "Capa do DashGo: dashboard administrativo com menu lateral, gráficos de linha, lista de usuários e formulário.",
      width: 1672,
      height: 941,
    },
    technologies: [
      "React",
      "Next",
      "TypeScript",
      "TanStack",
      "Axios",
      "MirageJS",
      "Faker",
      "Chakra UI",
      "React Hook Form",
      "Yup",
    ],
    summary: "Dashboard administrativo com dados, gráficos e formulários.",
    links: [
      {
        kind: "code",
        label: "Ver código",
        shortLabel: "Código",
        href: "https://github.com/Matheus-Bezerra/DashGo",
      },
    ],
  },
  {
    slug: "marketplace-app",
    name: "Marketplace App",
    tier: "complementary",
    order: 4,
    category: "Aplicativo",
    image: {
      src: "/assets/projects/marketplaceApp.png",
      alt: "Capa do Marketplace App: três telas do aplicativo, com login, lista de itens e catálogo de produtos.",
      width: 1870,
      height: 841,
    },
    summary:
      "Experiência de marketplace, da descoberta ao pedido. Back-end externo — foco na aplicação.",
    technologies: [
      "Expo 54",
      "React Native",
      "React 19",
      "TypeScript",
      "Expo Router",
      "TanStack Query",
      "Axios",
      "Zustand",
      "NativeWind",
      "Tailwind CSS",
      "React Hook Form",
      "Yup",
      "Reanimated",
    ],
    summaryShort: "Da descoberta ao pedido. Back-end externo — foco na aplicação.",
    links: [
      {
        kind: "code",
        label: "Ver código",
        shortLabel: "Código",
        href: "https://github.com/Matheus-Bezerra/marketplace-app",
      },
    ],
  },
];
