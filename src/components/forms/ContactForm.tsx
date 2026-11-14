"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useId } from "react";
import { sendInquiry } from "@/app/contact/actions";
import { cn } from "@/lib/utils";
import { budgets, topics, type InquiryState } from "@/validators/inquiry";

type Option = { value: string; label: string };

type Props = {
  defaultTopic?: string;
  serviceOptions: Option[];
  /** Map of package id → "Service · Package" label, for ?package= links. */
  packageLabels?: Record<string, string>;
  productLabels?: Record<string, string>;
  showDate?: boolean;
};

/** Reads ?topic=, ?service=, ?package= and ?product= so CTAs can pre-fill the form. */
export function ContactFormFromUrl(props: Props) {
  const q = useSearchParams();
  const pkg = q.get("package");
  const product = q.get("product");
  const service = q.get("service");
  return (
    <ContactForm
      {...props}
      defaultTopic={q.get("topic") ?? props.defaultTopic}
      defaultService={(pkg && props.packageLabels?.[pkg]) || (service ? props.serviceOptions.find((o) => o.value === service)?.label : undefined)}
      defaultItem={product ? props.productLabels?.[product] : undefined}
    />
  );
}

export function ContactForm({
  defaultTopic = "project",
  defaultService,
  defaultItem,
  serviceOptions,
  showDate,
}: Props & { defaultService?: string; defaultItem?: string }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(sendInquiry, { status: "idle" });
  const id = useId();
  const v = state.values ?? {};
  const err = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-card border border-white/10 bg-surface p-8 sm:p-10">
        <span className="flex size-14 items-center justify-center rounded-full bg-blue text-2xl" aria-hidden="true">
          ✓
        </span>
        <h2 className="text-3xl font-bold tracking-[-0.03em]">Message sent.</h2>
        <p className="text-[17px] leading-relaxed text-soft">{state.message}</p>
      </div>
    );
  }

  const field = (name: string) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": err[name as keyof typeof err] ? true : undefined,
    "aria-describedby": err[name as keyof typeof err] ? `${id}-${name}-err` : undefined,
  });

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </p>
      ) : null}

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm text-muted">What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t.value}
                defaultChecked={(v.topic ?? defaultTopic) === t.value}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line-strong px-4 py-2.5 text-sm transition-colors peer-checked:border-white peer-checked:bg-white peer-checked:font-semibold peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-blue-light hover:bg-white/10">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${id}-name`} error={err.name} errId={`${id}-name-err`}>
          <input {...field("name")} autoComplete="name" required defaultValue={v.name} className={inputCls} />
        </Field>
        <Field label="Email" htmlFor={`${id}-email`} error={err.email} errId={`${id}-email-err`}>
          <input {...field("email")} type="email" autoComplete="email" required defaultValue={v.email} className={inputCls} />
        </Field>
        <Field label="Phone (optional)" htmlFor={`${id}-phone`} error={err.phone} errId={`${id}-phone-err`}>
          <input {...field("phone")} type="tel" autoComplete="tel" defaultValue={v.phone} className={inputCls} />
        </Field>
        <Field label="Service or package" htmlFor={`${id}-service`} error={err.service} errId={`${id}-service-err`}>
          <input
            {...field("service")}
            list={`${id}-services`}
            defaultValue={v.service ?? defaultService}
            placeholder="Choose or type"
            className={inputCls}
          />
          <datalist id={`${id}-services`}>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.label} />
            ))}
          </datalist>
        </Field>
        {defaultItem || v.item ? (
          <Field label="Item" htmlFor={`${id}-item`} error={err.item} errId={`${id}-item-err`}>
            <input {...field("item")} defaultValue={v.item ?? defaultItem} className={inputCls} />
          </Field>
        ) : null}
        {showDate ? (
          <Field label="Preferred date (optional)" htmlFor={`${id}-date`} error={err.date} errId={`${id}-date-err`}>
            <input {...field("date")} type="date" defaultValue={v.date} className={cn(inputCls, "[color-scheme:dark]")} />
          </Field>
        ) : (
          <Field label="Budget (optional)" htmlFor={`${id}-budget`} error={err.budget} errId={`${id}-budget-err`}>
            <select {...field("budget")} defaultValue={v.budget ?? ""} className={cn(inputCls, "appearance-none")}>
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <Field label="Tell us about it" htmlFor={`${id}-message`} error={err.message} errId={`${id}-message-err`}>
        <textarea {...field("message")} rows={6} required defaultValue={v.message} className={cn(inputCls, "resize-y")} />
      </Field>

      {/* Honeypot — hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input name="company_site" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="group/pill inline-flex items-center gap-3 rounded-full bg-white py-2.25 pr-2.25 pl-6.5 text-[17px] font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-blue transition-transform duration-300 group-hover/pill:rotate-45">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </button>
        <p className="text-sm text-muted">We reply within one working day.</p>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-2xl border border-white/12 bg-card px-4 py-3.5 text-[15px] text-text placeholder:text-muted/70 transition-colors hover:border-white/25 focus:border-blue-light focus:outline-none aria-invalid:border-red-400/70";

function Field({
  label,
  htmlFor,
  error,
  errId,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm text-soft">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errId} className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
