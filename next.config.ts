import type { NextConfig } from "next";
import { categories } from "./lib/data/categories";
import { products } from "./lib/data/products";

/** Permanent redirects from the legacy WordPress URLs so existing links and rankings carry over. */
const legacyRedirects = [
  { source: "/who-are-we", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/our-services", destination: "/services" },
  { source: "/products-range", destination: "/products" },
  { source: "/service/:slug", destination: "/services/:slug" },
  { source: "/lq-project", destination: "/projects" },
  { source: "/lq-project/:slug", destination: "/projects/:slug" },
  { source: "/lq-project-category/:slug", destination: "/projects" },
  { source: "/ar", destination: "/" },
  ...categories.map((c) => ({ source: `/${c.slug}`, destination: `/products/${c.slug}` })),
  ...products.map((p) => ({ source: `/product/${p.legacySlug}`, destination: `/products/${p.category}/${p.slug}` })),
].map((r) => ({ ...r, permanent: true }));

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
