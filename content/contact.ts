import type { ProjectType } from "@/types/content";

export const contactIntro = {
  eyebrow: "Contato",
  title: "Tem um sistema, aplicativo ou produto digital em mente?",
  lead: "Conte um pouco sobre o problema, o estágio do projeto e o que você precisa construir ou evoluir. Posso analisar o cenário e conversar sobre a melhor forma de transformar a ideia em uma solução viável.",
  secondary:
    "Também estou aberto a conversar com empresas e recrutadores sobre oportunidades alinhadas à minha experiência.",
  directLabel: "Contato direto",
} as const;

export type ContactChannelIcon = "mail" | "chat" | "person" | "github";

export interface ContactChannel {
  id: "email" | "whatsapp" | "linkedin" | "github";
  label: string;
  href: string;
  icon: ContactChannelIcon;
  external: boolean;
}

const email = "matheusbwzerra002@gmail.com";

/** O número de telefone nunca é exibido — apenas o link. */
const whatsappHref = "https://wa.me/5511976611929";

export const social = {
  email,
  emailHref: `mailto:${email}`,
  whatsappHref,
  linkedin: "https://www.linkedin.com/in/matheus-bezerra04/",
  github: "https://github.com/Matheus-Bezerra",
} as const;

export const contactChannels: ContactChannel[] = [
  { id: "email", label: email, href: social.emailHref, icon: "mail", external: false },
  {
    id: "whatsapp",
    label: "Chamar no WhatsApp",
    href: whatsappHref,
    icon: "chat",
    external: true,
  },
  { id: "linkedin", label: "LinkedIn", href: social.linkedin, icon: "person", external: true },
  { id: "github", label: "GitHub", href: social.github, icon: "github", external: true },
];

export const projectTypeOptions: { value: ProjectType; label: string }[] = [
  { value: "site", label: "Site ou landing page" },
  { value: "sistema", label: "Sistema ou plataforma" },
  { value: "aplicativo", label: "Aplicativo" },
  { value: "api", label: "API ou integração" },
  { value: "outro", label: "Outro / ainda não sei" },
];

export const formCopy = {
  name: { label: "Nome", placeholder: "Seu nome" },
  email: { label: "E-mail", placeholder: "voce@empresa.com" },
  company: { label: "Empresa", optional: "(opcional)", placeholder: "Nome da empresa" },
  reason: {
    legend: "Motivo do contato",
    project: "Projeto",
    opportunity: "Oportunidade profissional",
    opportunityShort: "Oportunidade",
  },
  projectType: { label: "Tipo de projeto", placeholder: "Selecione…" },
  message: {
    label: "Mensagem",
    placeholder:
      "Conte sobre o problema, o estágio do projeto e o que precisa construir ou evoluir",
    max: 1000,
  },
  /** RASCUNHO — texto de privacidade pendente de aprovação. */
  privacy:
    "Seus dados serão usados apenas para responder a este contato e não serão compartilhados com terceiros.",
  submit: "Enviar mensagem",
  submitting: "Enviando…",
  errorSummary: (count: number) =>
    count === 1 ? "Revise 1 campo destacado abaixo." : `Revise ${count} campos destacados abaixo.`,
  /** Etapa atual: o envio ainda não está configurado. Nunca simular sucesso. */
  unavailableTitle: "Formulário em configuração.",
  unavailableText: "Utilize os contatos diretos por enquanto.",
} as const;
