import Link from "next/link";
import type { Place, TopList, TopListItem } from "@/types";
import {
  areaName,
  formatDate,
  getCategory,
  getPlaceBySlug,
  getSponsored,
  getTopLists,
  listHref,
  outboundLink,
  placeHref,
  priceLabel,
} from "@/lib/content";
import { itemListSchema } from "@/lib/seo";
import { Breadcrumbs } from "../Breadcrumbs";
import { Rating } from "../Cards";
import { ArrowRight, ArrowUpRight } from "../Icons";
import { JsonLd } from "../JsonLd";
import { PartnerFeature } from "../Partner";
import { Photo } from "../Photo";

export function TopListView({ list }: { list: TopList }) {
  const cat = getCategory(list.category)!;
  const ranked = list.items
    .map((item) => ({ item, place: getPlaceBySlug(item.placeSlug) }))
    .filter((x): x is { item: TopListItem; place: Place } => !!x.place);

  // Sponsrade partners fördelas på listans sponsorBreaks. Max en per break.
  const sponsors = getSponsored(`toplist:${list.slug}`);
  const breaks = new Map<number, (typeof sponsors)[number]>();
  list.sponsorBreaks.forEach((afterRank, i) => sponsors[i] && breaks.set(afterRank, sponsors[i]!));
  const otherLists = getTopLists().filter((l) => l.slug !== list.slug).slice(0, 3);

  return (
    <>
      <section className="cover cover-page" aria-labelledby="list-title">
        <Photo media={list.heroImage} priority showBrief />
        <div className="wrap cover-inner on-image">
          <Breadcrumbs items={[{ name: cat.name, href: `/${cat.slug}` }, { name: list.shortTitle, href: listHref(list) }]} />
          <p className="eyebrow mt-m" style={{ opacity: 0.85 }}>
            The {list.items.length} · {cat.name}
          </p>
          <h1 id="list-title" className="h1 mt-s" style={{ maxWidth: "14ch" }}>
            {list.title}
          </h1>
          <p className="cover-sub">{list.dek}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="list-intro">
            <div className="byline">
              <strong>{list.author.name}</strong>
              <span className="text-soft">{list.author.role}</span>
              <span className="text-soft">Updated {formatDate(list.updatedAt)}</span>
            </div>
            <div className="list-intro-text">
              {list.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <nav className="toc" aria-label="Jump to">
                {ranked.map(({ place }, i) => (
                  <a key={place.slug} href={`#rank-${i + 1}`} className="chip">
                    <span className="numeral">{String(i + 1).padStart(2, "0")}</span> {place.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "clamp(32px, 4vw, 64px)" }}>
        <div className="wrap">
          {breaks.get(0) ? (
            <div style={{ marginBottom: "clamp(64px, 9vw, 140px)" }}>
              <PartnerFeature item={breaks.get(0)!} />
            </div>
          ) : null}
          <ol className="ranked">
            {ranked.map(({ item, place }, i) => {
              const rank = i + 1;
              const sponsor = breaks.get(rank);
              return (
                <li key={place.slug} id={`rank-${rank}`}>
                  <RankedItem rank={rank} item={item} place={place} flipped={i % 2 === 1} priority={i === 0} />
                  {sponsor ? (
                    <div style={{ marginTop: "clamp(64px, 9vw, 140px)" }}>
                      <PartnerFeature item={sponsor} flip={rank % 2 === 0} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <aside className="methodology">
            <p className="eyebrow">How we choose</p>
            <p>{list.methodology}</p>
          </aside>
        </div>
      </section>

      {otherLists.length ? (
        <section className="section bg-paper">
          <div className="wrap">
            <header className="section-head">
              <div>
                <p className="eyebrow">Keep reading</p>
                <h2 className="h2">More of the best</h2>
              </div>
            </header>
            <div className="card-grid">
              {otherLists.map((l) => (
                <article key={l.slug} className="card card-wide zoom-parent" data-reveal>
                  <div className="zoom">
                    <Photo media={l.heroImage} sizes="(min-width: 900px) 30vw, 90vw" />
                  </div>
                  <div className="card-body">
                    <p className="eyebrow card-kicker">{getCategory(l.category)?.name}</p>
                    <h3 className="card-title">
                      <Link href={listHref(l)} className="card-link">
                        {l.title}
                      </Link>
                    </h3>
                    <p className="card-text">{l.dek}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <JsonLd data={itemListSchema(list)} />
    </>
  );
}

function RankedItem({ rank, item, place, flipped, priority }: { rank: number; item: TopListItem; place: Place; flipped: boolean; priority: boolean }) {
  const cat = getCategory(place.category);
  const out = outboundLink(place);
  const layout = item.layout ?? "split";
  const num = <span className="numeral rank-num">{String(rank).padStart(2, "0")}</span>;
  const label = cat?.slug === "restaurants" ? "restaurant" : cat?.singular.toLowerCase() ?? "details";

  const facts = (
    <dl className="facts">
      <div>
        <dt>{cat?.slug === "restaurants" ? "Cuisine" : "Type"}</dt>
        <dd>{place.type}</dd>
      </div>
      <div>
        <dt>Area</dt>
        <dd>{areaName(place.area)}</dd>
      </div>
      <div>
        <dt>Price</dt>
        <dd>{priceLabel(place.priceLevel)}</dd>
      </div>
      <div>
        <dt>Best for</dt>
        <dd>{item.bestFor}</dd>
      </div>
      {place.rating ? (
        <div>
          <dt>Rating</dt>
          <dd>
            <Rating rating={place.rating} />
          </dd>
        </div>
      ) : null}
      <div>
        <dt>Booking</dt>
        <dd>{place.bookingUrl || place.affiliateUrl ? "Recommended" : "Walk-in"}</dd>
      </div>
    </dl>
  );

  const ctas = (
    <div className="rank-ctas">
      <Link href={placeHref(place)} className="btn btn-solid">
        View {label} <ArrowRight />
      </Link>
      {out ? (
        <a href={out.href} rel={out.rel} className="link">
          {out.label} <ArrowUpRight size={14} />
        </a>
      ) : null}
    </div>
  );

  const head = (
    <>
      <p className="eyebrow rank-type">
        {place.type} · {areaName(place.area)}
      </p>
      <h2 className="h2 rank-title">
        <Link href={placeHref(place)}>{place.name}</Link>
      </h2>
      <p className="rank-note">{item.note}</p>
    </>
  );

  if (layout === "feature")
    return (
      <article className="rank rank-feature">
        <Photo media={place.images[0]!} sizes="100vw" showBrief reveal priority={priority} />
        <div className="rank-content">
          <div>{num}</div>
          <div data-reveal>
            {head}
            {ctas}
          </div>
          <div data-reveal style={{ ["--delay" as string]: "120ms" }}>
            {facts}
          </div>
        </div>
      </article>
    );

  if (layout === "compact")
    return (
      <article className="rank rank-compact" data-reveal>
        <div>{num}</div>
        <div>
          {head}
          {facts}
          {ctas}
        </div>
        <Photo media={place.images[0]!} sizes="(min-width: 900px) 300px, 100vw" />
      </article>
    );

  return (
    <article className={`rank rank-split${flipped ? " is-flipped" : ""}`}>
      <div className="rank-media">
        <Photo media={place.images[0]!} sizes="(min-width: 900px) 50vw, 100vw" showBrief reveal priority={priority} />
      </div>
      <div data-reveal>
        {num}
        <div className="mt-m">{head}</div>
        {facts}
        {ctas}
      </div>
    </article>
  );
}
