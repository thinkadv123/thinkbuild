"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { company, whatsappLink } from "@/lib/data";

const interests = [
  "Product supply / export",
  "Bridge expansion joints",
  "Epoxy flooring",
  "Structural strengthening",
  "Waterproofing & insulation",
  "Building construction",
  "Other",
];

type Fields = { name: string; company: string; email: string; phone: string; country: string; interest: string; message: string };

const empty: Fields = { name: "", company: "", email: "", phone: "", country: "", interest: interests[0], message: "" };

/**
 * There is no server backend: the enquiry is composed and handed to WhatsApp or the visitor's
 * email client, so nothing is lost and the team receives it on channels they already use.
 */
/** Reads `?product=` (from a product's "Request product" button) to pre-fill the enquiry. */
export function ContactFormWithParams() {
  const product = useSearchParams().get("product");
  return <ContactForm key={product ?? ""} product={product} />;
}

export function ContactForm({ product = null }: { product?: string | null }) {
  const [f, setF] = useState<Fields>(() =>
    product
      ? { ...empty, interest: "Product supply / export", message: `I would like to request ${product}. Quantity: ` }
      : empty,
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    setErrors((v) => ({ ...v, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!f.name.trim()) e.name = "Please enter your name";
    if (!f.phone.trim() && !f.email.trim()) e.phone = "Please add a phone number or email";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Please enter a valid email";
    if (!f.message.trim()) e.message = "Please tell us about your request";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const body = () =>
    [
      `Name: ${f.name}`,
      f.company && `Company: ${f.company}`,
      f.email && `Email: ${f.email}`,
      f.phone && `Phone: ${f.phone}`,
      f.country && `Country: ${f.country}`,
      `Interest: ${f.interest}`,
      "",
      f.message,
    ]
      .filter((l): l is string => typeof l === "string")
      .join("\n");

  const submit = (via: "whatsapp" | "email") => (e?: FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    if (via === "whatsapp") {
      window.open(whatsappLink(`New enquiry from thinkbuild.net\n\n${body()}`), "_blank", "noopener");
    } else {
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${f.interest} — ${f.name}`)}&body=${encodeURIComponent(body())}`;
    }
    setSent(via);
  };

  const input =
    "mt-2 w-full rounded-xl border bg-paper px-4 py-3.5 text-[15px] outline-none transition placeholder:text-ink/35 focus:border-ink focus:bg-white";
  const field = (k: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        value={f[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        className={`${input} ${errors[k] ? "border-red-500" : "border-line"}`}
        {...props}
      />
      {errors[k] && <span className="mt-1.5 block text-xs text-red-600">{errors[k]}</span>}
    </label>
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl bg-paper p-10 text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-brand-deep" />
            <h3 className="mt-6 font-display text-3xl font-extrabold">Your message is ready</h3>
            <p className="mt-3 max-w-md text-ink/65">
              {sent === "whatsapp"
                ? "We opened WhatsApp with your enquiry — just press send. One of our service representatives will reply as soon as possible."
                : "We opened your email app with your enquiry — just press send. One of our service representatives will reply as soon as possible."}
            </p>
            <button type="button" onClick={() => { setSent(null); setF(empty); }} className="mt-8 text-sm font-semibold underline">
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit("whatsapp")} noValidate className="grid gap-5 sm:grid-cols-2" exit={{ opacity: 0 }}>
            {field("name", "Full name *", { autoComplete: "name", placeholder: "Your name" })}
            {field("company", "Company", { autoComplete: "organization", placeholder: "Company name" })}
            {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "name@company.com" })}
            {field("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel", placeholder: "+20 …" })}
            {field("country", "Country", { autoComplete: "country-name", placeholder: "Country" })}
            <label className="block">
              <span className="text-sm font-semibold">I&apos;m interested in</span>
              <select value={f.interest} onChange={set("interest")} className={`${input} border-line`}>
                {interests.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Message *</span>
              <textarea
                value={f.message}
                onChange={set("message")}
                rows={5}
                aria-invalid={!!errors.message}
                placeholder="Tell us about your project, products and quantities…"
                className={`${input} resize-y ${errors.message ? "border-red-500" : "border-line"}`}
              />
              {errors.message && <span className="mt-1.5 block text-xs text-red-600">{errors.message}</span>}
            </label>
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-display text-[13px] font-bold uppercase tracking-wider text-white transition hover:bg-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={submit("email")}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-4 font-display text-[13px] font-bold uppercase tracking-wider transition hover:bg-brand"
              >
                <Mail className="h-4 w-4" /> Send via Email
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
