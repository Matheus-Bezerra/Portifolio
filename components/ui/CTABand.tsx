import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";

interface CTABandProps {
  question: string;
  label: string;
  href: string;
}

/** Faixa de chamada no fim de "Como trabalho" e de "Trabalhos". */
export function CTABand({ question, label, href }: CTABandProps) {
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
      <ButtonLink href={href} fullWidthMobile className="shrink-0">
        {label}
      </ButtonLink>
    </Reveal>
  );
}
