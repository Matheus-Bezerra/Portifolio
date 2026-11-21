import type { ProjectType } from "@/types/content";

export const contactIntro = {
  eyebrow: "Contato",
  title: "Tem um projeto ou uma oportunidade em mente?",
  lead: "Se for um projeto, conte o problema, o estágio e o que precisa construir ou evoluir. Se for uma oportunidade profissional, fico à vontade para conversar sobre como minha experiência pode contribuir.",
  /** RASCUNHO — textos dos dois blocos e do botão, pendentes de aprovação. */
  whatsappCta: "Conversar pelo WhatsApp",
  projectLabel: "Novo projeto",
  projectNote: "Conversa direta, com a mensagem inicial já pronta.",
  opportunityLabel: "Oportunidades profissionais",
  secondary:
    "Também estou aberto a conversar com empresas e recrutadores sobre oportunidades alinhadas à minha experiência.",
  directLabel: "Contato direto",
} as const;

export type ContactChannelIcon = "mail" | "chat" | "person";

export interface ContactChannel {
  id: "email" | "whatsapp" | "linkedin";
  label: string;
  href: string;
  icon: ContactChannelIcon;
  external: boolean;
}

const email = "matheusbwzerra002@gmail.com";

/** O número de telefone nunca é exibido — apenas o link. */
const whatsappHref = "https://wa.me/5511976611929";

/** Mensagens iniciais da conversa; o visitante pode editar antes de enviar. */
const greeting = "Olá, Matheus! Vi seu portfólio e gostaria de conversar sobre";
export const whatsappMessages: Record<ProjectType, string> = {
  site: `${greeting} um site ou landing page.`,
  sistema: `${greeting} um sistema ou plataforma.`,
  aplicativo: `${greeting} um aplicativo.`,
  api: `${greeting} uma API ou integração.`,
  outro: `${greeting} um projeto.`,
};

export function whatsappLink(type: ProjectType = "outro") {
  return `${whatsappHref}?text=${encodeURIComponent(whatsappMessages[type])}`;
}

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
    href: whatsappLink(),
    icon: "chat",
    external: true,
  },
  { id: "linkedin", label: "LinkedIn", href: social.linkedin, icon: "person", external: true },
];
