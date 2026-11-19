import type { MetadataRoute } from "next";
import { categories, company, products, projects, services } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority = 0.7) => ({ url: `${company.url}${path}`, priority });
  return [
    u("/", 1),
    u("/about", 0.8),
    u("/products", 0.9),
    u("/services", 0.9),
    u("/projects", 0.8),
    u("/contact", 0.8),
    ...categories.map((c) => u(`/products/${c.slug}`, 0.8)),
    ...products.map((p) => u(`/products/${p.category}/${p.slug}`, 0.6)),
    ...services.map((s) => u(`/services/${s.slug}`, 0.7)),
    ...projects.map((p) => u(`/projects/${p.slug}`, 0.5)),
  ];
}
