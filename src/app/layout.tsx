import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/hanken-grotesk/index.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { getArticles, getCategories, getCity, getNeighbourhoods } from "@/lib/content";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const city = getCity();

export const metadata: Metadata = {
  metadataBase: new URL(city.domain),
  title: {
    default: `${city.brand} — The Independent Guide to ${city.name} de ${city.region}`,
    template: `%s | ${city.brand}`,
  },
  description: city.description,
  applicationName: city.brand,
  openGraph: { siteName: city.brand, locale: city.locale, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f3eee5",
  width: "device-width",
  initialScale: 1,
};

function buildNav(): NavItem[] {
  const cats = getCategories();
  const group = (g: string) => cats.filter((c) => c.navGroup === g).map((c) => ({ label: c.name, href: `/${c.slug}` }));
  // Grupper utan innehåll döljs; gruppens länk går till dess första kategori.
  const groups = (
    [
      ["Eat", "eat"],
      ["Drink", "drink"],
      ["Do", "do"],
      ["See", "see"],
      ["Stay", "stay"],
    ] as const
  )
    .map(([label, g]) => ({ label, children: group(g) }))
    .filter((g) => g.children.length)
    .map((g) => ({ label: g.label, href: g.children[0]!.href, children: g.children }));
  return [
    ...groups,
    {
      label: "Explore",
      href: "/neighbourhoods",
      children: getNeighbourhoods().map((n) => ({ label: n.name, href: `/neighbourhoods/${n.slug}` })),
    },
    {
      label: "Guides",
      href: "/guides",
      children: getArticles().slice(0, 4).map((a) => ({ label: a.title, href: `/guides/${a.slug}` })),
    },
  ];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [first, ...rest] = city.brand.split(" ");
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Aktiverar reveal-animationer först när JS körs — innehållet syns alltid utan JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader brand={[first ?? "", rest.join(" ")]} nav={buildNav()} />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
      </body>
    </html>
  );
}
