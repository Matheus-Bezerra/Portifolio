/**
 * Tipos de conteúdo. O formato foi pensado para que os dados estáticos em
 * `content/` possam ser substituídos por consultas (ex.: Supabase/PostgreSQL)
 * sem alterar os componentes.
 */

export type SectionId =
  | "inicio"
  | "sobre"
  | "servicos"
  | "como-trabalho"
  | "experiencia"
  | "tecnologias"
  | "trabalhos"
  | "contato";

export interface NavItem {
  id: SectionId;
  label: string;
}

/** Tipos de projeto aceitos no formulário; também usados pelos CTAs dos serviços. */
export type ProjectType = "site" | "sistema" | "aplicativo" | "api" | "outro";

export type ServiceIllustrationKind = "site" | "dashboard" | "mobile" | "api";

export interface Service {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  projectType: ProjectType;
  illustration: ServiceIllustrationKind;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  descriptionStatic?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  description: string;
  /** Versão resumida aprovada para o mobile. */
  descriptionShort: string;
  technologies: string[];
  order: number;
}

export interface TechnologyGroup {
  id: string;
  title: string;
  items: { name: string; primary?: boolean }[];
}

export type ProjectTier = "featured" | "secondary" | "complementary";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  /** Rótulo mais curto usado no mobile, quando aprovado no design. */
  shortLabel?: string;
  href: string;
  kind: "case" | "demo" | "code";
}

export interface Project {
  slug: string;
  name: string;
  tier: ProjectTier;
  order: number;
  category: string;
  headline?: string;
  summary: string;
  summaryShort?: string;
  problem?: string;
  role?: string;
  technologies?: string[];
  /** Quantidade de tecnologias adicionais, exibida como "+N". */
  moreTechnologies?: number;
  links: ProjectLink[];
  /** Capa oficial. Enquanto ausente, é exibida uma moldura neutra. */
  image?: ProjectImage;
  imageMobile?: ProjectImage;
}
