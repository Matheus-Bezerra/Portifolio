import type { Service } from "@/types/content";

export const servicesIntro = {
  eyebrow: "Serviços",
  title: "Soluções digitais para transformar ideias e necessidades em produtos reais.",
  lead: "Atuo desde a definição técnica até o desenvolvimento da solução, criando produtos digitais alinhados à experiência do usuário e aos objetivos de cada negócio.",
  ctaLabel: "Conversar sobre isso",
  scrollHint: "Role para avançar",
} as const;

export const services: Service[] = [
  {
    id: "sites",
    shortLabel: "Sites",
    title: "Sites e landing pages",
    description:
      "Criação de sites profissionais e landing pages responsivas, com boa experiência de navegação, desempenho e estrutura de conteúdo orientada à comunicação e à conversão.",
    projectType: "site",
    illustration: "site",
  },
  {
    id: "sistemas",
    shortLabel: "Sistemas",
    title: "Sistemas e plataformas de ponta a ponta",
    description:
      "Desenvolvimento e evolução de sistemas internos, painéis administrativos, plataformas operacionais, SaaS e produtos web com fluxos, permissões, relatórios e regras de negócio.",
    projectType: "sistema",
    illustration: "dashboard",
  },
  {
    id: "apps",
    shortLabel: "Apps",
    title: "Aplicativos",
    description:
      "Desenvolvimento de aplicativos com autenticação, navegação, consumo de APIs, notificações, gerenciamento de dados e experiências adaptadas aos diferentes contextos de uso.",
    projectType: "aplicativo",
    illustration: "mobile",
  },
  {
    id: "apis",
    shortLabel: "APIs",
    title: "APIs e integrações",
    description:
      "Construção e integração de APIs, sistemas de pagamento, autenticação, webhooks, mensageria, envio de mensagens e comunicação entre diferentes plataformas.",
    projectType: "api",
    illustration: "api",
  },
];
