import type { Metadata } from "next";
import type { Article, Category, Place, TopList } from "@/types";
import { areaName, getCategory, getCity, getPlaceBySlug, listHref, placeHref, priceLabel } from "./content";

/* ---------------------------------------------------------------- metadata */

interface MetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/** Bygger title, description, canonical, OpenGraph och Twitter för en sida. */
export function buildMetadata({ title, description, path, type = "website", publishedTime, modifiedTime, noindex }: MetaInput): Metadata {
  const city = getCity();
  const url = new URL(path, city.domain).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: city.brand,
      locale: city.locale,
      type,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ---------------------------------------------------------------- JSON-LD */

const abs = (path: string) => new URL(path, getCity().domain).toString();

export function websiteSchema() {
  const city = getCity();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: city.brand,
    url: city.domain,
    description: city.description,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${city.domain}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  const city = getCity();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: city.brand,
    url: city.domain,
    sameAs: Object.values(city.social ?? {}),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

/** Restaurant / BarOrPub / TouristAttraction / LodgingBusiness … beroende på kategori. */
export function placeSchema(place: Place) {
  const category = getCategory(place.category);
  const type = category?.schemaType ?? "LocalBusiness";
  const city = getCity();
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: place.name,
    description: place.summary,
    url: abs(placeHref(place)),
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address,
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: "ES",
    },
  };
  if (place.geo) base.geo = { "@type": "GeoCoordinates", latitude: place.geo.lat, longitude: place.geo.lng };
  if (place.phone) base.telephone = place.phone;
  if (place.website) base.sameAs = place.website;
  if (type !== "TouristAttraction" && type !== "TouristTrip") base.priceRange = priceLabel(place.priceLevel);
  if (type === "Restaurant") base.servesCuisine = place.type;
  if (place.bookingUrl && type === "Restaurant") base.acceptsReservations = true;
  // Endast riktiga betyg får exponeras som AggregateRating — aldrig placeholder-data.
  if (place.rating && place.rating.source === "google" && place.rating.count)
    base.aggregateRating = { "@type": "AggregateRating", ratingValue: place.rating.value, reviewCount: place.rating.count };
  if (type === "TouristTrip" && place.priceFrom)
    base.offers = { "@type": "Offer", price: place.priceFrom, priceCurrency: "EUR" };
  return base;
}

export function itemListSchema(list: TopList) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.title,
    description: list.dek,
    url: abs(listHref(list)),
    numberOfItems: list.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: list.items.map((item, i) => {
      const p = getPlaceBySlug(item.placeSlug);
      return { "@type": "ListItem", position: i + 1, name: p?.name, url: p ? abs(placeHref(p)) : undefined };
    }),
  };
}

export function categoryListSchema(category: Category, places: Place[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.title,
    itemListElement: places.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: abs(placeHref(p)) })),
  };
}

export function articleSchema(article: Article) {
  const city = getCity();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: article.author.name, jobTitle: article.author.role },
    publisher: { "@type": "Organization", name: city.brand, url: city.domain },
    mainEntityOfPage: abs(`/guides/${article.slug}`),
    about: { "@type": "City", name: `${city.name}, ${city.region}` },
  };
}

export const describeArea = (slug: string) => `${areaName(slug)}, ${getCity().name}`;
