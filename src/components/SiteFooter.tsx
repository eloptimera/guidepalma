import Link from "next/link";
import { getCategories, getCity, getNeighbourhoods, neighbourhoodHref } from "@/lib/content";

export function SiteFooter() {
  const city = getCity();
  const cats = getCategories();
  const eatDrink = cats.filter((c) => c.navGroup === "eat" || c.navGroup === "drink");
  const doSee = cats.filter((c) => c.navGroup === "do" || c.navGroup === "see" || c.navGroup === "stay");
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-word" aria-hidden>
          {city.name}, <em>properly</em> explored.
        </p>
        <div className="footer-cols">
          <p className="footer-note">
            {city.brand} is an independent guide to {city.name} de {city.region}. Our editors choose every place on
            their own merit. Partners are always clearly labelled and never buy their way into a ranking.
          </p>
          <div>
            <h3>Eat & drink</h3>
            <ul>
              {eatDrink.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Do & see</h3>
            <ul>
              {doSee.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Neighbourhoods</h3>
            <ul>
              {getNeighbourhoods().map((n) => (
                <li key={n.slug}>
                  <Link href={neighbourhoodHref(n)}>{n.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{city.brand}</h3>
            <ul>
              <li>
                <Link href="/guides">Stories & guides</Link>
              </li>
              <li>
                <Link href="/about">About & editorial policy</Link>
              </li>
              <li>
                <Link href="/about#partners">Become a partner</Link>
              </li>
              {city.social?.instagram ? (
                <li>
                  <a href={city.social.instagram} rel="noopener" target="_blank">
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>
            © {year} {city.brand}
          </span>
          <span>Some links are affiliate links — we may earn a commission at no cost to you.</span>
        </div>
      </div>
    </footer>
  );
}
