import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExperienceCard, PlaceCard } from "@/components/Cards";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PartnerFeature } from "@/components/Partner";
import { Photo } from "@/components/Photo";
import { getCategory, getCity, getNeighbourhood, getNeighbourhoods, getPlacesByArea, getSponsored, neighbourhoodHref } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getNeighbourhoods().map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const n = getNeighbourhood(slug);
  if (!n) return {};
  return buildMetadata({ title: n.seo.title, description: n.seo.description, path: neighbourhoodHref(n) });
}

export default async function NeighbourhoodPage({ params }: Props) {
  const { slug } = await params;
  const n = getNeighbourhood(slug);
  if (!n) notFound();
  const city = getCity();
  const sponsor = getSponsored(`neighbourhood:${n.slug}`)[0];

  const sections = n.sections
    .map((s) => ({
      ...s,
      cat: getCategory(s.category),
      places: getPlacesByArea(n.slug, s.category)
        .filter((p) => p.slug !== sponsor?.place.slug)
        .sort((a, b) => (b.rating?.value ?? 0) - (a.rating?.value ?? 0)),
    }))
    .filter((s) => s.places.length && s.cat);

  const others = getNeighbourhoods().filter((o) => o.slug !== n.slug);

  return (
    <>
      <section className="cover cover-page" aria-labelledby="nb-title">
        <Photo media={n.heroImage} priority showBrief />
        <div className="wrap cover-inner on-image">
          <Breadcrumbs items={[{ name: "Neighbourhoods", href: "/neighbourhoods" }, { name: n.name, href: neighbourhoodHref(n) }]} />
          <p className="eyebrow mt-m" style={{ opacity: 0.85 }}>
            Explore
          </p>
          <h1 id="nb-title" className="display nb-hero-name mt-s">
            {n.name}
          </h1>
          <p className="cover-sub">{n.tagline}</p>
          <dl className="nb-facts">
            {n.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap nb-intro">
          <div className="byline">
            <strong>Best for</strong>
            {n.bestFor.map((b) => (
              <span key={b} className="text-soft">
                {b}
              </span>
            ))}
          </div>
          <div className="list-intro-text">
            {n.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <nav className="nb-jump" aria-label={`In ${n.name}`}>
              {sections.map((s) => (
                <a key={s.category} href={`#${s.category}`} className="chip">
                  {s.title} <span className="text-soft">{s.places.length}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="wrap">
          {sections.map((s, i) => (
            <div key={s.category} id={s.category} className="nb-section">
              <header className="section-head">
                <div>
                  <p className="eyebrow">
                    {n.name} · {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="h2">{s.title}</h2>
                </div>
                <Link href={`/${s.category}`} className="link">
                  All {s.cat!.name.toLowerCase()} in {city.name} <ArrowRight size={14} />
                </Link>
              </header>
              <div className="card-grid">
                {s.places.map((p, j) =>
                  s.cat!.isExperience ? <ExperienceCard key={p.slug} place={p} delay={j * 70} /> : <PlaceCard key={p.slug} place={p} delay={j * 70} />,
                )}
              </div>
              {i === 0 && sponsor ? (
                <div className="mt-l">
                  <PartnerFeature item={sponsor} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-sea">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow" style={{ color: "var(--terracotta-soft)" }}>
                Keep exploring
              </p>
              <h2 className="h2">Other neighbourhoods</h2>
            </div>
          </header>
          <ol className="nb-index">
            {others.map((o, i) => (
              <li key={o.slug}>
                <Link href={neighbourhoodHref(o)} className="nb-row">
                  <span className="nb-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nb-name">{o.name}</span>
                  <span className="nb-tag">{o.tagline}</span>
                  <ArrowUpRight size={22} />
                  <span className="nb-peek" aria-hidden>
                    <Photo media={o.heroImage} sizes="280px" decorative />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: `${n.name}, ${city.name}`,
          description: n.tagline,
          url: new URL(neighbourhoodHref(n), city.domain).toString(),
          containedInPlace: { "@type": "City", name: city.name },
        }}
      />
    </>
  );
}
