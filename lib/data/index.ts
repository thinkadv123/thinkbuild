import { categories } from "./categories";
import { products } from "./products";
import { projects } from "./projects";
import { services } from "./services";

export { categories, products, projects, services };
export * from "./company";
export type * from "./types";

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const getProduct = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);

/** Products without their own photo fall back to the category image. */
export const productImage = (p: { image: string; category: string }) =>
  p.image || getCategory(p.category)?.image || "/images/hero/bg.jpg";

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getProjectsByService = (slug: string) =>
  projects.filter((p) => p.services.includes(slug));

export const sectors = Array.from(new Set(projects.map((p) => p.sector)));
