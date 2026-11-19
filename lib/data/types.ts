export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  datasheet: string;
  /** Slug used on the legacy WordPress site, kept for redirects. */
  legacySlug: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  short: string;
  intro: string[];
  image: string;
  highlights: string[];
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  scope: string[];
  icon: string;
};

export type Project = {
  slug: string;
  title: string;
  image: string;
  services: string[];
  sector: string;
};
