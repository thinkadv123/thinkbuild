import { ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategory, productImage, type Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_30px_60px_-30px_rgba(26,25,29,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <Image
          src={productImage(product)}
          alt={product.name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className={`object-cover transition duration-700 ease-out-expo group-hover:scale-105 ${product.image ? "" : "opacity-60"}`}
        />
        {!product.image && (
          <span className="absolute inset-0 grid place-items-center p-6 text-center font-display text-2xl font-extrabold tracking-tight text-white">
            {product.name}
          </span>
        )}
        {product.datasheet && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
            <FileText className="h-3 w-3 text-brand" /> Datasheet
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">{cat?.name}</p>
        <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink">{product.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{product.description}</p>
        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-ink">
          View details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
    </Link>
  );
}
