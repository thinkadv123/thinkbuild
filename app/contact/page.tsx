import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormWithParams } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { company, whatsappLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Think Build — ${company.addressShort}. Call ${company.phoneDisplay} or email ${company.email}.`,
  alternates: { canonical: "/contact" },
};

const cards = [
  { icon: Phone, label: "Telephone number", value: company.phoneDisplay, href: `tel:${company.phoneIntl}` },
  { icon: MessageCircle, label: "WhatsApp", value: company.whatsappDisplay, href: whatsappLink("Hello Think Build") },
  { icon: Mail, label: "E-mail", value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: "Address", value: company.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Happy to hear from you"
        intro="We at Think Build believe that building the future begins with continuous thinking and advanced designs. Leave your details and one of our service representatives will reply to you as soon as possible."
        image="/images/hero/bg.jpg"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="relative z-10 -mt-10">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-ink transition group-hover:bg-ink group-hover:text-brand">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-ink/50">{c.label}</p>
                <p className="mt-1 font-display text-lg font-bold leading-snug">{c.value}</p>
              </>
            );
            return (
              <Reveal key={c.label} delay={i * 0.07}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group block h-full rounded-2xl bg-white p-7 shadow-[0_30px_60px_-35px_rgba(26,25,29,0.45)] ring-1 ring-line transition hover:-translate-y-1"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group h-full rounded-2xl bg-white p-7 shadow-[0_30px_60px_-35px_rgba(26,25,29,0.45)] ring-1 ring-line">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand-deep">Send an enquiry</p>
            <h2 className="h-display mt-5 text-[clamp(2rem,4.5vw,3.6rem)]">Tell us about your project</h2>
            <p className="mt-4 max-w-xl text-ink/60">
              Please leave your details and one of the service representatives will reply to you as soon as possible.
            </p>
            <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-line sm:p-10">
              <Suspense fallback={<ContactForm />}>
                <ContactFormWithParams />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="space-y-5 lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-2xl ring-1 ring-line">
                <iframe
                  title="Think Build location — New Cairo"
                  src={company.mapEmbed}
                  className="h-[380px] w-full grayscale-[0.4]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="rounded-2xl bg-ink p-8 text-white">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-display text-lg font-bold">Head office</p>
                    <p className="mt-1 text-white/65">{company.address}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <Globe className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-display text-lg font-bold">Export markets</p>
                    <p className="mt-1 text-white/65">{company.markets.join(" · ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
