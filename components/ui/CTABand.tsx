import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";

interface CTABandProps {
  question: string;
  label: string;
  href: string;
  /** Abre em nova aba (WhatsApp, GitHub). */
  external?: boolean;
  /** Botão de contorno, para chamadas que não são "Conversar sobre um projeto". */
  secondary?: boolean;
}

/** Faixa de chamada no fim de "Como trabalho" (WhatsApp) e de "Trabalhos" (GitHub). */
export function CTABand({ question, label, href, external, secondary }: CTABandProps) {
  return (
    <Reveal
      variant="fadeUp"
      className="flex flex-col gap-5 rounded-band border border-line bg-surface px-5 py-7 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-8"
    >
      <SplitWords
        as="p"
        className="font-display text-[20px] leading-7 font-semibold md:text-[24px] md:leading-8"
        text={question}
        delay={0.15}
      />
      <ButtonLink
        href={href}
        variant={secondary ? "secondary" : "primary"}
        arrow
        fullWidthMobile
        className="shrink-0"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      >
        {label}
        {external && <span className="sr-only"> (abre em nova aba)</span>}
      </ButtonLink>
    </Reveal>
  );
}
