import { ArrowUp } from "@/components/icons";
import { TextLink } from "@/components/ui/TextLink";
import { footerNavigation } from "@/content/navigation";
import { social } from "@/content/contact";
import { site } from "@/content/site";

const linkClass =
  "flex min-h-11 items-center text-[14px] text-text transition-colors duration-200 ease-(--ease-standard) hover:text-accent active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0 md:min-h-0";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell flex flex-col gap-8 pt-12 pb-8 lg:gap-12 lg:pt-14 lg:pb-10">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
          <div className="flex flex-col gap-3.5 lg:col-span-5 lg:gap-[18px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG oficial da marca */}
            <img
              src={site.logo.src}
              alt="Matheus Bezerra"
              width={site.logo.width}
              height={site.logo.height}
              loading="lazy"
              className="h-7 w-auto self-start lg:h-10"
            />
            <p className="max-w-[360px] type-small">{site.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-6 lg:col-start-7 lg:grid-cols-2 lg:gap-6">
            <nav aria-label="Rodapé" className="flex flex-col gap-1 md:gap-3">
              <span className="mb-1.5 type-tag md:mb-1">Navegação</span>
              {footerNavigation.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-1 md:gap-3">
              <span className="mb-1.5 type-tag md:mb-1">Links</span>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn<span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                GitHub<span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <TextLink
                href={site.cvHref}
                target="_blank"
                rel="noopener"
                className="flex min-h-11 items-center self-start text-[14px] md:min-h-0"
              >
                Ver currículo (PDF)
              </TextLink>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-5 lg:pt-6">
          <span className="type-meta">© {new Date().getFullYear()} Matheus Bezerra</span>
          <a
            href="#inicio"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-control px-4 text-[13px] font-medium text-text transition-[background-color,border-color,transform] duration-200 ease-(--ease-standard) hover:border-text hover:bg-white/6 active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0 lg:px-[18px]"
          >
            <span className="lg:hidden">Topo</span>
            <span className="hidden lg:inline">Voltar ao topo</span>
            <ArrowUp
              size={14}
              className="transition-transform duration-200 ease-(--ease-standard) group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
