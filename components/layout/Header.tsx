"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, company, nav, services } from "@/lib/data";

type MenuKey = "products" | "services" | null;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<MenuKey>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMega(null);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 ${
          scrolled || mega ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
        onMouseLeave={() => setMega(null)}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
          <Link href="/" aria-label="Think Build — home" className="relative z-10 shrink-0">
            <Image
              src="/images/brand/logo-light.png"
              alt="Think Build — Constructions & Contracting"
              width={1080}
              height={397}
              preload
              className="h-11 w-auto lg:h-[52px]"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const key: MenuKey =
                item.href === "/products" ? "products" : item.href === "/services" ? "services" : null;
              return (
                <div key={item.href} onMouseEnter={() => setMega(key)} className="relative">
                  <Link
                    href={item.href}
                    className={`group relative flex items-center gap-1 px-4 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      isActive(item.href) ? "text-brand" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {key && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${mega === key ? "rotate-180" : ""}`}
                      />
                    )}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left bg-brand transition-transform duration-500 ease-out-expo ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.phoneIntl}`}
              className="hidden items-center gap-2 text-sm font-medium text-white/80 transition hover:text-brand xl:flex"
            >
              <Phone className="h-4 w-4 text-brand" />
              {company.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-[13px] font-bold uppercase tracking-wider text-ink transition hover:bg-white md:inline-flex"
            >
              Get a Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              key={mega}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden border-t border-white/10 lg:block"
            >
              <div className="container-x grid grid-cols-12 gap-8 py-10">
                <div className="col-span-3">
                  <p className="eyebrow text-brand">{mega === "products" ? "Polymar EG" : "What we do"}</p>
                  <p className="mt-4 font-display text-2xl font-bold leading-tight text-white">
                    {mega === "products"
                      ? "The sole exclusive agent of Polymar EG."
                      : "End-to-end construction & structural solutions."}
                  </p>
                  <Link
                    href={mega === "products" ? "/products" : "/services"}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                  >
                    {mega === "products" ? "View full product range" : "View all services"}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <ul className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-1">
                  {(mega === "products"
                    ? categories.map((c) => ({ href: `/products/${c.slug}`, label: c.name }))
                    : services.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))
                  ).map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between rounded-lg px-3 py-3 text-[15px] text-white/75 transition hover:bg-white/5 hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight className="h-4 w-4 -translate-x-1 text-brand opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-[76px] lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="blueprint absolute inset-0 opacity-60" />
            <nav className="container-x relative flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-baseline gap-4 py-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${
                      isActive(item.href) ? "text-brand" : "text-white"
                    }`}
                  >
                    <span className="font-sans text-xs font-medium text-white/40">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="container-x relative space-y-2 border-t border-white/10 py-6 text-sm text-white/70"
            >
              <a href={`tel:${company.phoneIntl}`} className="block">
                {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.email}`} className="block">
                {company.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
