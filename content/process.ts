import type { ProcessStep } from "@/types/content";

export const processIntro = {
  title: "Como trabalho",
  cycleLabel: "Ciclo",
  cta: {
    question: "Tem uma ideia ou produto que precisa construir ou evoluir?",
    label: "Conversar sobre um projeto",
    href: "#contato",
  },
} as const;

export const processSteps: ProcessStep[] = [
  {
    id: "entendimento",
    title: "Entendimento",
    description: "Compreensão do problema, público, regras e prioridade do produto.",
  },
  {
    id: "definicao",
    title: "Definição",
    description: "Organização do escopo, arquitetura, experiência e entregas.",
  },
  {
    id: "construcao",
    title: "Construção",
    description: "Desenvolvimento com validações frequentes e qualidade técnica.",
  },
  {
    id: "evolucao",
    title: "Evolução",
    description:
      "Publicação, acompanhamento e melhoria do produto conforme o uso. Volta ao Entendimento.",
    /** Na versão estática (sem ciclo animado) o design omite "Volta ao Entendimento." */
    descriptionStatic: "Publicação, acompanhamento e melhoria do produto conforme o uso.",
  },
];
