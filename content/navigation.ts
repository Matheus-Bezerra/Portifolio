import type { NavItem, SectionId } from "@/types/content";

export const navigation: NavItem[] = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "experiencia", label: "Experiência" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "trabalhos", label: "Trabalhos" },
  { id: "contato", label: "Contato" },
];

/** Links do rodapé (design: Sobre, Serviços, Trabalhos, Contato). */
export const footerNavigation: NavItem[] = navigation.filter((item) =>
  (["sobre", "servicos", "trabalhos", "contato"] as SectionId[]).includes(item.id),
);

/**
 * Seções observadas pelo scroll-spy e o item de navegação que cada uma ativa.
 * "Como trabalho" continua ativando "Serviços".
 */
export const spySections: { id: SectionId; nav: SectionId }[] = [
  { id: "inicio", nav: "inicio" },
  { id: "sobre", nav: "sobre" },
  { id: "servicos", nav: "servicos" },
  { id: "como-trabalho", nav: "servicos" },
  { id: "experiencia", nav: "experiencia" },
  { id: "tecnologias", nav: "tecnologias" },
  { id: "trabalhos", nav: "trabalhos" },
  { id: "contato", nav: "contato" },
];
