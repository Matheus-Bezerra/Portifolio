/** Junta classes condicionais. Suficiente para o projeto; sem dependência extra. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formata um índice (0-based) como "01", "02"… */
export function pad2(index: number): string {
  return String(index + 1).padStart(2, "0");
}
