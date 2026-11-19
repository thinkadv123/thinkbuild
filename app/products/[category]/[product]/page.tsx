import { ArrowLeft, Check, Download, MessageCircle, Send } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withBase } from "@/lib/base-path";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CTASection } from "@/components/ui/CTASection";
import { company, getCategory, getProduct, getProductsByCategory, productImage, products, whatsappLink } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await props.params;
  const p = getProduct(category, product);
  if (!p) return {};
  const c = getCategory(p.category);
  return {
    title: `${p.name} — ${c?.name}`,
    description: p.description,
    alternates: { canonical: `/products/${p.category}/${p.slug}` },
    openGraph: { images: [productImage(p)] },
  };
}

export default async function ProductPage(props: PageProps<"/products/[category]/[product]">) {
  const { category, product } = await props.params;
  const p = getProduct(category, product);
  if (!p) notFound();
  const c = getCategory(p.category)!;
  const related = getProductsByCategory(p.category).filter((x) => x.slug !== p.slug).slice(0, 4);
  const sentences = p.description.split(/(?<=\.)\s+/).filter(Boolean);
  const lead = sentences[0];
  const rest = sentences.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${company.url}${productImage(p)}`,
    category: c.name,
    brand: { "@type": "Brand", name: "Polymar EG" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-white lg:pb-28 lg:pt-44">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="container-x relative">
          <Link href={`/products/${c.slug}`} className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-brand">
            <ArrowLeft className="h-4 w-4" /> {c.name}
          </Link>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-3 ring-1 ring-white/10">
              <Image
                src={productImage(p)}
                alt={p.name}
                fill
                preload
                sizes="(min-width:1024px) 50vw, 100vw"
                className={`object-cover ${p.image ? "" : "opacity-50"}`}
              />
              {!p.image && (
                <span className="absolute inset-0 grid place-items-center font-display text-4xl font-extrabold tracking-tight">
                  {p.name}
                </span>
              )}
              <span className="absolute bottom-4 left-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink">Polymar EG</span>
            </Reveal>
            <div>
              <p className="eyebrow text-brand">{c.name}</p>
              <SplitText as="h1" text={p.name} inView={false} delay={0.1} className="h-display mt-5 text-[clamp(2.6rem,6vw,5rem)]" />
              <Reveal delay={0.3}>
                <p className="mt-6 text-xl leading-relaxed text-white/80">{lead}</p>
              </Reveal>
              <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={`/contact?product=${encodeURIComponent(p.name)}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-display text-[13px] font-bold uppercase tracking-wider text-ink transition hover:bg-white"
                >
                  <Send className="h-4 w-4" /> Request product
                </Link>
                <a
                  href={whatsappLink(`Hello Think Build, I'd like to request ${p.name} (${c.name}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-display text-[13px] font-bold uppercase tracking-wider text-white transition hover:border-[#25D366] hover:bg-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                {p.datasheet && (
                  <a
                    href={withBase(p.datasheet)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-display text-[13px] font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white hover:text-ink"
                  >
                    <Download className="h-4 w-4" /> Datasheet (PDF)
                  </a>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand-deep">Product overview</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight">Properties &amp; applications</h2>
            <ul className="mt-8 space-y-4">
              {(rest.length ? sentences : [p.description]).map((s) => (
                <Reveal as="li" key={s} className="flex gap-4 border-b border-line pb-4 text-lg leading-relaxed text-ink/75">
                  <span className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand">
                    <Check className="h-3.5 w-3.5 text-ink" />
                  </span>
                  {s}
                </Reveal>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-8 ring-1 ring-line lg:sticky lg:top-32">
              <h3 className="font-display text-xl font-extrabold">Specifications</h3>
              <dl className="mt-6 divide-y divide-line text-sm">
                {[
                  ["Product", p.name],
                  ["Category", c.name],
                  ["Manufacturer", "Polymar EG"],
                  ["Supplied by", "Think Build (exclusive agent)"],
                  ["Markets", company.markets.join(", ")],
                  ["Technical file", p.datasheet ? "Available (PDF)" : "On request"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3">
                    <dt className="text-ink/50">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-ink/55">
                Our engineering team can advise on product selection, quantities and on-site application. Call{" "}
                <a href={`tel:${company.phoneIntl}`} className="font-semibold text-ink underline">
                  {company.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-white py-20 lg:py-24">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 className="h-display text-[clamp(2rem,4vw,3.2rem)]">More in {c.name}</h2>
              <Link href={`/products/${c.slug}`} className="hidden shrink-0 text-sm font-semibold underline sm:block">
                View all
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
