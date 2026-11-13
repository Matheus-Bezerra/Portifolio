export const about = {
  eyebrow: "Sobre",
  /**
   * Frase de destaque. Os trechos com `highlight: true` aparecem em laranja.
   */
  statement: [
    { text: "Engenharia de software com " },
    { text: "visão técnica", highlight: true },
    { text: " de " },
    { text: "produto", highlight: true },
    { text: " e de " },
    { text: "negócio", highlight: true },
    { text: "." },
  ],
  paragraphs: [
    "Sou Matheus Bezerra, engenheiro de software formado em Ciência da Computação. Trabalho na construção e evolução de produtos digitais, transformando necessidades de negócio em soluções claras, funcionais e preparadas para crescer.",
    "Minha trajetória começou com forte atuação em interfaces e experiência do usuário e evoluiu para arquitetura de software, back-end, bancos de dados, mensageria e integrações. Essa visão ampla me permite compreender e desenvolver produtos de ponta a ponta.",
    "Já participei de sistemas internos, CRMs, produtos SaaS, e-commerces, plataformas operacionais, aplicações mobile e landing pages, contribuindo também com estruturação de conteúdo e copy, sempre buscando equilibrar qualidade técnica, experiência do usuário e objetivos do negócio.",
  ],
  /** No mobile, o 2º parágrafo aparece sem a última frase (versão aprovada). */
  secondParagraphMobile:
    "Minha trajetória começou com forte atuação em interfaces e experiência do usuário e evoluiu para arquitetura de software, back-end, bancos de dados, mensageria e integrações.",
  readMoreLabel: "Ler mais",
  readLessLabel: "Ler menos",
  cvPrompt: "Quer conhecer minha experiência em mais detalhes?",
  cvLabel: "Ver currículo completo",
  facts: [
    { label: "Formação", value: "Ciência da Computação" },
    { label: "Atuação", value: "Sites, sistemas de ponta a ponta, aplicativos e APIs" },
    {
      label: "Especialidade",
      value: "Engenharia e arquitetura de software, produtos digitais e integrações",
    },
    { label: "Abordagem", value: "Visão técnica e de produto conectando tecnologia, UX e negócio" },
  ],
} as const;
