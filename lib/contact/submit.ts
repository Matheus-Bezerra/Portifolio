import type { ContactData } from "@/lib/validations/contact";

export type ContactResult =
  | { status: "success" }
  | { status: "error"; message?: string }
  /** Etapa atual: o destino do formulário ainda não está configurado. */
  | { status: "unavailable" };

/**
 * Ponto único de integração do formulário de contato.
 *
 * Nesta etapa não existe envio real: a função devolve "unavailable" e a
 * interface orienta o uso dos contatos diretos — nunca um falso sucesso.
 *
 * Próxima etapa: substituir o corpo por uma chamada a uma Server Action
 * (ex.: `app/actions/contact.ts` com "use server", validando novamente com
 * `contactSchema` e gravando no Supabase/PostgreSQL). O componente
 * `ContactForm` não precisa ser alterado.
 */
export async function submitContact(data: ContactData): Promise<ContactResult> {
  void data;
  // Breve espera para que o estado de carregamento seja perceptível e honesto.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { status: "unavailable" };
}
