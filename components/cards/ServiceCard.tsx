import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/data";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl bg-ink p-8 text-white"
    >
      <Image
        src={service.image}
        alt=""
        fill
        sizes="(min-width:1024px) 33vw, 100vw"
        className="object-cover opacity-0 transition duration-700 ease-out-expo group-hover:scale-105 group-hover:opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/5 text-brand ring-1 ring-white/10 transition group-hover:bg-brand group-hover:text-ink">
          <ServiceIcon name={service.icon} className="h-7 w-7" />
        </span>
        <span className="font-display text-sm font-bold text-white/30">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="relative mt-auto">
        <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight">{service.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-white/60">{service.short}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
