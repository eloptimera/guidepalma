import Link from "next/link";
import { ExperienceCard, PlaceCard } from "@/components/Cards";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { IntentTabs } from "@/components/IntentTabs";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PartnerFeature } from "@/components/Partner";
import { Photo } from "@/components/Photo";
import {
  articleHref,
  formatDate,
  getArticles,
  getCategory,
  getCity,
  getEventsThisWeek,
  getIntents,
  getNeighbourhoods,
  getPlacesByCategory,
  getPlacesByTags,
  getSponsored,
  getTopList,
  getTopLists,
  listHref,
  neighbourhoodHref,
  areaName,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Media } from "@/types";

// Startsidan revalideras varje timme så att "This week" och sponsorperioder hålls aktuella.
export const revalidate = 3600;

const city = getCity();

export const metadata = buildMetadata({
  title: `${city.brand} — The Independent Guide to ${city.name} de ${city.region}`,
  description: city.description,
  path: "/",
});

function edition(d = new Date()) {
  const m = d.getMonth();
  const season = m < 2 || m === 11 ? "Winter" : m < 5 ? "Spring" : m < 8 ? "Summer" : "Autumn";
  return `${season} ${d.getFullYear()} edition`;
}

export default function HomePage() {
  const lists = getTopLists();
  const leadList = getTopList("best-restaurants-palma")!;
  const otherLists = lists.filter((l) => l.slug !== leadList.slug);
  const featured = getSponsored("home:featured")[0];
  const experiences = [...getPlacesByCategory("things-to-do"), ...getPlacesByCategory("boat-trips")]
    .sort((a, b) => (b.rating?.value ?? 0) - (a.rating?.value ?? 0))
    .slice(0, 8);
  const events = getEventsThisWeek();
  const [leadStory, ...stories] = getArticles();

  const count = (slug: string) => getPlacesByCategory(slug).length;

  const tiles: { title: string; href: string; meta: string; media: Media }[] = [
    { title: "Best restaurants", href: listHref(leadList), meta: `${count("restaurants")} places`, media: getCategory("restaurants")!.heroImage },
    { title: "Things to do", href: "/things-to-do", meta: `${count("things-to-do")} experiences`, media: getCategory("things-to-do")!.heroImage },
    { title: "Boat trips", href: "/boat-trips", meta: `${count("boat-trips")} ways onto the water`, media: getCategory("boat-trips")!.heroImage },
    { title: "Beach clubs", href: "/beach-clubs", meta: `${count("beach-clubs")} clubs`, media: getCategory("beach-clubs")!.heroImage },
    { title: "Rooftop bars", href: "/bars/best-rooftop-bars-palma", meta: "Golden hour", media: getCategory("bars")!.heroImage },
    { title: "Private guides", href: "/private-guides", meta: `${count("private-guides")} local experts`, media: getCategory("private-guides")!.heroImage },
  ];

  const discover = [
    { label: "Eat", href: "/restaurants" },
    { label: "Drink", href: "/bars" },
    { label: "Relax", href: "/beach-clubs" },
    { label: "Explore", href: "/things-to-do" },
    { label: "Party", href: "/search?q=late night" },
    { label: "On the water", href: "/boat-trips" },
  ];

  const intents = getIntents();

  return (
    <>
      {/* ======================================================= COVER */}
      <section className="cover" aria-labelledby="cover-title">
        <Photo media={city.heroImage} priority showBrief sizes="100vw" />
        <div className="wrap cover-inner">
          <div className="cover-masthead eyebrow">
            <span>
              {city.name} de {city.region}
            </span>
            <span>{edition()}</span>
          </div>
          <div className="cover-grid">
            <div>
              <h1 id="cover-title" className="display cover-title">
                {city.name}, <em>properly</em> explored.
              </h1>
              <p className="cover-sub">Restaurants, beaches, bars, experiences and places actually worth your time.</p>
              <div className="cover-ctas">
                <Link href="#explore" className="btn btn-light">
                  Explore {city.name} <ArrowRight />
                </Link>
                <Link href="#best-of" className="btn btn-ghost-light">
                  See what&rsquo;s trending
                </Link>
              </div>
            </div>
            <aside className="cover-index" aria-label="In this edition">
              <p className="eyebrow" style={{ marginBottom: 10, opacity: 0.75 }}>
                In this edition
              </p>
              <ol>
                {lists.slice(0, 4).map((l, i) => (
                  <li key={l.slug}>
                    <Link href={listHref(l)}>
                      <span className="n">{String(i + 1).padStart(2, "0")}</span>
                      {l.shortTitle}
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
          <nav className="discover" aria-label="What are you looking for?">
            <p className="eyebrow discover-label">What are you looking for?</p>
            <div className="discover-row">
              {discover.map((d, i) => (
                <Link key={d.label} href={d.href}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span> {d.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* ======================================================= EXPLORE */}
      <section id="explore" className="section" aria-labelledby="explore-title">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow">Explore {city.name}</p>
              <h2 id="explore-title" className="h2">
                Where to begin.
              </h2>
            </div>
            <p className="lead" style={{ maxWidth: 30 + "em" }}>
              Six ways into the city — each one edited down to the places we would genuinely send a friend.
            </p>
          </header>
          <div className="mosaic">
            {tiles.map((t, i) => (
              <Link key={t.title} href={t.href} className="tile" data-reveal style={{ ["--delay" as string]: `${(i % 3) * 90}ms` }}>
                <Photo media={t.media} sizes={i === 0 ? "(min-width: 900px) 58vw, 100vw" : "(min-width: 900px) 40vw, 50vw"} decorative />
                <div className="tile-body">
                  <div>
                    <h3 className="tile-title">{t.title}</h3>
                    <span className="tile-count">{t.meta}</span>
                  </div>
                  <span className="tile-arrow" aria-hidden>
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= BEST OF */}
      <section id="best-of" className="section bg-paper" aria-labelledby="best-title">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow">Edited lists</p>
              <h2 id="best-title" className="h2">
                The best of {city.name}
              </h2>
            </div>
            <Link href="/guides" className="link">
              All guides <ArrowRight size={14} />
            </Link>
          </header>

          <Link href={listHref(leadList)} className="lists-lead zoom-parent">
            <div className="zoom" data-reveal="image">
              <Photo media={leadList.heroImage} sizes="(min-width: 900px) 55vw, 100vw" showBrief decorative />
            </div>
            <div data-reveal>
              <p className="numeral lists-lead-count">{leadList.items.length}</p>
              <p className="eyebrow text-terracotta">Restaurants · Updated {formatDate(leadList.updatedAt, { month: "long", year: "numeric" })}</p>
              <h3 className="h1" style={{ marginTop: 14 }}>
                Best restaurants in <em>{city.name}</em>
              </h3>
              <p className="lead mt-s">{leadList.dek}</p>
              <span className="btn btn-solid mt-m">
                Read the list <ArrowRight />
              </span>
            </div>
          </Link>

          <ol className="list-rows">
            {otherLists.map((l, i) => {
              const cat = getCategory(l.category);
              return (
                <li key={l.slug}>
                  <Link href={listHref(l)} className="list-row zoom-parent">
                    <span className="numeral list-row-num">{String(i + 2).padStart(2, "0")}</span>
                    <div className="zoom">
                      <Photo media={l.heroImage} sizes="140px" decorative />
                    </div>
                    <div>
                      <h3 className="list-row-title">{l.shortTitle}</h3>
                      <p className="meta list-row-mobile-meta">{cat?.name}</p>
                    </div>
                    <p className="list-row-desc">{l.dek}</p>
                    <p className="list-row-meta eyebrow text-soft">
                      {cat?.name}
                      <br />
                      {l.area ? areaName(l.area) : `All ${city.name}`}
                    </p>
                    <ArrowRight size={20} />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ======================================================= FEATURED PARTNER */}
      {featured ? (
        <section className="section-tight" aria-label="Featured partner">
          <div className="wrap">
            <PartnerFeature item={featured} />
          </div>
        </section>
      ) : null}

      {/* ======================================================= INTENTS */}
      <section className="section" aria-labelledby="intent-title">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow">Plan your day</p>
              <h2 id="intent-title" className="h2">
                What kind of {city.name} day <em>are you planning?</em>
              </h2>
            </div>
          </header>
          <IntentTabs
            tabs={intents.map((t) => ({ slug: t.slug, label: t.label }))}
            panels={intents.map((intent) => (
              <>
                <div className="intent-intro">
                  <h3 className="h3">{intent.line}.</h3>
                  <p className="text-soft">Hand-picked from across the guide — restaurants, bars, beaches and things to do.</p>
                  <Link href={`/search?q=${encodeURIComponent(intent.label.toLowerCase())}`} className="link mt-m">
                    More {intent.label.toLowerCase()} ideas <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="card-grid">
                  {getPlacesByTags(intent.tags, 3).map((p) => (
                    <PlaceCard key={p.slug} place={p} showCategory sizes="(min-width: 900px) 22vw, 90vw" />
                  ))}
                </div>
              </>
            ))}
          />
        </div>
      </section>

      {/* ======================================================= THINGS TO DO */}
      <section className="section bg-paper" aria-labelledby="do-title">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow">Things to do</p>
              <h2 id="do-title" className="h2">
                Ten good days&rsquo; worth of ideas.
              </h2>
              <p className="lead">Tours, sailing and day trips we have done ourselves — booked in a couple of taps.</p>
            </div>
            <Link href="/things-to-do" className="link">
              All experiences <ArrowRight size={14} />
            </Link>
          </header>
          <div className="rail">
            {experiences.map((p, i) => (
              <ExperienceCard key={p.slug} place={p} delay={Math.min(i, 3) * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= NEIGHBOURHOODS */}
      <section className="section bg-sea" aria-labelledby="nb-title">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow" style={{ color: "var(--terracotta-soft)" }}>
                Neighbourhoods
              </p>
              <h2 id="nb-title" className="h2">
                Five {city.name}s in one city.
              </h2>
            </div>
          </header>
          <ol className="nb-index">
            {getNeighbourhoods().map((n, i) => (
              <li key={n.slug}>
                <Link href={neighbourhoodHref(n)} className="nb-row">
                  <span className="nb-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nb-name">{n.name}</span>
                  <span className="nb-tag">{n.tagline}</span>
                  <ArrowUpRight size={22} />
                  <span className="nb-peek" aria-hidden>
                    <Photo media={n.heroImage} sizes="280px" decorative />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ======================================================= THIS WEEK */}
      {events.length ? (
        <section className="section" aria-labelledby="week-title">
          <div className="wrap">
            <header className="section-head">
              <div>
                <p className="eyebrow">What&rsquo;s on</p>
                <h2 id="week-title" className="h2">
                  This week in {city.name}
                </h2>
              </div>
            </header>
            <ol className="week">
              {events.map((e) => {
                const d = new Date(e.date);
                return (
                  <li key={e.id} className="event" data-reveal>
                    <time dateTime={e.date} className="event-date">
                      <span className="numeral event-day">{d.getDate()}</span>
                      <span className="event-dow">{formatDate(e.date, { weekday: "short", month: "short" })}</span>
                    </time>
                    <div>
                      <p className="eyebrow event-kind">
                        {e.kind}
                        {e.isFree ? " · Free" : ""}
                      </p>
                      <h3 className="event-title">{e.title}</h3>
                      <p className="meta">
                        {e.venue}
                        {e.time ? (
                          <>
                            <span className="meta-dot" />
                            {e.time}
                          </>
                        ) : null}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {/* ======================================================= STORIES */}
      <section className="section bg-paper" aria-labelledby="stories-title">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow">The magazine</p>
              <h2 id="stories-title" className="h2">
                Stories from {city.name}
              </h2>
            </div>
            <Link href="/guides" className="link">
              All stories <ArrowRight size={14} />
            </Link>
          </header>
          <div className="stories">
            {[leadStory!, ...stories].map((a, i) => (
              <article key={a.slug} className="card zoom-parent" data-reveal style={{ ["--delay" as string]: `${i * 70}ms` }}>
                <div className="zoom">
                  <Photo media={a.heroImage} sizes={i === 0 ? "(min-width: 900px) 55vw, 100vw" : "(min-width: 900px) 160px, 100vw"} showBrief={i === 0} />
                </div>
                <div className="card-body">
                  <p className="eyebrow text-terracotta">{a.kicker}</p>
                  <h3 className="card-title">
                    <Link href={articleHref(a)} className="card-link">
                      {a.title}
                    </Link>
                  </h3>
                  {i === 0 ? <p className="card-text">{a.dek}</p> : null}
                  <p className="meta">
                    {a.author.name}
                    <span className="meta-dot" />
                    {a.readingMinutes} min read
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= NEWSLETTER */}
      <section className="section bg-sand" aria-labelledby="letter-title">
        <div className="wrap letter">
          <div>
            <p className="eyebrow text-terracotta">The {city.name} Letter</p>
            <h2 id="letter-title" className="h2 mt-s">
              One email a week. <em>Only the good stuff.</em>
            </h2>
          </div>
          <div>
            <p className="text-soft" style={{ marginBottom: 18 }}>
              New openings, what&rsquo;s on this weekend, and the table worth booking now. Unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
