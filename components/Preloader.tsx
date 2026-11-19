"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Brief branded intro shown once per browser session. */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tb-intro") === "1";
      sessionStorage.setItem("tb-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let start = 0;
    let raf = 0;
    const tick = (t: number) => {
      if (!start) {
        start = t;
        setShow(true);
      }
      const p = Math.min(1, (t - start) / 1300);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="blueprint absolute inset-0 opacity-70" />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src="/images/brand/mark-light.png" alt="" width={388} height={332} className="h-28 w-auto sm:h-36" preload />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mt-8 font-display text-xs font-semibold uppercase text-white/60"
            >
              Constructions &amp; Contracting
            </motion.p>
            <div className="mt-8 h-[2px] w-48 overflow-hidden bg-white/10">
              <div className="h-full bg-brand" style={{ width: `${count}%` }} />
            </div>
            <p className="mt-3 font-display text-sm font-bold tabular-nums text-brand">{count}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
