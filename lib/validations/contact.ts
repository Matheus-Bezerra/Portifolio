import { z } from "zod";

/**
 * Schema do formulário de contato.
 * Pode ser reutilizado sem alterações pela futura Server Action.
 */
export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Informe seu nome"),
    email: z.string().trim().min(1, "Informe seu e-mail").email("Informe um e-mail válido"),
    company: z.string().trim().max(120, "Use até 120 caracteres").optional().or(z.literal("")),
    reason: z.enum(["projeto", "oportunidade"], { error: "Escolha o motivo do contato" }),
    projectType: z
      .enum(["site", "sistema", "aplicativo", "api", "outro"])
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(1, "Escreva sua mensagem")
      .max(1000, "Use até 1000 caracteres"),
  })
  .transform((data) => ({
    ...data,
    // O tipo de projeto só faz sentido quando o motivo é "projeto".
    projectType: data.reason === "projeto" ? data.projectType || undefined : undefined,
    company: data.company || undefined,
  }));

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactErrors = Partial<Record<ContactField, string>>;

/** Valida e devolve erros por campo (primeira mensagem de cada um). */
export function validateContact(
  input: ContactInput,
): { success: true; data: ContactData } | { success: false; errors: ContactErrors } {
  const result = contactSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}

/** Valida um único campo (usado no blur). */
export function validateContactField(field: ContactField, input: ContactInput): string | undefined {
  const result = validateContact(input);
  return result.success ? undefined : result.errors[field];
}
