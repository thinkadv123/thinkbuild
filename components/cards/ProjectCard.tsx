"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

/** Project tile with a subtle 3D tilt that follows the pointer. */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 15 });

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          preload={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition duration-[1.2s] ease-out-expo group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-ink/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
          {project.sector}
        </span>
        <span className="absolute right-5 top-5 grid h-11 w-11 scale-75 place-items-center rounded-full bg-brand text-ink opacity-0 transition duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white">{project.title}</h3>
          <span className="mt-4 block h-[2px] w-10 bg-brand transition-all duration-500 ease-out-expo group-hover:w-full" />
        </div>
      </Link>
    </motion.div>
  );
}
