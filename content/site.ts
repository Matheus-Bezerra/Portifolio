export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export const site = {
  name: "Matheus Bezerra",
  title: "Matheus Bezerra — Engenheiro de Software",
  jobTitle: "Engenheiro de Software",
  description:
    "Engenheiro de software com experiência no desenvolvimento e na evolução de plataformas web, aplicações mobile, APIs e integrações, da arquitetura à produção.",
  tagline: "Engenharia de software com visão técnica de produto e de negócio.",
  locale: "pt_BR",
  cvHref: "/assets/cv/CV_Matheus_Bezerra_EngenheiroSoftware.pdf",
  logo: {
    src: "/assets/logo/svg/assinatura-fundo-escuro.svg",
    /** viewBox do SVG oficial: 708.464 × 120 */
    width: 708,
    height: 120,
  },
  portrait: {
    src: "/assets/photos/matheus_sem_fundo.png",
    alt: "Matheus Bezerra",
    width: 1536,
    height: 1024,
  },
  knowsAbout: [
    "Engenharia de software",
    "React",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Node.js",
    "APIs e integrações",
    "Design Systems",
  ],
} as const;
