"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/data";

const slides = [
  {
    image: "/images/hero/slider1.jpg",
    eyebrow: "Welcome to Think Build",
    title: ["Delivering Quality", "Construction Materials", "Worldwide"],
    text: "We specialize in exporting premium Epoxy Resins, EVA & Industrial Rubber to Europe, the Gulf region & Africa — meeting the highest international standards for performance.",
    cta: { href: "/products", label: "Explore Our Products" },
  },
  {
    image: "/images/hero/slider-2.jpg",
    eyebrow: "Welcome to Think Build",
    title: ["Your Trusted Partner", "in Construction &", "Industrial Solutions"],
    text: "From supplying high-grade raw materials to executing large-scale projects, Think Build is your global partner for excellence in construction and manufacturing.",
    cta: { href: "/services", label: "Discover Our Services" },
  },
];

const DURATION = 7000;

export function HeroSlider() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [i]);

  const s = slides[i];

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={s.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: DURATION / 1000 + 1.5, ease: "linear" } }}
          >
            <Image src={s.image} alt="" fill sizes="100vw" preload={i === 0} className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="blueprint absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(90deg,black,transparent_70%)]" />

      <motion.div style={{ opacity: fade }} className="container-x flex flex-1 flex-col justify-center pb-32 pt-32 lg:pb-36">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial="hidden" animate="show" exit="exit" className="max-w-4xl">
            <motion.p
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.7 } }, exit: { opacity: 0 } }}
              className="eyebrow text-brand"
            >
              {s.eyebrow}
            </motion.p>
            <h1 className="h-display mt-6 text-[clamp(2.5rem,7.4vw,6.8rem)] sm:mt-7">
              {s.title.map((line, li) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`block ${li === s.title.length - 1 ? "text-brand" : ""}`}
                    variants={{
                      hidden: { y: "105%" },
                      show: { y: "0%", transition: { duration: 1, delay: 0.15 + li * 0.1, ease: [0.16, 1, 0.3, 1] } },
                      exit: { y: "-105%", transition: { duration: 0.5, delay: li * 0.05, ease: [0.76, 0, 0.24, 1] } },
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.8 } },
                exit: { opacity: 0, transition: { duration: 0.3 } },
              }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-8 sm:text-xl"
            >
              {s.text}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8 } },
                exit: { opacity: 0, transition: { duration: 0.3 } },
              }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            >
              <Magnetic>
                <Button href={s.cta.href}>{s.cta.label}</Button>
              </Magnetic>
              <Button href="/contact" variant="outline-light">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="container-x absolute inset-x-0 bottom-8 flex items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show slide ${idx + 1}`}
              className="group flex items-center gap-3 py-2"
            >
              <span className={`font-display text-xs font-bold ${idx === i ? "text-white" : "text-white/40"}`}>
                0{idx + 1}
              </span>
              <span className="relative h-[2px] w-16 overflow-hidden bg-white/20 sm:w-24">
                {idx === i && (
                  <motion.span
                    key={`bar-${i}`}
                    className="absolute inset-y-0 left-0 bg-brand"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50 md:flex">
          {company.markets.join(" · ")}
        </div>
        <div className="hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50 sm:flex">
          Scroll
          <span className="relative h-12 w-px overflow-hidden bg-white/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-brand"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
