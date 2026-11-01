import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Photo } from "@/components/Photo";
import { articleHref, getArticles, getCity, getTopLists, listHref } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const city = getCity();

export const metadata = buildMetadata({
  title: `${city.name} Travel Guides & Itineraries`,
  description: `Itineraries, neighbourhood guides and local knowledge for ${city.name} de ${city.region}.`,
  path: "/guides",
});

export default function GuidesPage() {
  const articles = getArticles();
  return (
    <>
      <section className="cat-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Guides", href: "/guides" }]} />
          <h1 className="h1 mt-m">
            Stories from <em>{city.name}</em>
          </h1>
          <p className="lead mt-s">Itineraries, neighbourhood walks and the kind of local knowledge you only get from living here.</p>
        </div>
      </section>
      <section className="section bg-paper" style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}>
        <div className="wrap stories">
          {articles.map((a, i) => (
            <article key={a.slug} className="card zoom-parent" data-reveal>
              <div className="zoom">
                <Photo media={a.heroImage} sizes={i === 0 ? "(min-width: 900px) 55vw, 100vw" : "(min-width: 900px) 160px, 100vw"} showBrief={i === 0} priority={i === 0} />
              </div>
              <div className="card-body">
                <p className="eyebrow text-terracotta">{a.kicker}</p>
                <h2 className="card-title">
                  <Link href={articleHref(a)} className="card-link">
                    {a.title}
                  </Link>
                </h2>
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
        <div className="wrap mt-l">
          <hr className="rule" />
          <h2 className="h3 mt-m">The lists</h2>
          <div className="nb-jump">
            {getTopLists().map((l) => (
              <Link key={l.slug} href={listHref(l)} className="chip">
                {l.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
