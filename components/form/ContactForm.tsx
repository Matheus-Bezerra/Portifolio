"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { AlertCircle, ArrowRight, Check, ChevronDown, InfoCircle } from "@/components/icons";
import { formCopy, projectTypeOptions, social } from "@/content/contact";
import { submitContact } from "@/lib/contact/submit";
import type { ContactErrors, ContactField, ContactInput } from "@/lib/validations/contact";
import { formFeedback } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Field, controlClasses, type FieldState } from "./Field";
import { PREFILL_EVENT, type PrefillDetail } from "./prefill";

type Status = "idle" | "submitting" | "unavailable" | "success" | "error";

/**
 * A validação (zod, ~100 KB) fica fora do carregamento inicial da página:
 * só é baixada quando o formulário chega perto da tela ou recebe a primeira interação.
 */
type Validation = typeof import("@/lib/validations/contact");
let validation: Validation | null = null;
let validationLoading: Promise<Validation> | null = null;
function loadValidation(): Promise<Validation> {
  validationLoading ??= import("@/lib/validations/contact").then((mod) => (validation = mod));
  return validationLoading;
}
/** Roda `fn` com a validação carregada (na hora, se já estiver; senão, assim que chegar). */
function withValidation(fn: (v: Validation) => void) {
  if (validation) fn(validation);
  else void loadValidation().then(fn);
}

const initialValues: ContactInput = {
  name: "",
  email: "",
  company: "",
  reason: "projeto",
  projectType: "",
  message: "",
};

const fieldOrder: ContactField[] = ["name", "email", "company", "reason", "projectType", "message"];

const fieldLabel: Record<ContactField, string> = {
  name: formCopy.name.label,
  email: formCopy.email.label,
  company: formCopy.company.label,
  reason: formCopy.reason.legend,
  projectType: formCopy.projectType.label,
  message: formCopy.message.label,
};

