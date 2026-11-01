import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlaceCard } from "@/components/Cards";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { areaName, articleHref, formatDate, getArticle, getArticles, getPlaceBySlug, placeHref } from "@/lib/content";
import { articleSchema, buildMetadata } from "@/lib/seo";
import type { ArticleBlock } from "@/types";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seo.title,
    description: a.seo.description,
    path: articleHref(a),
    type: "article",
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "pullquote":
      return <blockquote className="pullquote">{block.text}</blockquote>;
    case "image":
      return (
        <figure className={`article-figure${block.wide ? " is-wide" : ""}`}>
          <Photo media={block.media} sizes={block.wide ? "(min-width: 1280px) 1280px, 100vw" : "(min-width: 760px) 720px, 100vw"} showBrief reveal />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    case "tip":
      return (
        <aside className="tip">
          <p className="eyebrow">{block.title}</p>
          <p>{block.text}</p>
        </aside>
      );
    case "place": {
      const p = getPlaceBySlug(block.placeSlug);
      if (!p) return null;
      return (
        <Link href={placeHref(p)} className="inline-place zoom-parent">
          <div className="zoom">
            <Photo media={p.images[0]!} sizes="96px" decorative />
          </div>
          <div>
            <p className="eyebrow text-soft">
              {p.type} · {areaName(p.area)}
            </p>
            <p className="inline-place-title" style={{ marginTop: 4 }}>
              {p.name}
            </p>
            <p className="meta">{block.note}</p>
          </div>
        </Link>
      );
    }
    case "timeline":
      return (
        <ol className="timeline">
          {block.items.map((it) => {
            const p = it.placeSlug ? getPlaceBySlug(it.placeSlug) : undefined;
            return (
              <li key={it.time + it.title}>
                <time>{it.time}</time>
                <h3>{it.title}</h3>
                <p>
                  {it.text}{" "}
                  {p ? (
                    <Link href={placeHref(p)} className="prose-link">
                      {p.name} →
                    </Link>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ol>
      );
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const related = a.relatedPlaces.map(getPlaceBySlug).filter((p) => !!p).slice(0, 3);
  const more = getArticles().filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article>
      <header className="article-head wrap">
        <Breadcrumbs items={[{ name: "Guides", href: "/guides" }, { name: a.title, href: articleHref(a) }]} />
        <p className="eyebrow article-kicker">{a.kicker}</p>
        <h1 className="h1 article-title">{a.title}</h1>
        <p className="article-dek">{a.dek}</p>
        <p className="article-byline">
          <span>
            By <strong>{a.author.name}</strong>
          </span>
          <span className="meta-dot">{formatDate(a.publishedAt)}</span>
          <span className="meta-dot">{a.readingMinutes} min read</span>
        </p>
      </header>

      <div className="wrap article-hero">
        <Photo media={a.heroImage} priority showBrief sizes="(min-width: 1440px) 1312px, 100vw" />
      </div>

      <div className="wrap-narrow article-body">
        {a.body.map((b, i) => (
          <Block key={i} block={b} />
        ))}
        <p className="meta" style={{ borderTop: "1px solid var(--line)", paddingTop: 20, marginTop: 48 }}>
          Updated {formatDate(a.updatedAt)} · {a.author.name}, {a.author.role}
        </p>
      </div>

      {related.length ? (
        <section className="section bg-paper">
          <div className="wrap">
            <header className="section-head">
              <div>
                <p className="eyebrow">In this story</p>
                <h2 className="h2">The places</h2>
              </div>
            </header>
            <div className="card-grid">
              {related.map((p, i) => (
                <PlaceCard key={p!.slug} place={p!} showCategory delay={i * 80} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap">
          <header className="section-head">
            <div>
              <p className="eyebrow">Keep reading</p>
              <h2 className="h2">More stories</h2>
            </div>
            <Link href="/guides" className="link">
              All stories <ArrowRight size={14} />
            </Link>
          </header>
          <div className="card-grid">
            {more.map((m) => (
              <article key={m.slug} className="card card-wide zoom-parent" data-reveal>
                <div className="zoom">
                  <Photo media={m.heroImage} sizes="(min-width: 900px) 30vw, 90vw" />
                </div>
                <div className="card-body">
                  <p className="eyebrow text-terracotta">{m.kicker}</p>
                  <h3 className="card-title">
                    <Link href={articleHref(m)} className="card-link">
                      {m.title}
                    </Link>
                  </h3>
                  <p className="card-text">{m.dek}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={articleSchema(a)} />
    </article>
  );
}
