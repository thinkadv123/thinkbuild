import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { PageHero } from "@/components/ui/PageHero";
import { categories, getCategory, getProductsByCategory } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await props.params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.name,
    description: c.intro[0],
    alternates: { canonical: `/products/${c.slug}` },
    openGraph: { images: [c.image] },
  };
}

export default async function CategoryPage(props: PageProps<"/products/[category]">) {
  const { category } = await props.params;
  const c = getCategory(category);
  if (!c) notFound();
  const items = getProductsByCategory(c.slug);

  return (
    <>
      <PageHero
        eyebrow={`${items.length} Products`}
        title={c.name}
        intro={c.intro[0]}
        image={c.image}
        crumbs={[{ href: "/products", label: "Products" }, { label: c.name }]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {c.highlights.map((h) => (
            <span key={h} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <Check className="h-3.5 w-3.5 text-brand" /> {h}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-ink/50">Products&apos; Categories</p>
              <nav className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:px-0 lg:flex-col lg:gap-1 lg:overflow-visible">
                {categories.map((x) => (
                  <Link
                    key={x.slug}
                    href={`/products/${x.slug}`}
                    className={`shrink-0 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition lg:whitespace-normal ${
                      x.slug === c.slug ? "bg-ink text-white" : "text-ink/65 hover:bg-white hover:text-ink"
                    }`}
                  >
                    {x.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          <div className="min-w-0 lg:col-span-9">
            <Reveal>
              <p className="max-w-3xl text-lg leading-relaxed text-ink/70">{c.intro[1]}</p>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection title={`Request ${c.name} for your project`} />
    </>
  );
}
