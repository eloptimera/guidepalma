import Link from "next/link";
import type { Place, Rating as RatingT } from "@/types";
import { RATING_SOURCE, areaName, formatEuro, getCategory, outboundLink, placeHref, priceLabel } from "@/lib/content";
import { ArrowUpRight, PartnerMark, StarIcon } from "./Icons";
import { Photo } from "./Photo";

/* ---------------------------------------------------------------- rating */

export function Rating({ rating }: { rating?: RatingT }) {
  if (!rating) return null;
  const scale = rating.scale ?? 5;
  const label = RATING_SOURCE[rating.source] ?? rating.source;
  const title = `${label} rating${rating.count ? ` from ${rating.count.toLocaleString("en-GB")} reviews` : ""}${rating.checkedAt ? `, checked ${rating.checkedAt}` : ""}`;
  return (
    <span className="rating" title={title}>
      <StarIcon size={12} /> {rating.value.toFixed(1)}
      {scale !== 5 ? `/${scale}` : ""}
      <span className="rating-src">
        {label}
        {rating.count ? ` (${rating.count.toLocaleString("en-GB")})` : ""}
      </span>
    </span>
  );
}

/** Liten men tydlig märkning när en partner syns i ett organiskt flöde. */
export function PartnerTag() {
  return (
    <span className="partner-badge" style={{ height: 22, fontSize: "0.6rem", padding: "0 9px 0 8px" }}>
      <PartnerMark size={9} /> Partner
    </span>
  );
}

/* ---------------------------------------------------------------- place card */

interface PlaceCardProps {
  place: Place;
  variant?: "default" | "wide";
  sizes?: string;
  priority?: boolean;
  /** Visa kategori i kickern i stället för typ (för blandade listor). */
  showCategory?: boolean;
  delay?: number;
}

export function PlaceCard({ place, variant = "default", sizes, priority, showCategory, delay = 0 }: PlaceCardProps) {
  const kicker = showCategory ? getCategory(place.category)?.singular ?? place.type : place.type;
  return (
    <article className={`card zoom-parent${variant === "wide" ? " card-wide" : ""}`} data-reveal style={{ ["--delay" as string]: `${delay}ms` }}>
      <div className="zoom">
        <Photo media={place.images[0]!} sizes={sizes ?? "(min-width: 1200px) 25vw, (min-width: 700px) 45vw, 90vw"} priority={priority} />
      </div>
      <div className="card-body">
        <p className="eyebrow card-kicker">
          {kicker} <span className="meta-dot" /> {areaName(place.area)}
        </p>
        <h3 className="card-title">
          <Link href={placeHref(place)} className="card-link">
            {place.name}
          </Link>
        </h3>
        <p className="card-text">{place.summary}</p>
        <div className="card-meta">
          {place.priceFrom ? <span>From {formatEuro(place.priceFrom)}</span> : <span aria-label={`Price level ${place.priceLevel} of 4`}>{priceLabel(place.priceLevel)}</span>}
          {place.duration ? <span className="meta-dot">{place.duration}</span> : null}
          {place.rating ? (
            <span className="meta-dot">
              <Rating rating={place.rating} />
            </span>
          ) : null}
          {place.isSponsored ? <span style={{ marginLeft: 10 }}><PartnerTag /></span> : null}
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- experience card */

/** Aktiviteter & båtturer: varaktighet, pris och boknings-CTA (affiliate). */
export function ExperienceCard({ place, delay = 0 }: { place: Place; delay?: number }) {
  const out = outboundLink(place);
  return (
    <article className="card exp-card" data-reveal style={{ ["--delay" as string]: `${delay}ms` }}>
      <div className="zoom">
        <Photo media={place.images[0]!} sizes="(min-width: 900px) 360px, 78vw" />
      </div>
      <div className="card-body">
        <p className="eyebrow card-kicker">{place.type}</p>
        <h3 className="card-title">
          <Link href={placeHref(place)} className="card-link">
            {place.name}
          </Link>
        </h3>
        <p className="card-text">{place.summary}</p>
        <div className="exp-facts">
          {place.duration ? (
            <div>
              Duration<strong>{place.duration}</strong>
            </div>
          ) : null}
          <div>
            {place.priceFrom ? "From" : "Price"}
            <strong>{place.priceFrom ? formatEuro(place.priceFrom) : priceLabel(place.priceLevel)}</strong>
          </div>
          <div>
            Area<strong>{areaName(place.area)}</strong>
          </div>
        </div>
        {out ? (
          <a className="link exp-cta" href={out.href} rel={out.rel} target={out.href.startsWith("#") ? undefined : "_blank"}>
            {out.label} <ArrowUpRight size={14} />
          </a>
        ) : null}
        {place.affiliatePartner ? <p className="affiliate-note">Booked via {place.affiliatePartner}. We may earn a commission.</p> : null}
      </div>
    </article>
  );
}
