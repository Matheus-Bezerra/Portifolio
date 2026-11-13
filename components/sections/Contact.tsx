import { Chat, GitHub, Mail, Person } from "@/components/icons";
import { ContactForm } from "@/components/form/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { SplitWords } from "@/components/motion/SplitWords";
import { contactChannels, contactIntro, type ContactChannelIcon } from "@/content/contact";

const icons: Record<ContactChannelIcon, typeof Mail> = {
  mail: Mail,
  chat: Chat,
  person: Person,
  github: GitHub,
};

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="border-t border-line section-y"
    >
      {/* Desktop: 5 colunas de texto e links + 7 de formulário. Mobile: o formulário vem antes dos contatos diretos. */}
      <div className="shell flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-6 lg:gap-y-6">
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

        <Reveal
          variant="fadeUp"
          className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
        >
          <ContactForm />
        </Reveal>

        <Reveal
          variant="fadeUp"
          className="flex flex-col gap-6 lg:col-span-5 lg:row-start-2 lg:pr-8"
        >
          <p className="border-l-2 border-accent py-1 pl-3.5 type-small text-text lg:pl-4">
            {contactIntro.secondary}
          </p>
          <div className="mt-2 flex flex-col">
            <p className="mb-1.5 type-tag">{contactIntro.directLabel}</p>
            <ul>
              {contactChannels.map((channel) => {
                const Icon = icons[channel.icon];
                return (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : null)}
                      className="group flex h-14 items-center gap-3.5 border-b border-line text-[15px] font-medium text-text transition-colors hover:text-accent"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-text-2 transition-colors group-hover:border-accent group-hover:text-accent"
                      >
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0 truncate">{channel.label}</span>
                      {channel.external && <span className="sr-only"> (abre em nova aba)</span>}
                      <span
                        aria-hidden="true"
                        className="ml-auto text-text-2 transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        {channel.id === "linkedin" || channel.id === "github" ? "↗" : "→"}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
