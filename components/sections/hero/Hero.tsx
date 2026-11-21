import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CodeBrackets, CurlyBraces, GitBranch, Terminal } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { hero } from "@/content/hero";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { SplitWords } from "@/components/motion/SplitWords";
import {
  HeroItem,
  HeroPointer,
  HeroScrollEntry,
  HeroSequence,
  HeroVisualPart,
  OrbitDot,
  OrbitEntry,
  OrbitStroke,
  ParallaxLayer,
  ScrollSpin,
} from "./HeroMotion";

/**
 * Composição circular construída em CSS/SVG nas medidas do design.
 * Referências: desktop 588 × 640 (colunas 7–12 em 1440) · mobile 390 × 400.
 * Acima do mobile a composição de referência é escalada por breakpoint (--s).
 */
function OrbitIcon({
  children,
  className,
  pos,
}: {
  children: ReactNode;
  className?: string;
  /** Centro do ícone: deslocamento x a partir do centro e y a partir do topo — mobile / desktop */
  pos: { mx?: number; my?: number; dx: number; dy: number };
}) {
  return (
    <span
      aria-hidden="true"
      style={
        {
          "--mx": `${pos.mx ?? 0}px`,
          "--my": `${pos.my ?? 0}px`,
          "--dx": `${pos.dx}px`,
          "--dy": `${pos.dy}px`,
        } as CSSProperties
      }
      className={cn(
        "absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface shadow-icon md:size-12",
        "top-(--my) left-[calc(50%+var(--mx))] md:top-(--dy) md:left-[calc(50%+var(--dx))]",
        className,
      )}
    >
      {children}
    </span>
  );
}

function HeroVisual() {
  return (
    <HeroPointer
      className={cn(
        "relative mx-auto h-[calc(var(--h)*var(--s))] w-full [--h:400px] [--s:1] max-[374px]:[--s:0.82]",
        "md:[--h:640px] md:[--s:0.68] lg:[--s:0.88] xl:[--s:1.04] ref:[--s:1.2]",
      )}
    >
      <div
        className={cn(
          "absolute bottom-0 left-1/2 h-(--h) w-[390px] origin-bottom -translate-x-1/2 scale-(--s) md:w-[588px]",
        )}
      >
        {/* Anéis e disco */}
        <HeroVisualPart part="orbit" className="absolute inset-0">
          {/* Anel laranja + 3 pontos: se traça na entrada, gira com a rolagem e reage ao mouse */}
          <div
            aria-hidden="true"
            className="absolute top-5 left-1/2 size-[330px] -translate-x-1/2 md:top-10 md:size-[540px]"
          >
            <ScrollSpin deg={120} tilt={10} shift={6} className="relative size-full">
              <OrbitStroke />
              {[-28, 62, 152].map((deg, i) => (
                <OrbitDot key={deg} deg={deg} index={i} />
              ))}
            </ScrollSpin>
          </div>
          {/* Anel tracejado: surge girando */}
          <div
            aria-hidden="true"
            className="absolute top-20 left-1/2 hidden size-[460px] -translate-x-1/2 md:block"
          >
            <OrbitEntry rotateFrom={-140} scaleFrom={0.86} delay={0.8} className="size-full">
              <ScrollSpin
                deg={-90}
                tilt={-14}
                shift={-10}
                className="size-full rounded-full border border-dashed border-text/16"
              />
            </OrbitEntry>
          </div>
          {/* Disco com brilho radial */}
          <div
            aria-hidden="true"
            className="absolute top-20 left-1/2 size-[210px] -translate-x-1/2 rounded-full md:top-[150px] md:size-80"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%), var(--color-surface-deep)",
            }}
          />
        </HeroVisualPart>

        {/* Retrato oficial — apenas posicionado e recortado (object-fit: cover), sem alterar pixels */}
        <HeroVisualPart
          part="portrait"
          className="absolute bottom-0 left-1/2 h-[370px] w-60 -translate-x-1/2 overflow-hidden md:h-[620px] md:w-[400px]"
        >
          <Image
            src={site.portrait.src}
            alt={site.portrait.alt}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1440px) 840px, (min-width: 768px) 700px, 560px"
            className="object-cover object-[50%_0%]"
          />
        </HeroVisualPart>

        {/* Ícones genéricos de código — sem flutuação; só se deslocam com o mouse */}
        <HeroVisualPart part="icons" className="absolute inset-0">
          <ParallaxLayer shift={16} className="absolute inset-0">
            <OrbitIcon pos={{ mx: -155, my: 140, dx: -230, dy: 224 }}>
              <CodeBrackets className="text-accent" size={22} />
            </OrbitIcon>
            <OrbitIcon pos={{ mx: 159, my: 84, dx: 242, dy: 154 }}>
              <Terminal className="text-text" size={22} />
            </OrbitIcon>
            <OrbitIcon pos={{ mx: 153, my: 270, dx: 234, dy: 434 }}>
              <CurlyBraces className="text-text" size={22} />
            </OrbitIcon>
            <OrbitIcon pos={{ dx: -200, dy: 494 }} className="hidden md:flex">
              <GitBranch className="text-text-2" size={22} />
            </OrbitIcon>
          </ParallaxLayer>
        </HeroVisualPart>
      </div>
    </HeroPointer>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative overflow-hidden pt-24 md:pt-28 lg:pb-14 xl:pt-20 xl:pb-0"
    >
      {/* Brilho laranja amplo atrás da composição (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[140px] -right-[120px] hidden size-[900px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 60%)",
        }}
      />

      <div className="relative shell grid grid-cols-1 gap-y-9 md:grid-cols-12 md:gap-x-6 lg:items-center">
        <HeroSequence className="relative z-10 flex flex-col gap-5 md:col-span-6 md:py-12 lg:-mr-6 lg:gap-7 lg:py-0">
          <HeroItem>
            <p className="eyebrow text-text">{hero.eyebrow}</p>
          </HeroItem>
          <SplitWords
            as="h1"
            id="inicio-titulo"
            className="type-h1"
            text={hero.title}
            trigger="intro"
            delay={0.12}
          />
          <HeroItem>
            <p className="max-w-[540px] type-lead">{hero.lead}</p>
          </HeroItem>
          <HeroItem className="mt-1 flex flex-col gap-3 sm:max-md:flex-row sm:max-md:items-center lg:mt-2 lg:flex-row lg:items-center lg:gap-4">
            <ButtonLink
              href={hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              fullWidthMobile
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg" fullWidthMobile>
              {hero.secondaryCta.label}
            </ButtonLink>
          </HeroItem>
        </HeroSequence>

        <HeroScrollEntry className="-mx-5 md:col-span-6 md:col-start-7 md:mx-0 md:translate-x-6 md:self-center lg:translate-x-8 xl:translate-x-12 ref:translate-x-24">
          <HeroVisual />
        </HeroScrollEntry>
      </div>

      {/* Degradê de 120 px que funde a abertura com a próxima seção */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-linear-to-b from-bg/0 to-bg"
      />
    </section>
  );
}
