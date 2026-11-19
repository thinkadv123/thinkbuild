"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Words to colour with the brand accent. */
  highlight?: string[];
};

/** Masked word-by-word reveal for headlines. */
export function SplitText({
  text,
  className,
  delay = 0,
  inView = true,
  as = "h2",
  highlight = [],
}: Props) {
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } }
    : { animate: "show" };
  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(w.replace(/[.,]/g, "")) ? "text-brand" : ""}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
