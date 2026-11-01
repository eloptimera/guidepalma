import Link from "next/link";
import type { ActivePlacement } from "@/lib/content";
import { areaName, outboundLink, placeHref, priceLabel } from "@/lib/content";
import { ArrowRight, PartnerMark } from "./Icons";
import { Photo } from "./Photo";
import { Rating } from "./Cards";

/**
 * Sponsrade placeringar. Designprinciper:
 * 1. Alltid tydligt märkta ("Featured Partner" / "Sponsored") — synligt, inte i finstilt.
 * 2. Egen visuell behandling (dubbelram, sandton) så att läsaren aldrig förväxlar
 *    dem med redaktionella rankingar — men i samma typografi så det ser premium ut.
 * 3. Får aldrig ett rangnummer.
 * 4. Utgående länkar får rel="sponsored".
 */

function Badge({ label }: { label: string }) {
  return (
    <span className="partner-badge">
      <PartnerMark /> {label}
    </span>
  );
}

/** Stor partner-band — startsida, topplistor, områdessidor. */
export function PartnerFeature({ item, flip }: { item: ActivePlacement; flip?: boolean }) {
  const { placement, place } = item;
  const out = outboundLink(place);
  return (
    <aside className="partner" aria-label={`${placement.label}: ${place.name}`} data-reveal>
      <div className="partner-inner" style={flip ? { direction: "rtl" } : undefined}>
        <Photo media={place.images[0]!} sizes="(min-width: 820px) 50vw, 100vw" />
        <div className="partner-body" style={{ direction: "ltr" }}>
          <Badge label={placement.label} />
          <p className="eyebrow partner-eyebrow">{placement.eyebrow}</p>
          <h3 className="h2">{place.name}</h3>
          <p className="meta">
            {place.type}
            <span className="meta-dot" />
            {areaName(place.area)}
            <span className="meta-dot" />
            {priceLabel(place.priceLevel)}
            {place.rating ? (
              <>
                <span className="meta-dot" />
                <Rating rating={place.rating} />
              </>
            ) : null}
          </p>
          <p className="lead" style={{ fontSize: "1.1rem" }}>
            {placement.blurb ?? place.summary}
          </p>
          <div className="cover-ctas" style={{ marginTop: 8 }}>
            <Link href={placeHref(place)} className="btn btn-solid">
              View {place.category === "restaurants" ? "restaurant" : "details"} <ArrowRight />
            </Link>
            {out ? (
              <a href={out.href} rel={out.rel ?? "sponsored noopener"} className="btn btn-ghost">
                {out.label}
              </a>
            ) : null}
          </div>
          <p className="partner-disclose">
            Paid partnership. Partners never influence our rankings or reviews.{" "}
            <Link href="/about#partners">How we work</Link>
          </p>
        </div>
      </div>
    </aside>
  );
}

/** Kompakt partnerkort som placeras i ett grid (kategorisidor). */
export function PartnerCard({ item }: { item: ActivePlacement }) {
  const { placement, place } = item;
  return (
    <article className="card partner-card zoom-parent" aria-label={`${placement.label}: ${place.name}`} data-reveal>
      <Badge label={placement.label} />
      <div className="zoom">
        <Photo media={place.images[0]!} sizes="(min-width: 1200px) 25vw, (min-width: 700px) 45vw, 90vw" />
      </div>
      <div className="card-body">
        <p className="eyebrow partner-eyebrow">{placement.eyebrow}</p>
        <h3 className="card-title">
          <Link href={placeHref(place)} className="card-link">
            {place.name}
          </Link>
        </h3>
        <p className="card-text">{place.summary}</p>
        <p className="card-meta">
          {place.type}
          <span className="meta-dot" />
          {areaName(place.area)}
          <span className="meta-dot" />
          {priceLabel(place.priceLevel)}
        </p>
      </div>
    </article>
  );
}
