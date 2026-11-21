import { whatsappLink } from "@/content/contact";

export const hero = {
  eyebrow: "Engenheiro de software",
  title: "Transformo necessidades de negócio em sistemas e produtos digitais.",
  lead: "Sou Matheus Bezerra, engenheiro de software com experiência no desenvolvimento e na evolução de plataformas web, aplicações mobile, APIs e integrações, da arquitetura à produção.",
  primaryCta: { label: "Conversar sobre um projeto", href: whatsappLink(), external: true },
  secondaryCta: { label: "Minha trajetória", href: "#sobre" },
} as const;
