import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExperienceCard, PlaceCard } from "@/components/Cards";
import { CategoryExplorer, type FilterableItem } from "@/components/CategoryExplorer";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PartnerCard } from "@/components/Partner";
import { Photo } from "@/components/Photo";
import {
  areaName,
  getCategories,
  getCategory,
  getCity,
  getNeighbourhoods,
  getPlacesByCategory,
  getSponsored,
  getTopListsForCategory,
  listHref,
  neighbourhoodHref,
} from "@/lib/content";
import { buildMetadata, categoryListSchema } from "@/lib/seo";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildMetadata({ title: cat.seo.title, description: cat.seo.description, path: `/${cat.slug}` });
}

const NAV_LABEL: Record<string, string> = { eat: "Eat", drink: "Drink", do: "Do", see: "See", stay: "Stay" };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const city = getCity();
  const sponsored = getSponsored(`category:${cat.slug}`)[0];
  // Sponsrad partner visas som märkt kort — inte dubbelt i det organiska flödet.
  const places = getPlacesByCategory(cat.slug)
    .filter((p) => p.slug !== sponsored?.place.slug)
    .sort((a, b) => (b.rating?.value ?? 0) - (a.rating?.value ?? 0));
  const lists = getTopListsForCategory(cat.slug);

  const usedTypes = cat.types.filter((t) => places.some((p) => p.type === t));
  const usedAreas = [...new Set(places.map((p) => p.area))].map((slug) => ({ slug, name: areaName(slug) }));
  const tagCounts = new Map<string, number>();
  places.forEach((p) => p.tags.forEach((t) => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)));
  const bestFor = [...tagCounts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([t]) => t);

  const items: FilterableItem[] = places.map((p) => ({ key: p.slug, type: p.type, area: p.area, priceLevel: p.priceLevel, tags: p.tags }));
  const cards = places.map((p, i) =>
    cat.isExperience ? <ExperienceCard key={p.slug} place={p} delay={(i % 3) * 70} /> : <PlaceCard key={p.slug} place={p} delay={(i % 3) * 70} priority={i < 2} />,
  );
  if (sponsored) {
    const p = sponsored.place;
    items.push({ key: `sp-${p.slug}`, type: p.type, area: p.area, priceLevel: p.priceLevel, tags: p.tags, sponsored: true });
    cards.push(<PartnerCard key={`sp-${p.slug}`} item={sponsored} />);
  }

  const relatedNeighbourhoods = getNeighbourhoods().filter((n) => usedAreas.some((a) => a.slug === n.slug));

  return (
    <>
      <section className="cat-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: cat.name, href: `/${cat.slug}` }]} />
          <div className="cat-hero-grid">
            <div data-reveal>
              <p className="eyebrow text-terracotta">
                {NAV_LABEL[cat.navGroup]} · {city.name}
              </p>
              <h1 className="h1 mt-s">{cat.title}</h1>
              <p className="lead">{cat.intro}</p>
              <div className="cat-stats">
                <div>
                  <strong>{places.length}</strong>
                  <span>{cat.isExperience ? "Experiences" : "Places"}</span>
                </div>
                <div>
                  <strong>{usedAreas.length}</strong>
                  <span>Areas</span>
                </div>
                <div>
                  <strong>2026</strong>
                  <span>Last checked</span>
                </div>
              </div>
            </div>
            <Photo media={cat.heroImage} priority showBrief sizes="(min-width: 900px) 48vw, 100vw" reveal />
          </div>
        </div>
      </section>

      <section className="bg-paper" style={{ paddingTop: "clamp(48px, 8vw, 140px)", paddingBottom: "var(--section)" }}>
        {lists.length ? (
          <div className="wrap">
            {lists.map((l) => (
              <Link key={l.slug} href={listHref(l)} className="list-promo zoom-parent" data-reveal>
                <div className="zoom">
                  <Photo media={l.heroImage} sizes="180px" decorative />
                </div>
                <div>
                  <p className="eyebrow" style={{ color: "var(--terracotta-soft)" }}>
                    Our ranking
                  </p>
                  <p className="h3 mt-s">{l.title}</p>
                  <p style={{ opacity: 0.8, marginTop: 8 }}>{l.dek}</p>
                </div>
                <span className="btn btn-light">
                  Read the list <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        ) : null}

        <CategoryExplorer
          items={items}
          cards={cards}
          types={usedTypes}
          areas={usedAreas}
          bestFor={bestFor}
          noun={cat.isExperience ? "experiences" : "places"}
        />

        {relatedNeighbourhoods.length ? (
          <div className="wrap mt-l">
            <hr className="rule" />
            <div className="flex-between mt-m">
              <h2 className="h3">
                {cat.name} by neighbourhood
              </h2>
              <div className="nb-jump" style={{ marginTop: 0 }}>
                {relatedNeighbourhoods.map((n) => (
                  <Link key={n.slug} href={neighbourhoodHref(n)} className="chip">
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <JsonLd data={categoryListSchema(cat, places)} />
    </>
  );
}
