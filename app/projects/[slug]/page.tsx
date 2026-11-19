import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ServiceIcon } from "@/components/cards/ServiceIcon";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CTASection } from "@/components/ui/CTASection";
import { getProject, getService, projects } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  const scope = p.services.map((s) => getService(s)?.title).filter(Boolean).join(", ");
  return {
    title: p.title,
    description: `${p.title} — ${scope} by Think Build.`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { images: [p.image] },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();
  const svc = p.services.map((s) => getService(s)).filter((s) => s !== undefined);
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const related = projects
    .filter((x) => x.slug !== p.slug && x.services.some((s) => p.services.includes(s)))
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-ink pb-16 pt-40 text-white">
        <Image src={p.image} alt={p.title} fill preload sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="container-x">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-brand">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <p className="eyebrow mt-10 flex w-fit text-brand">{p.sector}</p>
          <SplitText as="h1" text={p.title} inView={false} delay={0.15} className="h-display mt-5 max-w-5xl text-[clamp(2.4rem,6.5vw,5.6rem)]" />
          <div className="mt-10 flex flex-wrap gap-2">
            {svc.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm backdrop-blur transition hover:border-brand hover:text-brand"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <dl className="divide-y divide-line rounded-2xl bg-white p-7 ring-1 ring-line">
              {[
                ["Project", p.title],
                ["Sector", p.sector],
                ["Scope", svc.map((s) => s.title).join(" · ")],
                ["Contractor", "Think Build"],
              ].map(([k, v]) => (
                <div key={k} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-[0.16em] text-ink/45">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow text-brand-deep">Scope of work</p>
            <div className="mt-8 space-y-5">
              {svc.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08}>
                  <Link href={`/services/${s.slug}`} className="group flex gap-6 rounded-2xl bg-white p-7 ring-1 ring-line transition hover:ring-ink">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-ink text-brand">
                      <ServiceIcon name={s.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight">
                        {s.title}
                        <ArrowUpRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" />
                      </h2>
                      <p className="mt-2 leading-relaxed text-ink/65">{s.description}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="grid border-y border-line bg-white sm:grid-cols-2" aria-label="Project navigation">
        <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-5 border-b border-line p-8 sm:border-b-0 sm:border-r lg:p-12">
          <ArrowLeft className="h-6 w-6 shrink-0 transition group-hover:-translate-x-1" />
          <span>
            <span className="block text-xs uppercase tracking-[0.18em] text-ink/45">Previous</span>
            <span className="mt-1 block font-display text-xl font-extrabold tracking-tight group-hover:text-brand-deep">{prev.title}</span>
          </span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group flex items-center justify-end gap-5 p-8 text-right lg:p-12">
          <span>
            <span className="block text-xs uppercase tracking-[0.18em] text-ink/45">Next</span>
            <span className="mt-1 block font-display text-xl font-extrabold tracking-tight group-hover:text-brand-deep">{next.title}</span>
          </span>
          <ArrowRight className="h-6 w-6 shrink-0 transition group-hover:translate-x-1" />
        </Link>
      </nav>

      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="container-x">
            <h2 className="h-display text-[clamp(2rem,4vw,3.4rem)]">Similar projects</h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