export function ContactForm() {
  const uid = useId();
  const ids = Object.fromEntries(fieldOrder.map((f) => [f, `contato-${f}-${uid}`])) as Record<
    ContactField,
    string
  >;
  const reduce = useReducedMotion();
  const [values, setValues] = useState<ContactInput>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState<ContactField[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* Pré-carrega a validação quando o formulário se aproxima da tela */
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          void loadValidation();
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Pré-seleção vinda de "Conversar sobre isso" nos palcos de Serviços */
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { projectType } = (event as CustomEvent<PrefillDetail>).detail;
      setValues((v) => ({ ...v, reason: "projeto", projectType }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (summary.length > 0) summaryRef.current?.focus();
  }, [summary]);

  const submitting = status === "submitting";

  const update = <K extends ContactField>(field: K, value: ContactInput[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (status === "unavailable" || status === "error") setStatus("idle");
    if (touched[field] || errors[field]) {
      withValidation((v) =>
        setErrors((e) => ({ ...e, [field]: v.validateContactField(field, next) })),
      );
    }
  };

  const blur = (field: ContactField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    withValidation((v) =>
      setErrors((e) => ({ ...e, [field]: v.validateContactField(field, values) })),
    );
  };

  const stateOf = (field: ContactField): FieldState => {
    if (errors[field]) return "invalid";
    const value = values[field];
    if (touched[field] && typeof value === "string" && value.trim() !== "") return "valid";
    return "default";
  };

  const describedBy = (field: ContactField, extra?: string) =>
    [errors[field] ? `${ids[field]}-erro` : null, extra].filter(Boolean).join(" ") || undefined;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const result = (await loadValidation()).validateContact(values);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    if (!result.success) {
      setErrors(result.errors);
      setSummary(fieldOrder.filter((f) => result.errors[f]));
      setStatus("idle");
      return;
    }
    setErrors({});
    setSummary([]);
    setStatus("submitting");
    const response = await submitContact(result.data);
    setStatus(response.status);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const isProject = values.reason === "projeto";
  const messageLength = values.message.length;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="contato-titulo"
      className="flex flex-col gap-[22px] rounded-band border border-line bg-surface p-5 md:p-10"
    >
      <AnimatePresence initial={false}>
        {summary.length > 0 && (
          <m.div
            key="summary"
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            variants={formFeedback}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 rounded-field border border-error/60 bg-error/8 p-4 outline-none focus-visible:outline-2 focus-visible:outline-error"
          >
            <p className="flex items-center gap-2 text-[14px] font-semibold text-text">
              <AlertCircle size={18} className="text-error" />
              {formCopy.errorSummary(summary.length)}
            </p>
            <ul className="flex flex-col gap-1 pl-7">
              {summary.map((field) => (
                <li key={field}>
                  <a
                    href={`#${ids[field]}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(ids[field])?.focus();
                    }}
                    className="text-[13px] text-link"
                  >
                    {fieldLabel[field]}: {errors[field]}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>

      <fieldset disabled={submitting} className="contents">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-4">
          <Field
            id={ids.name}
            label={formCopy.name.label}
            required
            error={errors.name}
            state={stateOf("name")}
          >
            <input
              id={ids.name}
              name="name"
              type="text"
              autoComplete="name"
              placeholder={formCopy.name.placeholder}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => blur("name")}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className={controlClasses(stateOf("name"), "h-[52px] pr-11")}
            />
          </Field>
          <Field
            id={ids.email}
            label={formCopy.email.label}
            required
            error={errors.email}
            state={stateOf("email")}
          >
            <input
              id={ids.email}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={formCopy.email.placeholder}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => blur("email")}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className={controlClasses(stateOf("email"), "h-[52px] pr-11")}
            />
          </Field>
        </div>

        <Field
          id={ids.company}
          label={formCopy.company.label}
          optionalText={formCopy.company.optional}
          error={errors.company}
          state={errors.company ? "invalid" : "default"}
        >
          <input
            id={ids.company}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={formCopy.company.placeholder}
            value={values.company ?? ""}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => blur("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
            className={controlClasses(errors.company ? "invalid" : "default", "h-[52px] pr-11")}
          />
        </Field>

        {/* Escolha segmentada — radios reais */}
        <fieldset className="flex flex-col gap-2" aria-describedby={describedBy("reason")}>
          <legend className="mb-2 p-0 text-[13px] font-medium text-text">
            {formCopy.reason.legend}
            <span aria-hidden="true" className="text-accent">
              {" "}
              *
            </span>
          </legend>
          <div className="grid grid-cols-2 rounded-full border border-control p-1">
            {(
              [
                { value: "projeto", label: formCopy.reason.project },
                {
                  value: "oportunidade",
                  label: formCopy.reason.opportunity,
                  short: formCopy.reason.opportunityShort,
                },
              ] as const
            ).map((option) => {
              const checked = values.reason === option.value;
              return (
                <label
                  key={option.value}
                  className={cn(
                    "relative flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-2 text-center text-[14px] transition-colors duration-200",
                    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                    checked
                      ? "bg-text font-semibold text-bg"
                      : "font-medium text-text-2 hover:text-text",
                  )}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={checked}
                    onChange={() => update("reason", option.value)}
                    className="sr-only"
                  />
                  {checked && <Check size={16} />}
                  {"short" in option ? (
                    <>
                      <span className="sm:hidden">{option.short}</span>
                      <span className="hidden sm:inline">{option.label}</span>
                    </>
                  ) : (
                    option.label
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>

        <AnimatePresence initial={false}>
          {isProject && (
            <m.div
              key="tipo"
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="-m-1 overflow-hidden p-1"
            >
              <Field
                id={ids.projectType}
                label={formCopy.projectType.label}
                error={errors.projectType}
                state="default"
                inlineIcon={false}
              >
                <select
                  id={ids.projectType}
                  name="projectType"
                  value={values.projectType ?? ""}
                  onChange={(e) =>
                    update("projectType", e.target.value as ContactInput["projectType"])
                  }
                  aria-describedby={describedBy("projectType")}
                  className={controlClasses(
                    "default",
                    cn(
                      "h-[52px] cursor-pointer appearance-none pr-11",
                      !values.projectType && "text-text-3",
                    ),
                  )}
                >
                  <option value="">{formCopy.projectType.placeholder}</option>
                  {projectTypeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-2"
                />
              </Field>
            </m.div>
          )}
        </AnimatePresence>

        <Field
          id={ids.message}
          label={formCopy.message.label}
          required
          error={errors.message}
          state={stateOf("message")}
          inlineIcon={false}
          aside={
            <span
              id={`${ids.message}-contador`}
              className="shrink-0 text-[12px] text-text-3 tabular-nums"
            >
              {messageLength} / {formCopy.message.max}
            </span>
          }
        >
          <textarea
            data-lenis-prevent
            id={ids.message}
            name="message"
            rows={5}
            maxLength={formCopy.message.max}
            placeholder={formCopy.message.placeholder}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", `${ids.message}-contador`)}
            className={controlClasses(
              stateOf("message"),
              "block h-36 resize-y py-3.5 leading-[22px]",
            )}
          />
        </Field>
      </fieldset>

      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[320px] text-[12px] leading-[18px] text-text-3">{formCopy.privacy}</p>
        <button
          type="submit"
          aria-busy={submitting}
          aria-disabled={submitting}
          className={cn(
            "group/submit inline-flex h-[52px] w-full shrink-0 items-center justify-center gap-2.5 rounded-full px-[26px] text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 md:w-auto",
            "bg-accent text-bg hover:bg-accent-hover focus-visible:outline-text active:translate-y-px active:bg-accent-pressed",
            submitting && "cursor-progress",
          )}
        >
          {submitting ? (
            <>
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg motion-reduce:animate-none"
              />
              {formCopy.submitting}
            </>
          ) : (
            <>
              {formCopy.submit}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 ease-(--ease-standard) group-hover/submit:translate-x-1 group-focus-visible/submit:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </>
          )}
        </button>
      </div>

      {/* Anúncio de resultado. Nesta etapa: formulário em configuração (nunca falso sucesso). */}
      <div role="status" aria-live="polite">
        <AnimatePresence initial={false}>
          {status === "unavailable" && (
            <m.div
              key="unavailable"
              ref={statusRef}
              tabIndex={-1}
              variants={formFeedback}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex gap-3 rounded-field border border-line-strong bg-bg p-4 outline-none"
            >
              <InfoCircle size={20} className="mt-0.5 shrink-0 text-accent" />
              <div className="flex flex-col gap-1">
                <p className="text-[14px] font-semibold text-text">{formCopy.unavailableTitle}</p>
                <p className="type-small">{formCopy.unavailableText}</p>
                <p className="mt-1 flex flex-wrap gap-x-5 text-[14px]">
                  <a
                    href={social.emailHref}
                    className="flex min-h-11 items-center text-link md:min-h-0"
                  >
                    E-mail
                  </a>
                  <a
                    href={social.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-link md:min-h-0"
                  >
                    WhatsApp<span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
