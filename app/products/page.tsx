import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { CTASection } from "@/components/ui/CTASection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products' Range",
  description:
    "Polymar EG construction chemicals supplied by Think Build: epoxy compounds, anti-static epoxy, bridge expansion joints, marine coatings, concrete additives, waterproofing, adhesives and rust-resistant compounds.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products' Range"
        title="The sole exclusive agent of Polymar EG"
        intro="At Think Build, we are proud to be the sole and exclusive agent of Polymar EG, representing their high-performance construction and chemical materials across Europe, the Gulf region, and Africa. This partnership guarantees direct access to authentic Polymar EG products, backed by technical expertise, certified quality, and reliable international supply."
        image="/images/categories/epoxy-compounds.jpg"
        crumbs={[{ label: "Products" }]}
      />

      <section className="py-24 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Categories" title="Browse by category" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/products/${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:border-ink/20 hover:shadow-[0_30px_60px_-30px_rgba(26,25,29,0.35)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                    <Image src={c.image} alt={c.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 ease-out-expo group-hover:scale-105" />
                    <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {products.filter((p) => p.category === c.slug).length} products
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl font-extrabold tracking-tight">{c.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{c.short}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {c.highlights.map((h) => (
                        <span key={h} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink/70">
                          {h}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold">
                      Explore category
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white py-24 lg:py-28" id="all-products">
        <div className="container-x">
          <SectionHeading eyebrow="Catalogue" title="All products" intro="Filter by category or search by product name and application." />
          <div className="mt-12">
            <ProductsExplorer products={products} categories={categories} />
          </div>
        </div>
      </section>

      <CTASection title="Need help choosing the right product?" text="Our engineering and technical team offers hands-on guidance — from product selection and mix design to on-site application." />
    </>
  );
}
