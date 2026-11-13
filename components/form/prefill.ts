import type { ProjectType } from "@/types/content";

/**
 * Pré-seleção do formulário a partir dos CTAs "Conversar sobre isso".
 * Um evento simples evita acoplar os palcos ao formulário.
 */
export const PREFILL_EVENT = "contato:preencher";

export interface PrefillDetail {
  projectType: ProjectType;
}

export function requestContactPrefill(projectType: ProjectType) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail: { projectType } }));
}
