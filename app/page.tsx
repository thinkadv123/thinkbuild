import { Award, Globe2, ShieldCheck, Wrench } from "lucide-react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { CategoryAccordion } from "@/components/home/CategoryAccordion";
import { ExportRoutes } from "@/components/home/ExportRoutes";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ServicesScroller } from "@/components/home/ServicesScroller";
import { Counter } from "@/components/motion/Counter";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, company, getCategory, getProject, products, projects, services } from "@/lib/data";

const pillars = [
  {
    icon: Award,
    title: "Exclusive Representation",
    text: "As the sole and exclusive agent of Polymar EG, we provide clients with direct access to certified, factory-backed materials.",
  },
  {
    icon: Globe2,
    title: "Export Expertise",
    text: "With years of experience, Think Build understands the logistics, regulations, and quality expectations of global markets.",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    text: "Our engineering team offers hands-on guidance — from product selection and mix design to on-site application.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    text: "From epoxy systems to joint sealants and concrete additives, our materials undergo strict quality control to guarantee durability.",
  },
];

const featuredCategories = [
  "bridges-expansion-joint",
  "anti-static-epoxy",
  "epoxy-compounds",
  "marine-applications",
  "concrete-additives",
]
  .map((s) => getCategory(s))
  .filter((c) => c !== undefined);

const featuredProjects = [
  "shura-council",
  "hangar-al-umrat-al-jasmiya-cairo-airport",
  "the-26th-of-july-bridge",
  "a-sewage-lifting-station-to-transport-the-water-of-badr-city-to-the-administrative-capital",
  "sky-hospital",
  "giza-metal-bridge",
]
  .map((s) => getProject(s))
  .filter((p) => p !== undefined);

export default function Home() {
  const counts = Object.fromEntries(
    categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length]),
  );

  return (
    <>
      <HeroSlider />

      <Marquee
        items={["Epoxy Compounds", "Bridge Expansion Joints", "Anti-Static Flooring", "Marine Coatings", "Concrete Additives", "Waterproofing", "Carbon Fiber"]}
      />

      {/* Polymar partnership */}
      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <ParallaxImage
              src="/images/projects/a16.jpg"
              alt="Bridge expansion joint works by Think Build"
              className="aspect-[4/5] rounded-2xl"
            />
            <Reveal
              delay={0.3}
              className="absolute -bottom-8 -right-4 rounded-2xl bg-ink p-7 text-white shadow-2xl sm:-right-10"
            >
              <p className="font-display text-5xl font-extrabold">
                <Counter to={20} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-white/60">Years of experience</p>
            </Reveal>
            <div className="hazard absolute -left-3 -top-3 h-24 w-24 rounded-xl opacity-90 [mask-image:linear-gradient(135deg,black_50%,transparent_50%)]" />
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <SectionHeading
              eyebrow="Our Products"
              title="The Only Authorized Representative of Polymar EG"
              highlight={["Polymar", "EG"]}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-ink/70">
                We provide a complete range of construction and industrial materials tailored for clients across
                Europe, the Middle East, and Africa. Every product we supply is tested and certified to ensure superior
                performance and long-term durability.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.08} className="group">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-brand transition group-hover:bg-brand group-hover:text-ink">
                    <p.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Product Range"
            title="Engineered materials for every structure"
            intro={`${products.length} certified Polymar EG products across ${categories.length} categories — supplied with datasheets and technical support.`}
            action={<Button href="/products" variant="dark">View Full Product Range</Button>}
          />
          <div className="mt-14">
            <CategoryAccordion items={featuredCategories} counts={counts} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-ink py-20 text-white">
        <div className="blueprint absolute inset-0 opacity-60" />
        <div className="container-x relative grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {company.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="border-l border-white/10 pl-6 lg:pl-10">
              <p className="h-display text-[clamp(3rem,6vw,5.5rem)]">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-paper">
        <ServicesScroller
          services={services}
          header={
            <SectionHeading
              eyebrow="Our Services"
              title="Beyond supply — complete structural solutions"
              intro="We deliver end-to-end services that go beyond supplying materials — ensuring smooth logistics, technical guidance, and customized solutions for every client."
              action={<Button href="/services" variant="outline-dark">All Services</Button>}
            />
          }
        />
      </section>

      {/* Export reach */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              eyebrow="Global Reach"
              title="Bridging continents with excellence"
              highlight={["continents"]}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-white/65">
                Headquartered in Egypt, we connect European standards, Gulf innovation, and African development through
                quality-driven exports of epoxy compounds, expansion joints, EVA, rubber, concrete additives and
                waterproofing systems.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              {["EN", "ASTM", "GCC"].map((s) => (
                <span key={s} className="rounded-full border border-white/15 px-5 py-2 font-display text-sm font-bold tracking-wider">
                  {s} <span className="font-sans font-normal text-white/50">standards</span>
                </span>
              ))}
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ExportRoutes />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Projects"
            title="Projects that have already been implemented"
            intro="Our materials are part of successful construction and industrial projects. From epoxy flooring systems to specialized insulation works, Think Build ensures precision, quality, and sustainability in every project we touch."
            action={<Button href="/projects" variant="dark">{`All ${projects.length} Projects`}</Button>}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner strip */}
      <section className="border-y border-line bg-white py-14">
        <div className="container-x flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="max-w-md text-center font-display text-xl font-bold tracking-tight md:text-left">
            Sole &amp; exclusive agent of <span className="text-brand-deep">Polymar EG</span> — authentic, certified,
            factory-backed materials.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-display text-4xl font-black uppercase tracking-tight text-ink">Polymar</span>
            <span className="rounded-md bg-brand px-2.5 py-1 font-display text-sm font-extrabold text-ink">EG</span>
            <span className="hidden h-10 w-px bg-line sm:block" />
            <span className="hidden text-xs uppercase leading-snug tracking-[0.16em] text-ink/50 sm:block">
              Exclusive
              <br />
              agent
            </span>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
