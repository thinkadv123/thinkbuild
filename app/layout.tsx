import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { company } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "Think Build — Construction Materials & Contracting | Exclusive Agent of Polymar EG",
    template: "%s | Think Build",
  },
  description: company.description,
  keywords: [
    "Think Build",
    "Polymar EG",
    "epoxy compounds",
    "bridge expansion joints",
    "anti-static epoxy",
    "concrete additives",
    "waterproofing",
    "construction chemicals Egypt",
    "carbon fiber reinforcement",
    "epoxy flooring",
  ],
  openGraph: {
    type: "website",
    siteName: "Think Build",
    title: "Think Build — Constructions & Contracting",
    description: company.description,
    images: [{ url: "/images/hero/slider1.jpg", width: 1920, height: 1080 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1a191d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: company.url,
  logo: `${company.url}/images/brand/logo-dark.png`,
  email: company.email,
  telephone: company.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "407 Narges Buildings, North Ninety",
    addressLocality: "New Cairo",
    addressCountry: "EG",
  },
  areaServed: ["Europe", "Middle East", "Africa"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-brand px-5 py-3 text-sm font-bold text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
