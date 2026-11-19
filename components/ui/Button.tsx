import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "brand" | "dark" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  brand: "bg-brand text-ink hover:bg-white",
  dark: "bg-ink text-white hover:bg-brand hover:text-ink",
  "outline-light": "border border-white/30 text-white hover:border-brand hover:bg-brand hover:text-ink",
  "outline-dark": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
};

export function Button({
  href,
  children,
  variant = "brand",
  external,
  icon = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-3 rounded-full px-7 py-4 font-display text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {icon && (
        <span className="relative grid h-5 w-5 place-items-center overflow-hidden">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-5 group-hover:translate-x-5" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
