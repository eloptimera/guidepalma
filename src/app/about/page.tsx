import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCity } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const city = getCity();

export const metadata = buildMetadata({
  title: `About ${city.brand} & Our Editorial Policy`,
  description: `How ${city.brand} chooses places, how we make money, and how partners are labelled.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="cat-hero">
        <div className="wrap-narrow">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
          <h1 className="h1 mt-m">
            An independent guide, <em>honestly funded.</em>
          </h1>
        </div>
      </section>
      <div className="wrap-narrow article-body" style={{ paddingTop: 0 }}>
        <p>
          {city.brand} is an independent guide to {city.name}. We are building it in the open: every place starts as a
          fact-checked listing — address, website, opening days and ratings with their source — and only gets our own
          verdict once we have visited, anonymously and at our own expense. Nobody can pay to be included in a list, or
          to move up one.
        </p>
        <h2 id="partners">How we make money</h2>
        <p>
          Keeping a guide like this independent costs money. We earn it in four clearly separated ways: Featured
          Partner placements, affiliate commissions on some bookings, enquiries we pass on to partners, and a small
          booking commission with selected operators.
        </p>
        <aside className="tip">
          <p className="eyebrow">Our rules for partners</p>
          <p>
            Every paid placement is labelled &ldquo;Featured Partner&rdquo; or &ldquo;Sponsored&rdquo;. Partners never
            receive a rank number, never appear inside a ranking, and never see or approve our reviews before they are
            published. Affiliate and sponsored links are marked for search engines with rel=&ldquo;sponsored&rdquo;.
          </p>
        </aside>
        <h2>Become a partner</h2>
        <p>
          If you run a restaurant, bar, hotel or experience in {city.name} and would like to reach our readers, we
          would love to hear from you — provided you are already the kind of place we would write about.
        </p>
      </div>
    </>
  );
}
