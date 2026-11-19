import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { CTASection } from "@/components/ui/CTASection";
import { PageHero } from "@/components/ui/PageHero";
import { projects, sectors, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Bridges, tunnels, water and wastewater stations, hospitals, hotels and landmark buildings delivered with Think Build materials and expertise.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${projects.length} references`}
        title="Projects that have already been implemented"
        intro="Our materials and teams are part of successful construction and industrial projects — from expansion joints on Cairo's landmark bridges to epoxy insulation of water and wastewater facilities."
        image="/images/projects/a12.jpg"
        crumbs={[{ label: "Projects" }]}
      >
        <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {sectors.map((s) => (
            <div key={s}>
              <dt className="text-xs uppercase tracking-[0.14em] text-white/50">{s}</dt>
              <dd className="mt-1 font-display text-3xl font-extrabold text-brand">
                {projects.filter((p) => p.sector === s).length}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <ProjectsGrid
            projects={projects}
            sectors={sectors}
            services={services.map(({ slug, title }) => ({ slug, title }))}
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
