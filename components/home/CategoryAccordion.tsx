"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProductCategory } from "@/lib/data";

/** Expanding image panels on desktop; stacked cards on mobile. */
export function CategoryAccordion({ items, counts }: { items: ProductCategory[]; counts: Record<string, number> }) {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="hidden h-[560px] gap-3 lg:flex">
        {items.map((c, i) => {
          const on = i === active;
          return (
            <motion.div
              key={c.slug}
              layout
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              animate={{ flex: on ? 4 : 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-w-0 overflow-hidden rounded-2xl bg-ink"
            >
              <Link href={`/products/${c.slug}`} className="absolute inset-0 block text-white">
                <Image src={c.image} alt={c.name} fill sizes="50vw" className={`object-cover transition duration-700 ${on ? "scale-100 opacity-70" : "scale-110 opacity-40"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute left-6 top-6 font-display text-sm font-bold text-brand">0{i + 1}</span>
                <span
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap font-display text-lg font-extrabold tracking-tight transition-opacity duration-300 [writing-mode:vertical-rl] ${
                    on ? "pointer-events-none opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  {c.name}
                </span>
                <motion.div
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: on ? 0.25 : 0 }}
                  className="absolute inset-x-0 bottom-0 max-w-xl p-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {counts[c.slug]} products
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight">{c.name}</h3>
                  <p className="mt-4 text-white/75">{c.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-ink">
                    View products <ArrowUpRight className="h-4 w-4" />
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {items.map((c) => (
          <Link key={c.slug} href={`/products/${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink text-white">
            <Image src={c.image} alt={c.name} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover opacity-60 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">{c.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/70">{c.short}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
