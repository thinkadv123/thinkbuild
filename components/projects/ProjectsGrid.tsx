"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project, Service } from "@/lib/data";

export function ProjectsGrid({
  projects,
  sectors,
  services,
}: {
  projects: Project[];
  sectors: string[];
  services: Pick<Service, "slug" | "title">[];
}) {
  const [sector, setSector] = useState("all");
  const [service, setService] = useState("all");

  const list = useMemo(
    () =>
      projects.filter(
        (p) => (sector === "all" || p.sector === sector) && (service === "all" || p.services.includes(service)),
      ),
    [projects, sector, service],
  );

  const usedServices = services.filter((s) => projects.some((p) => p.services.includes(s.slug)));

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
          {["all", ...sectors].map((s) => {
            const on = sector === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setSector(s)}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${on ? "text-ink" : "text-ink/60 hover:text-ink"}`}
              >
                {on && (
                  <motion.span layoutId="sector-chip" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{s === "all" ? "All sectors" : s}</span>
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="shrink-0 text-ink/50">Work type</span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-full border border-line bg-white px-4 py-2.5 font-medium outline-none focus:border-ink lg:w-72"
          >
            <option value="all">All work types</option>
            {usedServices.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-8 text-sm text-ink/50" aria-live="polite">
        {list.length} project{list.length === 1 ? "" : "s"}
      </p>

      <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 8) * 0.04 } }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-line p-16 text-center text-ink/60">
          No projects match this combination of filters.
        </p>
      )}
    </div>
  );
}
