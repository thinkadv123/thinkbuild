"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { SplitText } from "@/components/motion/SplitText";

type Crumb = { href?: string; label: string };

export function PageHero({
  title,
  eyebrow,
  intro,
  image = "/images/hero/slider-2.jpg",
  crumbs = [],
  children,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  image?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <section ref={ref} className="grain relative isolate overflow-hidden bg-ink pb-16 pt-36 text-white sm:pb-20 lg:pb-24 lg:pt-48">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill sizes="100vw" preload className="object-cover opacity-35" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      <div className="blueprint absolute inset-0 -z-10 opacity-50" />

      <div className="container-x">
        {crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/50"
          >
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-brand">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="eyebrow mb-6 text-brand"
          >
            {eyebrow}
          </motion.p>
        )}
        <SplitText
          as="h1"
          text={title}
          inView={false}
          delay={0.2}
          className="h-display max-w-5xl text-[clamp(2.6rem,7vw,6rem)]"
        />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            {intro}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
