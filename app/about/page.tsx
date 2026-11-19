import { Award, Compass, Eye, Gem, Globe, ShieldCheck, Target, Wrench } from "lucide-react";
import type { Metadata } from "next";
import { Counter } from "@/components/motion/Counter";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Think Build is a trusted partner in construction materials and industrial solutions, and the exclusive face of Polymar EG worldwide.",
  alternates: { canonical: "/about" },
};

const mvv = [
  {
    icon: Target,
    title: "Mission",
    text: [
      "To deliver world-class construction materials and industrial solutions that enhance performance, durability, and sustainability across global infrastructure projects.",
      "We aim to bridge continents with excellence — connecting European standards, Gulf innovation, and African development through quality-driven exports.",
    ],
  },
  {
    icon: Eye,
    title: "Vision",
    text: [
      "To be one of the region's most trusted export leaders in construction and chemical materials, known for technical integrity, customer commitment, and environmental responsibility.",
      "We envision a future where Think Build becomes the go-to source for high-performance materials in every major market we serve.",
    ],
  },
  {
    icon: Gem,
    title: "Values",
    text: [
      "We believe in a set of values that are the basis on which we build and participate in every aspect of our business.",
      "Our values reflect our commitment to integrity, quality, professionalism and sustainability.",
    ],
  },
];

const values = ["Integrity", "Quality", "Professionalism", "Sustainability"];

const why = [
  {
    icon: Award,
    title: "Exclusive Representation",
    text: "As the sole and exclusive agent of Polymar EG, we provide clients with direct access to certified, factory-backed materials.",
  },
  {
    icon: Globe,
    title: "Export Expertise",
    text: "With years of experience, Think Build understands the logistics, regulations, and quality expectations of global markets.",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    text: "Our engineering and technical team offers hands-on guidance — from product selection and mix design to on-site application.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    text: "From epoxy systems to joint sealants and concrete additives, our materials undergo strict quality control to guarantee durability.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="More than a supplier — a trusted partner"
        intro="At Think Build, we are more than just a supplier — we are a trusted partner in construction materials and industrial solutions, and the exclusive face of Polymar EG worldwide."
        image="/images/hero/slider1.jpg"
        crumbs={[{ label: "Who We Are" }]}
      />

      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Think Build" title="Headquartered in Egypt. Trusted across three continents." highlight={["three", "continents."]} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-ink/70">
                Headquartered in Egypt, we specialize in manufacturing, sourcing, and exporting high-quality materials
                such as Epoxy Compounds, Bridge Expansion Joints, EVA, Rubber, Concrete Additives, and Waterproofing
                Systems to markets across Europe, the Gulf region, and Africa.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-10 sm:grid-cols-4">
              {company.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <p className="font-display text-4xl font-extrabold">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/50">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <ParallaxImage
              src="/images/misc/Your-paragraph-text.jpg"
              alt="Think Build engineers reviewing plans on site"
              className="aspect-[4/5] rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="container-x relative grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading dark eyebrow="Our Exclusive Partnership" title="Think Build with Polymar EG" highlight={["Polymar", "EG"]} />
            <Reveal delay={0.15} className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="font-display text-3xl font-black uppercase">Polymar</span>
              <span className="rounded-md bg-brand px-2 py-0.5 font-display text-sm font-extrabold text-ink">EG</span>
              <span className="text-sm text-white/55">Sole &amp; exclusive agent</span>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/70 lg:col-span-7">
            {[
              "Think Build is the sole and exclusive agent of Polymar EG, a leading manufacturer of advanced construction chemicals, epoxy systems, and industrial coating solutions. This partnership represents a powerful combination of engineering innovation and export expertise, bringing together Polymar EG's research-driven manufacturing and Think Build's global distribution network.",
              "Through this strategic alliance, we deliver a comprehensive range of high-performance materials — including epoxy resins, joint sealants, waterproofing systems, concrete additives, adhesives, and corrosion-resistant compounds — all designed to meet the rigorous demands of European, Gulf, and African infrastructure projects.",
              "Every Polymar EG product distributed by Think Build is authentic, certified, and quality-tested according to international standards (EN, ASTM, GCC). Our clients benefit from direct access to factory-backed materials, consistent supply chains, and dedicated technical support from experienced engineers who understand the complexities of large-scale construction and industrial operations.",
              "This exclusive partnership reinforces Think Build's position as a trusted international exporter — not only supplying materials but delivering knowledge, reliability, and innovation that help our partners build with confidence and long-term value.",
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="What drives us" title="Mission, vision & values" align="center" />
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {mvv.map((m, i) => (
              <Reveal
                key={m.title}
                delay={i * 0.1}
                className="group relative overflow-hidden rounded-2xl border border-line bg-white p-9 transition hover:border-ink"
              >
                <span className="absolute -right-6 -top-10 font-display text-[9rem] font-black text-ink/[0.04]">0{i + 1}</span>
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand text-ink">
                  <m.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-8 font-display text-3xl font-extrabold tracking-tight">{m.title}</h3>
                {m.text.map((t) => (
                  <p key={t} className="mt-4 leading-relaxed text-ink/65">
                    {t}
                  </p>
                ))}
                {m.title === "Values" && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {values.map((v) => (
                      <span key={v} className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white">
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Why Choose Think Build" title="Know our commitment" />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-ink/70">
                Every shipment, every project, and every partnership reflects our promise — to deliver materials that
                build trust, safety, and success. Whether you&apos;re constructing a bridge in Europe, developing
                infrastructure in the Gulf, or launching industrial projects in Africa, Think Build is your reliable
                partner for world-class quality and technical excellence.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex items-center gap-3 text-sm text-ink/55">
              <Compass className="h-5 w-5 text-brand-deep" /> Europe · Gulf Region · Africa
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {why.map((w, i) => (
              <Reveal
                key={w.title}
                delay={i * 0.08}
                className={`group rounded-2xl bg-ink p-8 text-white ${i % 2 === 1 ? "sm:mt-12 sm:-mb-12" : ""}`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-brand ring-1 ring-white/10 transition group-hover:bg-brand group-hover:text-ink">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-10 font-display text-2xl font-extrabold tracking-tight">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
