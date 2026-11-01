import Link from "next/link";
import type { Place } from "@/types";
import {
  areaName,
  formatEuro,
  getArea,
  getCategory,
  getRelatedPlaces,
  getTopLists,
  listHref,
  neighbourhoodHref,
  outboundLink,
  placeHref,
  priceLabel,
  priceWords,
  formatDate,
} from "@/lib/content";
import { placeSchema } from "@/lib/seo";
import { Breadcrumbs } from "../Breadcrumbs";
import { PlaceCard, Rating } from "../Cards";
import { ArrowRight, ArrowUpRight, PartnerMark } from "../Icons";
import { JsonLd } from "../JsonLd";
import { LeadForm } from "../LeadForm";
import { MapCard } from "../MapCard";
import { Photo } from "../Photo";

export function PlaceView({ place }: { place: Place }) {
  const cat = getCategory(place.category)!;
  const area = getArea(place.area);
  const out = outboundLink(place);
  const related = getRelatedPlaces(place, 3);
  const featuredIn = getTopLists()
    .map((l) => ({ list: l, rank: l.items.findIndex((i) => i.placeSlug === place.slug) + 1 }))
    .filter((x) => x.rank > 0);

  return (
    <>
      <section className="cover cover-page" aria-labelledby="place-title">
        <Photo media={place.images[0]!} priority showBrief />
        <div className="wrap cover-inner on-image">
          <Breadcrumbs items={[{ name: cat.name, href: `/${cat.slug}` }, { name: place.name, href: placeHref(place) }]} />
          <div className="place-head mt-m">
            {place.isSponsored ? (
              <span className="partner-badge" style={{ background: "var(--paper)", color: "var(--olive)" }}>
                <PartnerMark /> Featured Partner
              </span>
            ) : null}
            {place.distinction ? <p className="distinction" style={{ color: "#f6dcc3" }}>{place.distinction}</p> : null}
            <p className="eyebrow" style={{ opacity: 0.85 }}>
              {place.type} · {areaName(place.area)}
            </p>
            <h1 id="place-title" className="h1" style={{ maxWidth: "16ch" }}>
              {place.name}
            </h1>
            <p className="cover-sub" style={{ marginTop: 0 }}>
              {place.summary}
            </p>
            <p className="meta on-image" style={{ opacity: 0.9 }}>
              {place.priceFrom ? `From ${formatEuro(place.priceFrom)}` : `${priceLabel(place.priceLevel)} · ${priceWords[place.priceLevel]}`}
              {place.duration ? (
                <>
                  <span className="meta-dot" />
                  {place.duration}
                </>
              ) : null}
              {place.rating ? (
                <>
                  <span className="meta-dot" />
                  <Rating rating={place.rating} />
                </>
              ) : null}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap place-layout">
          <div>
            <div className="prose-block why" data-reveal>
              {place.reviewStatus === "reviewed" ? (
                <>
                  <p className="eyebrow text-terracotta">Our take</p>
                  <h2 className="h2 mt-s" style={{ marginBottom: 28 }}>
                    Why we <em>like it</em>
                  </h2>
                </>
              ) : (
                <>
                  <p className="eyebrow text-terracotta">The facts</p>
                  <h2 className="h2 mt-s" style={{ marginBottom: 28 }}>
                    About {place.name}
                  </h2>
                </>
              )}
              {place.why.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {place.reviewStatus === "draft" ? (
                <p className="facts-note mt-m">
                  We haven&rsquo;t reviewed {place.name} yet. The details on this page were checked on{" "}
                  {place.factsCheckedAt ? formatDate(place.factsCheckedAt) : "a recent date"}
                  {place.sourceUrl ? (
                    <>
                      {" "}
                      against{" "}
                      <a href={place.sourceUrl} target="_blank" rel="noopener" className="prose-link">
                        {new URL(place.sourceUrl).hostname.replace("www.", "")}
                      </a>
                    </>
                  ) : null}
                  . Prices and hours change — confirm before you go.
                </p>
              ) : null}
            </div>

            <div className="prose-block gallery">
              {place.images.map((m, i) => (
                <Photo key={i} media={m} sizes="(min-width: 1000px) 30vw, 50vw" showBrief reveal />
              ))}
            </div>

            {place.goodToKnow.length ? (
            <div className="prose-block" data-reveal>
              <h2 className="h3">Good to know</h2>
              <ol className="know">
                {place.goodToKnow.map((g, i) => (
                  <li key={i}>
                    <span className="numeral">{i + 1}</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ol>
            </div>
            ) : null}

            <div className="prose-block" data-reveal>
              {place.perfectFor.length ? (
                <>
                  <h2 className="h3">Perfect for</h2>
                  <div className="perfect">
                    {place.perfectFor.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </div>
                </>
              ) : (
                <h2 className="h3">Tagged</h2>
              )}
              <div className="nb-jump">
                {place.tags.map((t) => (
                  <Link key={t} href={`/search?q=${encodeURIComponent(t.toLowerCase())}`} className="tag">
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {featuredIn.length ? (
              <div className="prose-block" data-reveal>
                <h2 className="h3">Featured in</h2>
                <ul className="know">
                  {featuredIn.map(({ list, rank }) => (
                    <li key={list.slug}>
                      <span className="numeral">{rank}</span>
                      <Link href={`${listHref(list)}#rank-${rank}`} className="prose-link">
                        #{rank} in {list.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="place-aside" aria-label="Details">
            <div className="info-card">
              <h2 className="eyebrow">The details</h2>
              <dl className="info-list">
                <div>
                  <dt>Area</dt>
                  <dd>{area?.hasPage ? <Link href={neighbourhoodHref({ slug: area.slug })} className="prose-link">{area.name}</Link> : areaName(place.area)}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>
                    <Link href={`/${cat.slug}`} className="prose-link">
                      {cat.singular}
                    </Link>{" "}
                    · {place.type}
                  </dd>
                </div>
                {place.distinction ? (
                  <div>
                    <dt>Award</dt>
                    <dd>{place.distinction}</dd>
                  </div>
                ) : null}
                {place.duration ? (
                  <div>
                    <dt>Duration</dt>
                    <dd>{place.duration}</dd>
                  </div>
                ) : null}
                {place.rating ? (
                  <div>
                    <dt>Rating</dt>
                    <dd>
                      <Rating rating={place.rating} />
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt>Price</dt>
                  <dd>{place.priceFrom ? `From ${formatEuro(place.priceFrom)} pp` : `${priceLabel(place.priceLevel)} · ${priceWords[place.priceLevel]}`}</dd>
                </div>
                {place.hours?.length ? (
                  <div>
                    <dt>Hours</dt>
                    <dd>
                      {place.hours.map((h) => (
                        <span key={h.days} style={{ display: "block" }}>
                          <span className="text-soft">{h.days}</span> {h.time}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt>Address</dt>
                  <dd>{place.address}</dd>
                </div>
                {place.phone ? (
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${place.phone.replace(/\s/g, "")}`} className="prose-link">
                        {place.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {place.website ? (
                  <div>
                    <dt>Website</dt>
                    <dd>
                      <a href={place.website} target="_blank" rel={place.isSponsored ? "sponsored noopener" : "noopener"} className="prose-link">
                        {new URL(place.website).hostname.replace("www.", "")}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
              {out && out.href !== "#enquire" ? (
                <a href={out.href} rel={out.rel} target="_blank" className="btn btn-solid">
                  {out.label} <ArrowUpRight size={14} />
                </a>
              ) : null}
              {place.affiliatePartner ? <p className="affiliate-note mt-s">Booked via {place.affiliatePartner}. We may earn a commission at no cost to you.</p> : null}
            </div>

            {place.acceptsLeads ? (
              <div className="info-card">
                <h2 className="h4">Send an enquiry</h2>
                <p className="meta" style={{ marginBottom: 16 }}>
                  Free, no obligation. We&rsquo;ll reply within 24 hours.
                </p>
                <LeadForm placeName={place.name} />
              </div>
            ) : null}

            {!place.address.toLowerCase().includes("on request") ? <MapCard query={`${place.name}, ${place.address}`} label={place.name} /> : null}

            {place.isSponsored ? (
              <p className="affiliate-note">
                {place.name} is a paid Guide Palma partner. Our review is written independently.{" "}
                <Link href="/about#partners" className="prose-link">
                  How we work
                </Link>
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section bg-paper">
          <div className="wrap">
            <header className="section-head">
              <div>
                <p className="eyebrow">Nearby & similar</p>
                <h2 className="h2">If you like {place.name}</h2>
              </div>
              <Link href={`/${cat.slug}`} className="link">
                All {cat.name.toLowerCase()} <ArrowRight size={14} />
              </Link>
            </header>
            <div className="card-grid">
              {related.map((p, i) => (
                <PlaceCard key={p.slug} place={p} showCategory delay={i * 80} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <JsonLd data={placeSchema(place)} />
    </>
  );
}
