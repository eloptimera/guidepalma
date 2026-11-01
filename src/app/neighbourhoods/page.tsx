import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowUpRight } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { getCity, getNeighbourhoods, getPlacesByArea, neighbourhoodHref } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const city = getCity();

export const metadata = buildMetadata({
  title: `${city.name} Neighbourhoods — Where to Eat, Stay & Explore`,
  description: `A neighbourhood-by-neighbourhood guide to ${city.name}: Old Town, Santa Catalina, La Lonja, Portixol and El Terreno.`,
  path: "/neighbourhoods",
});

export default function NeighbourhoodsPage() {
  const all = getNeighbourhoods();
  return (
    <>
      <section className="cat-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Neighbourhoods", href: "/neighbourhoods" }]} />
          <h1 className="h1 mt-m" style={{ maxWidth: "12ch" }}>
            {city.name}, <em>neighbourhood by neighbourhood</em>
          </h1>
          <p className="lead mt-s">Where you stay changes the trip. Here is how the city&rsquo;s quarters feel, and what is worth crossing town for.</p>
        </div>
      </section>
      <section className="section bg-paper" style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}>
        <div className="wrap card-grid">
          {all.map((n, i) => (
            <article key={n.slug} className="card zoom-parent" data-reveal style={{ ["--delay" as string]: `${(i % 3) * 80}ms` }}>
              <div className="zoom">
                <Photo media={n.heroImage} sizes="(min-width: 900px) 30vw, 90vw" />
              </div>
              <div className="card-body">
                <p className="eyebrow card-kicker">{getPlacesByArea(n.slug).length} places</p>
                <h2 className="card-title">
                  <Link href={neighbourhoodHref(n)} className="card-link">
                    {n.name}
                  </Link>
                </h2>
                <p className="card-text">{n.tagline}</p>
                <span className="link" style={{ justifySelf: "start", marginTop: 6 }}>
                  Explore <ArrowUpRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
