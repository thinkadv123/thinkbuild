import Image from "next/image";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { company, whatsappLink } from "@/lib/data";
import { Button } from "./Button";

export function CTASection({
  title = "Contact us now to achieve your project",
  text = "Tell us about your project — our engineers will recommend the right materials and solution, and a service representative will reply as soon as possible.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white lg:py-32">
      <Image src="/images/misc/Your-paragraph-text.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <div className="blueprint absolute inset-0 -z-10 opacity-60" />
      <div className="container-x grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow text-brand">Let&apos;s build together</p>
          </Reveal>
          <SplitText text={title} highlight={["project"]} className="h-display mt-6 text-[clamp(2.4rem,6vw,5.4rem)]" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg text-white/65">{text}</p>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
          <Magnetic>
            <Button href="/contact">Request a Quote</Button>
          </Magnetic>
          <Button href={whatsappLink("Hello Think Build, I'd like to discuss a project.")} variant="outline-light">
            WhatsApp
          </Button>
          <p className="w-full text-sm text-white/50 lg:text-right">
            or call <a href={`tel:${company.phoneIntl}`} className="text-white hover:text-brand">{company.phoneDisplay}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
