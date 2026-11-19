import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink pt-24 text-white">
      <div className="blueprint absolute inset-0 opacity-60" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-brand">Error 404</p>
          <h1 className="h-display mt-6 text-[clamp(3rem,9vw,8rem)]">
            Under <span className="text-brand">construction?</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/65">
            The page you&apos;re looking for doesn&apos;t exist or has moved during our site rebuild.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/">Back to Home</Button>
            <Button href="/products" variant="outline-light">
              Browse Products
            </Button>
          </div>
        </div>
        <Image src="/images/brand/mark-light.png" alt="" width={388} height={332} className="mx-auto w-2/3 max-w-sm opacity-90" />
      </div>
      <div className="hazard absolute inset-x-0 bottom-0 h-3" />
    </section>
  );
}
