"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import type { Service } from "@/lib/data";

/**
 * Desktop: the section pins and the service cards travel horizontally as you scroll.
 * Mobile/tablet: a regular grid.
 */
export function ServicesScroller({ services, header }: { services: Service[]; header: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <div ref={wrap} className="relative hidden lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x mb-12">{header}</div>
          <motion.div ref={track} style={{ x }} className="flex gap-6 pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] pr-10">
            {services.map((s, i) => (
              <div key={s.slug} className="w-[380px] shrink-0">
                <ServiceCard service={s} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container-x py-24 lg:hidden">
        {header}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
