"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import type { Product, ProductCategory } from "@/lib/data";

export function ProductsExplorer({ products, categories }: { products: Product[]; categories: ProductCategory[] }) {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (!term || p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)),
    );
  }, [products, cat, q]);

  const chips = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
          {chips.map((c) => {
            const on = cat === c.slug;
            const n = c.slug === "all" ? products.length : products.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCat(c.slug)}
                aria-pressed={on}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  on ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="chip"
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {c.name} <span className="text-xs opacity-60">{n}</span>
                </span>
              </button>
            );
          })}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search e.g. POLYPOXY, sealant…"
            className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-ink"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink/50 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>

      <p className="mt-8 text-sm text-ink/50" aria-live="polite">
        Showing {list.length} of {products.length} products
      </p>

      <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={`${p.category}-${p.slug}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-16 text-center text-ink/60">
          No products match your search. Try another name, or{" "}
          <button type="button" className="font-semibold text-ink underline" onClick={() => { setQ(""); setCat("all"); }}>
            reset filters
          </button>
          .
        </div>
      )}
    </div>
  );
}
