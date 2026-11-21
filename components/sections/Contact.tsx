import { Chat, Mail, Person } from "@/components/icons";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { SplitWords } from "@/components/motion/SplitWords";
import { ButtonLink } from "@/components/ui/Button";
import {
  contactChannels,
  contactIntro,
  whatsappLink,
  type ContactChannelIcon,
} from "@/content/contact";

const icons: Record<ContactChannelIcon, typeof Mail> = {
  mail: Mail,
  chat: Chat,
  person: Person,
};

/** Projetos vão para o WhatsApp; e-mail e LinkedIn atendem oportunidades profissionais. */
const opportunityChannels = contactChannels.filter((channel) => channel.id !== "whatsapp");

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="border-t border-line section-y"
    >
      {/* Desktop: texto à esquerda (5 colunas) e dois blocos de contato à direita (7). Mobile: tudo em coluna. */}
      <div className="shell flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
        <Reveal variant="fadeIn" className="flex flex-col gap-6 lg:col-span-5 lg:pr-8">
          <p className="eyebrow">{contactIntro.eyebrow}</p>
          <SplitWords
            as="h2"
            id="contato-titulo"
            className="type-h2 lg:type-h2-sm"
            text={contactIntro.title}
          />
          <RevealText className="type-body">{contactIntro.lead}</RevealText>
        </Reveal>

        <div className="flex flex-col gap-8 lg:col-span-7 lg:col-start-6 lg:gap-9">
          <Reveal variant="fadeUp" className="flex flex-col gap-5">
            <DrawLine className="h-px w-full bg-accent" />
            <p className="type-tag">{contactIntro.projectLabel}</p>
            <p className="type-small text-text-2">{contactIntro.projectNote}</p>
            <ButtonLink
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              fullWidthMobile
              className="group self-start [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-1 motion-reduce:[&_svg]:transition-none"
            >
              {contactIntro.whatsappCta}
              <span className="sr-only"> (abre em nova aba)</span>
            </ButtonLink>
          </Reveal>

          <div className="flex flex-col gap-5">
            <DrawLine className="h-px w-full bg-separator" delay={0.1} />
            <Reveal variant="fadeUp" delay={0.1} className="flex flex-col gap-5">
              <p className="type-tag">{contactIntro.opportunityLabel}</p>
              <p className="type-small text-text">{contactIntro.secondary}</p>
            </Reveal>
            <Stagger as="ul" gap={0.1} delay={0.2}>
              {opportunityChannels.map((channel) => {
                const Icon = icons[channel.icon];
                return (
                  <StaggerItem as="li" key={channel.id}>
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : null)}
                      className="group relative flex h-16 items-center gap-3.5 border-b border-line text-[16px] font-medium text-text transition-colors hover:text-accent"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-text-2 transition-[color,border-color,transform] duration-300 group-hover:scale-105 group-hover:border-accent group-hover:text-accent motion-reduce:transition-colors motion-reduce:group-hover:scale-100"
                      >
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0 truncate transition-transform duration-300 ease-(--ease-standard) group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                        {channel.label}
                      </span>
                      {channel.external && <span className="sr-only"> (abre em nova aba)</span>}
                      <span
                        aria-hidden="true"
                        className="ml-auto text-text-2 transition-transform duration-300 ease-(--ease-standard) group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      >
                        {channel.id === "linkedin" ? "↗" : "→"}
                      </span>
                      {/* Traço laranja que se desenha por cima do filete no hover ou foco */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-(--ease-expressive) group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                      />
                    </a>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
