"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function ParallaxImage({
  src,
  alt,
  className = "",
  amount = 12,
  sizes = "(min-width:1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  amount?: number;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    // The in-view trigger lives on the unclipped wrapper: IntersectionObserver ignores
    // elements whose own clip-path hides them entirely.
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-ink ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-[-15%]"
        variants={{ hidden: { clipPath: "inset(100% 0 0 0)" }, show: { clipPath: "inset(0% 0 0 0)" } }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
