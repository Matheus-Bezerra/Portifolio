import { ArrowRight } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { TechInline } from "@/components/ui/TechInline";
import { TextLink } from "@/components/ui/TextLink";
import { workIntro } from "@/content/projects";
import type { Project, ProjectLink } from "@/types/content";
import { cn } from "@/lib/utils";

const cardBase =
  "group rounded-card border bg-surface transition-[border-color,translate] duration-200 ease-(--ease-standard) hover:-translate-y-0.5 hover:border-separator focus-within:border-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

function linkOf(project: Project, kind: ProjectLink["kind"]) {
  return project.links.find((l) => l.kind === kind);
}

function ResponsiveLabel({ link }: { link: ProjectLink }) {
  if (!link.shortLabel) return <>{link.label}</>;
  return (
    <>
      <span className="md:hidden">{link.shortLabel}</span>
      <span className="hidden md:inline">{link.label}</span>
    </>
  );
}

/** Card L — Copa Manager (projeto em destaque). */
export function FeaturedProjectCard({ project }: { project: Project }) {
  const caseLink = linkOf(project, "case");
  const demo = linkOf(project, "demo");
  const code = linkOf(project, "code");
  return (
    <article
      className={cn(
        cardBase,
        "flex flex-col gap-3.5 border-line-strong p-3 shadow-[inset_0_2px_0_var(--color-accent)] md:p-5 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0",
      )}
    >
      <ProjectMedia
        name={project.name}
        image={project.image}
        sizes="(min-width: 1024px) 680px, 100vw"
        className="h-[210px] md:h-[360px] lg:col-span-7 lg:h-[460px]"
      />
      <div className="flex flex-col gap-2.5 px-1.5 pt-1 pb-1.5 md:gap-4 lg:col-span-5 lg:col-start-8 lg:py-3 lg:pr-3 lg:pl-4">
        <p className="type-meta text-[12px] md:text-[13px]">
          <span className="font-semibold text-accent">{workIntro.featuredLabel}</span> ·{" "}
          {project.category}
        </p>
        <h3 className="font-display text-[24px] leading-8 font-semibold tracking-[-0.015em] md:text-[30px] md:leading-[38px]">
          <span className="card-title">{project.name}</span>
        </h3>
        <p className="text-[15px] leading-[22px] font-medium text-text md:text-[17px] md:leading-[26px]">
          {project.headline}
        </p>
        <p className="type-small md:hidden">{project.summaryShort ?? project.summary}</p>
        <p className="hidden type-small md:block md:text-[15px] md:leading-6">{project.summary}</p>
        {(project.problem || project.role) && (
          <dl className="hidden grid-cols-[96px_1fr] gap-x-3 gap-y-2.5 border-y border-line py-3.5 md:grid">
            {project.problem && (
              <>
                <dt className="type-small font-semibold text-text">Problema</dt>
                <dd className="type-small">{project.problem}</dd>
              </>
            )}
            {project.role && (
              <>
                <dt className="type-small font-semibold text-text">Papel</dt>
                <dd className="type-small">{project.role}</dd>
              </>
            )}
          </dl>
        )}
        {project.technologies && (
          <TechInline
            items={project.technologies}
            className="text-[12px] md:text-[13px]"
          />
        )}
        <div className="mt-1 flex flex-col gap-0 md:mt-auto md:flex-row md:flex-wrap md:items-center md:gap-6">
          {caseLink && (
            <a
              href={caseLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({
                variant: "secondary",
                size: "case",
                fullWidthMobile: true,
                className: "group/cta",
              })}
            >
              {caseLink.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 ease-(--ease-standard) group-hover/cta:translate-x-0.5 group-focus-visible/cta:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          )}
          <div className="flex gap-6">
            {demo && (
              <TextLink
                href={demo.href}
                external
                className="flex min-h-11 items-center text-[14px]"
              >
                <ResponsiveLabel link={demo} />
              </TextLink>
            )}
            {code && (
              <TextLink
                href={code.href}
                external
                className="flex min-h-11 items-center text-[14px]"
              >
                <ResponsiveLabel link={code} />
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Card M — FiscalFlow (segundo destaque). */
export function SecondaryProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        cardBase,
        "flex flex-col gap-3 border-line p-3 md:p-5 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:gap-y-0",
      )}
    >
      <ProjectMedia
        name={project.name}
        image={project.image}
        sizes="(min-width: 1024px) 680px, 100vw"
        className="h-40 md:h-[240px] lg:col-span-7 lg:h-[260px]"
      />
      <div className="flex flex-col gap-2 px-1.5 pt-1 pb-1.5 md:gap-3 lg:col-span-5 lg:col-start-8 lg:py-2 lg:pr-3 lg:pl-4">
        <p className="type-meta text-[12px] md:text-[13px]">{project.category}</p>
        <h3 className="font-display text-[20px] leading-7 font-semibold md:text-[26px] md:leading-[34px]">
          <span className="card-title">{project.name}</span>
        </h3>
        <p className="text-[15px] leading-[22px] font-medium text-text md:text-[16px] md:leading-6">
          {project.headline}
        </p>
        <p className="type-small">{project.summary}</p>
        {project.technologies && (
          <TechInline items={project.technologies} className="text-[12px] md:text-[13px]" />
        )}
        {project.links.map((link) => (
          <TextLink
            key={link.href}
            href={link.href}
            external
            className="flex min-h-11 items-center self-start text-[14px] md:mt-1.5 md:min-h-0"
          >
            {link.label}
          </TextLink>
        ))}
      </div>
    </article>
  );
}

/** Card S — trabalhos complementares (4 colunas; no mobile, horizontal com miniatura 1:1). */
export function ComplementaryProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        cardBase,
        "flex h-full items-start gap-3.5 border-line p-3 md:flex-col md:gap-3 md:p-4",
      )}
    >
      <ProjectMedia
        name={project.name}
        image={project.image}
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 96px"
        className="size-24 shrink-0 md:h-[170px] md:w-full"
      />
      <div className="flex min-w-0 flex-col gap-1.5 md:gap-3">
        <p className="mt-1 hidden type-meta md:block">{project.category}</p>
        <h4 className="font-display text-[16px] leading-[22px] font-semibold md:text-[19px] md:leading-[26px]">
          <span className="card-title">{project.name}</span>
        </h4>
        <p className="type-small text-[13px] leading-5 md:hidden">
          {project.summaryShort ?? project.summary}
        </p>
        <p className="hidden type-small md:block">{project.summary}</p>
        {project.technologies && (
          <TechInline items={project.technologies} className="text-[12px] md:text-[13px]" />
        )}
        {project.links.map((link) => (
          <TextLink
            key={link.href}
            href={link.href}
            external
            className="flex min-h-11 items-center self-start text-[13px] md:mt-1 md:min-h-0 md:text-[14px]"
          >
            <ResponsiveLabel link={link} />
          </TextLink>
        ))}
      </div>
    </article>
  );
}
