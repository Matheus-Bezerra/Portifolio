import type { Experience } from "@/types/content";

export const experienceIntro = {
  eyebrow: "Experiência",
  title: "Experiência construída em produtos reais.",
  lead: "Minha trajetória reúne desenvolvimento de interfaces, sistemas de ponta a ponta, arquitetura de software, APIs, integrações e modernização de produtos utilizados em ambientes reais de negócio.",
  currentLabel: "Atual",
  /** No mobile, mostra até 4 tecnologias e "+N". */
  mobileTechLimit: 4,
} as const;

export const experiences: Experience[] = [
  {
    id: "fiorde",
    order: 1,
    company: "Fiorde Logística Internacional",
    role: "Engenheiro de Software",
    period: "jun. 2025 — atual",
    current: true,
    description:
      "Atuação na modernização de uma aplicação estratégica, migrando uma solução desenvolvida em Bubble para uma arquitetura com React, TypeScript, Java e Spring Boot. Participação como referência técnica de front-end, contribuindo com micro-frontends, design system, revisão de código, experiência do usuário, APIs, integrações e evolução da aplicação em produção.",
    descriptionShort:
      "Atuação na modernização de uma aplicação estratégica, migrando uma solução desenvolvida em Bubble para uma arquitetura com React, TypeScript, Java e Spring Boot. Referência técnica de front-end: micro-frontends, design system, revisão de código, UX, APIs e integrações.",
    technologies: [
      "React",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Micro-frontends",
      "Design System",
    ],
  },
  {
    id: "brindefly",
    order: 2,
    company: "Brindefly",
    role: "Desenvolvedor Full Stack",
    period: "jul. 2025 — fev. 2026",
    current: false,
    description:
      "Desenvolvimento de uma plataforma SaaS de e-commerce para produtos promocionais. Atuação em interfaces, APIs, bancos de dados, integrações de pagamento recorrente, autenticação, webhooks e comunicação assíncrona entre serviços.",
    descriptionShort:
      "Desenvolvimento de uma plataforma SaaS de e-commerce para produtos promocionais. Interfaces, APIs, bancos de dados, pagamento recorrente, autenticação, webhooks e comunicação assíncrona.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "RabbitMQ"],
  },
  {
    id: "vanguard",
    order: 3,
    company: "Sistema Vanguard",
    role: "Desenvolvedor Full Stack",
    period: "jan. 2023 — jun. 2025",
    current: false,
    description:
      "Atuação em um CRM voltado a empréstimos consignados, contribuindo para a modernização visual, otimização de fluxos críticos, manutenção do back-end e integração de APIs e serviços de mensagens.",
    descriptionShort:
      "CRM voltado a empréstimos consignados: modernização visual, otimização de fluxos críticos, manutenção do back-end e integração de APIs e serviços de mensagens.",
    technologies: ["JavaScript", "PHP", "Zend", "MySQL", "PostgreSQL", "Redis", "APIs REST"],
  },
  {
    id: "j4s",
    order: 4,
    company: "J4S",
    role: "Desenvolvedor Front-end e UI",
    period: "jan. 2022 — jan. 2023",
    current: false,
    description:
      "Responsável pelo desenvolvimento front-end e por decisões de interface em diferentes produtos digitais. Criação de dashboards, painéis administrativos, gráficos, tabelas, fluxos de CRUD, protótipos e integrações de pagamento.",
    descriptionShort:
      "Front-end e decisões de interface em diferentes produtos: dashboards, painéis administrativos, gráficos, tabelas, CRUDs, protótipos e integrações de pagamento.",
    technologies: ["React", "JavaScript", "jQuery", "Bootstrap", "Figma", "Adobe XD"],
  },
];
