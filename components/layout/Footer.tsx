import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories, company, nav, services, whatsappLink } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="hazard h-2 w-full opacity-90" aria-hidden />
      <div className="blueprint absolute inset-0 opacity-40" aria-hidden />

      <div className="container-x relative grid gap-12 pb-12 pt-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image
            src="/images/brand/logo-light.png"
            alt="Think Build — Constructions & Contracting"
            width={1080}
            height={397}
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
            Think Build is a leading exporter and supplier of advanced construction materials and chemical systems,
            serving Europe, the Gulf region, and Africa. As the exclusive agent of Polymar EG, we provide certified
            epoxy compounds, concrete additives, sealants, and waterproofing solutions built to meet international
            standards.
          </p>
          <p className="mt-4 font-display text-sm font-semibold text-brand">
            Building global trust through quality, innovation, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h3 className="eyebrow text-white/50">Company</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/75 transition hover:text-brand">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-white/50">Products</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`} className="text-white/75 transition hover:text-brand">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="eyebrow text-white/50">Services</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/75 transition hover:text-brand">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-4 border-t border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <a href={`tel:${company.phoneIntl}`} className="group flex items-center gap-3 text-sm text-white/75 hover:text-white">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 text-brand transition group-hover:bg-brand group-hover:text-ink">
            <Phone className="h-4 w-4" />
          </span>
          {company.phoneDisplay}
        </a>
        <a
          href={whatsappLink("Hello Think Build, I'd like to ask about your products.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-sm text-white/75 hover:text-white"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 text-brand transition group-hover:bg-brand group-hover:text-ink">
            <MessageCircle className="h-4 w-4" />
          </span>
          WhatsApp {company.whatsappDisplay}
        </a>
        <a href={`mailto:${company.email}`} className="group flex items-center gap-3 text-sm text-white/75 hover:text-white">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 text-brand transition group-hover:bg-brand group-hover:text-ink">
            <Mail className="h-4 w-4" />
          </span>
          {company.email}
        </a>
        <div className="flex items-center gap-3 text-sm text-white/75">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 text-brand">
            <MapPin className="h-4 w-4" />
          </span>
          {company.addressShort}
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10">
        <p
          aria-hidden
          className="h-display pointer-events-none select-none whitespace-nowrap py-4 text-center text-[17vw] leading-none text-white/[0.04]"
        >
          think build
        </p>
      </div>

      <div className="container-x relative flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Think Build. All rights reserved.</p>
        <p>Designed by Think Advertising Company</p>
      </div>
    </footer>
  );
}
