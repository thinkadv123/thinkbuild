import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { Marquee } from "@/components/ui/Marquee";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Bridge expansion joints, epoxy flooring, protective coatings, carbon fiber reinforcement, structural strengthening, bridge lifting, tank insulation, building construction and finishing works.",
  alternates: { canonical: "/services" },
};

const steps = [
  { t: "Assessment", d: "Site inspection and accurate evaluation of structural needs." },
  { t: "Engineering", d: "Tailored solution and material selection by our technical team." },
  { t: "Execution", d: "Safe, efficient application using modern technology." },
  { t: "Handover", d: "Quality control and long-term maintenance support." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Building the future begins with continuous thinking"
        intro="We at Think Build believe that building the future begins with continuous thinking and advanced designs. Our vision is to be a pioneer in contracting and construction, with advanced engineering solutions that meet the aspirations of our customers and contribute to the development of society."
        image="/images/projects/a19.jpg"
        crumbs={[{ label: "Services" }]}
      />

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={`${services.length} specialised services`}
            title="End-to-end structural & construction solutions"
            intro="We deliver end-to-end services that go beyond supplying materials — ensuring smooth logistics, technical guidance, and customized solutions for every client."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee dark items={["Assess", "Engineer", "Execute", "Maintain"]} />

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="A disciplined process on every site" align="center" />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-7 hidden h-px bg-line md:block" aria-hidden />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.12} className="relative">
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-brand ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-ink/60">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  );
}
