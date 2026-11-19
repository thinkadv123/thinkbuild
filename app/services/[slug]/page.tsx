import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ServiceIcon } from "@/components/cards/ServiceIcon";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { PageHero } from "@/components/ui/PageHero";
import { getProjectsByService, getService, services, whatsappLink } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { images: [s.image] },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) notFound();
  const related = getProjectsByService(s.slug);
  const idx = services.findIndex((x) => x.slug === s.slug);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHero
        eyebrow={`Service ${String(idx + 1).padStart(2, "0")}`}
        title={s.title}
        intro={s.short}
        image={s.image}
        crumbs={[{ href: "/services", label: "Services" }, { label: s.title }]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-32">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
                <p className="eyebrow text-ink/50">Services</p>
                <nav className="mt-4 flex flex-col">
                  {services.map((x) => (
                    <Link
                      key={x.slug}
                      href={`/services/${x.slug}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                        x.slug === s.slug ? "bg-ink font-semibold text-white" : "text-ink/65 hover:bg-paper hover:text-ink"
                      }`}
                    >
                      {x.title}
                      {x.slug === s.slug && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="rounded-2xl bg-ink p-7 text-white">
                <p className="font-display text-xl font-extrabold">Discuss your project</p>
                <p className="mt-2 text-sm text-white/60">Get a technical recommendation from our engineers.</p>
                <a
                  href={whatsappLink(`Hello Think Build, I'd like to ask about ${s.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-white"
                >
                  WhatsApp us <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-8">
            <Reveal className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-ink">
                <ServiceIcon name={s.icon} className="h-8 w-8" />
              </span>
              <p className="eyebrow text-brand-deep">{s.title} service</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-xl leading-relaxed text-ink/80 lg:text-2xl lg:leading-relaxed">{s.description}</p>
            </Reveal>

            <ParallaxImage src={s.image} alt={s.title} className="mt-12 aspect-[16/9] rounded-2xl" sizes="(min-width:1024px) 60vw, 100vw" />

            <h2 className="mt-16 font-display text-3xl font-extrabold tracking-tight">Scope of work</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {s.scope.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.06} className="flex items-start gap-4 rounded-xl bg-white p-5 ring-1 ring-line">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-brand">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="container-x">
            <p className="eyebrow text-brand-deep">Track record</p>
            <h2 className="h-display mt-5 text-[clamp(2rem,4vw,3.4rem)]">
              {related.length} related project{related.length > 1 ? "s" : ""}
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Link href={`/services/${next.slug}`} className="group block bg-ink py-16 text-white">
        <div className="container-x flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Next service</p>
            <p className="mt-3 font-display text-[clamp(1.8rem,5vw,4rem)] font-extrabold tracking-tight transition group-hover:text-brand">
              {next.title}
            </p>
          </div>
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/20 transition group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
            <ArrowUpRight className="h-6 w-6" />
          </span>
        </div>
      </Link>

      <CTASection />
    </>
  );
}
